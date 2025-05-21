

const token = localStorage.getItem("authToken");
console.log("User token:", token);

const url = "http://localhost:3000"

const navigate = (section)=> {
    const content = document.getElementById("mainContent");
    if (section === "users") {
  const content = document.getElementById("mainContent");
  content.innerHTML = `
    <h1>Users</h1>

    <table class="user-table" id="userTable">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Role</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody id="userTableBody">
        <!-- User rows will go here -->
      </tbody>
    </table>
  `;

  loadUsers(); // Load data after rendering
}

else if (section === "books") {
  content.innerHTML = `
    <h1>Books</h1>
    <button id="addBookBtn" onclick="openAddBookModal()" style="margin-bottom: 20px; background-color: var(--purpleButton); color: white; padding: 10px 20px; border: none; border-radius: 6px; cursor: pointer;">
  Add New Book
</button>

    <table class="user-table" id="bookTable">
      <thead>
        <tr>
          <th>Title</th>
          <th>Author</th>
          <th>Image</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody id="bookTableBody">
        <!-- Book rows will go here -->
      </tbody>
    </table>
  `;

 loadBooks(); // Call books loader
    }
}

    const logOut = ()=> {
      localStorage.removeItem("authToken");
      location.href = "logIn.html";
    }

    const loadUsers = ()=> {
        fetch(`${url}/users/getUsers`)
        .then(res => res.json())
        .then(users => {
            const tableBody = document.getElementById("userTableBody");
            tableBody.innerHTML = ""; 

            users.forEach(user => {
            const row = `
                <tr>
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td>${user.role}</td>
                <td>
                    <button class="btn-custom btn-edit" onclick="editUser(${user.id})">Edit</button>
                    <button class="btn-custom btn-delete" onclick="deleteUser(${user.id})">Delete</button>
                </td>
                </tr>
            `;
            tableBody.innerHTML += row;
            });
        });
    }

const editUser = async (userId) => {
  try {
    const res = await fetch(`${url}/users/getUserById/${userId}`);
    const user = await res.json();
    console.log({USER:user[0].id})
    // Fill inputs
    document.getElementById("editUserId").value = user[0].id;
    document.getElementById("editUserName").value = user[0].name;
    document.getElementById("editUserEmail").value = user[0].email;
    document.getElementById("editUserPassword").value = "";
    document.getElementById("editUserRole").value = user[0].role;

    document.getElementById("editUserModal").style.display = "block";
  } catch (error) {
    console.error(error);
    alert("Error fetching user data");
  }
};

const closeModal = () => {
  document.getElementById("editUserModal").style.display = "none";
};

const saveUser = async () => {
  const id = document.getElementById("editUserId").value;
  const name = document.getElementById("editUserName").value;
  const email = document.getElementById("editUserEmail").value;
  const password = document.getElementById("editUserPassword").value;
  const role = document.getElementById("editUserRole").value;

  try {
    const res = await fetch(`${url}/users/putUsers/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password, role }),
    });

    const data = await res.text();
    alert(data);
    closeModal();
    loadUsers(); // Reload user table if you have this function
  } catch (error) {
    console.error(error);
    alert("Error updating user");
  }
};


    const deleteUser = (userId)=> {
  if (confirm("Are you sure you want to delete this user?")) {
    fetch(`${url}/users/deleteUsers/${userId}`, {
      method: "DELETE"
    })
    .then(res => {
      if (res.ok) {
        alert("User deleted");
        loadUsers(); // Refresh list
      }
    });
  }
}

const openAddBookModal = () => {
  document.getElementById("editBookId").value = ""; // Clear ID
  document.getElementById("editBookTitle").value = "";
  document.getElementById("editBookAuthor").value = "";
  document.getElementById("editBookImage").value = "";
  document.getElementById("bookModalTitle").innerText = "Add New Book";
  document.getElementById("editBookModal").style.display = "block";
};


const loadBooks = () => {
  fetch(`${url}/books/getBooks`)
    .then(res => res.json())
    .then(books => {
      const tableBody = document.getElementById("bookTableBody");
      tableBody.innerHTML = "";

      books.forEach(book => {
        const row = `
          <tr>
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td><img src="${book.image}" height=80 width=80></img></td>
            <td>
              <button class="btn-custom btn-edit" onclick="editBook(${book.id})">Edit</button>
              <button class="btn-custom btn-delete" onclick="deleteBook(${book.id})">Delete</button>
            </td>
          </tr>
        `;
        tableBody.innerHTML += row;
      });
    })
    .catch(error => {
      console.error("Failed to load books:", error);
    });
};

const editBook = async (bookId) => {
  try {
    const res = await fetch(`${url}/books/getBookById/${bookId}`);
    const book = await res.json();

    document.getElementById("editBookId").value = book[0].id;
    document.getElementById("editBookTitle").value = book[0].title;
    document.getElementById("editBookAuthor").value = book[0].author;
    document.getElementById("editBookImage").value = book[0].image;

    document.getElementById("editBookModal").style.display = "block";
  } catch (error) {
    console.error("Error loading book:", error);
    alert("Failed to load book data");
  }
};

const saveBook = async () => {
  const id = document.getElementById("editBookId").value;
  const title = document.getElementById("editBookTitle").value;
  const author = document.getElementById("editBookAuthor").value;
  const image = document.getElementById("editBookImage").value;

  const payload = { title, author, image };

  try {
    let res;
    if (id) {
      // Edit mode
      res = await fetch(`${url}/books/putBooks/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } else {
      // Add mode
      res = await fetch(`${url}/books/postBooks`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    }

    const result = await res.text();
    alert(result);
    closeBookModal();
    loadBooks();
  } catch (error) {
    console.error("Error saving book:", error);
    alert("Failed to save book");
  }
};


const closeBookModal = () => {
  document.getElementById("editBookModal").style.display = "none";
};


const deleteBook = (bookId) => {
  if (confirm("Are you sure you want to delete this book?")) {
    fetch(`${url}/books/deleteBooks/${bookId}`, {
      method: "DELETE"
    })
    .then(res => {
      if (res.ok) {
        alert("Book deleted");
        loadBooks(); // Refresh book table
      }
    });
  }
};

