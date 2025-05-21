const navButtons = document.getElementById("navButtons");

    const jwt = localStorage.getItem("authToken");

    if (jwt) {
      navButtons.innerHTML = `
        <button onclick="location.href='books.html'">Books</button>
        <div class="dropdown">
          <button>User</button>
          <div class="dropdown-content">
            <button onclick="location.href='readedBooks.html'">Readed Books</button>
            <button onclick="logOut()">Log Out</button>
          </div>
        </div>
      `;
    } else {
      navButtons.innerHTML = `
        <button onclick="location.href='logIn.html'">Log In</button>
        <button onclick="location.href='register.html'">Create Account</button>
      `;
    }

    const logOut = ()=> {
      localStorage.removeItem("authToken");
      location.href = "logIn.html";
    }