const container = document.getElementById('bookCards');
const url = "http://localhost:3000";

// Function to get user's read books
const getReadBooks = async () => {
  try {
    const userId = localStorage.getItem("user_id");

    if (!userId) {
      alert("Please log in to see your read books.");
      location.href = "logIn.html";
      return [];
    }

    const response = await fetch(`${url}/userBooks/getReadBooksByUser/${userId}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;

  } catch (error) {
    console.error("Error:", error);
    alert("Error fetching read books");
    return [];
  }
};

document.addEventListener("DOMContentLoaded", async () => {
  const readBooks = await getReadBooks();

  if (readBooks.length === 0) {
    container.innerHTML = `<p class="text-white">No books read yet.</p>`;
    return;
  }

  readBooks.forEach(book => {
    const col = document.createElement('div');
    col.className = 'col-md-4 mb-4';

    col.innerHTML = `
      <div class="card h-100">
        <img src="${book.image}" class="card-img-top" alt="${book.title}">
        <div class="card-body">
          <h5 class="card-title">${book.title}</h5>
          <p class="card-text">by ${book.author}</p>
          <span class="badge bg-success">Read</span>
        </div>
      </div>
    `;

    container.appendChild(col);
  });
});

const logOut = () => {
  localStorage.removeItem("authToken");
  localStorage.removeItem("user_id");
  location.href = "logIn.html";
};
