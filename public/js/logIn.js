const email = document.getElementById("email");
const password = document.getElementById("password");
const btnLog = document.getElementById("btnLog");

const url = "http://localhost:3000";

const LogIn = async () => {
  try {
    const response = await fetch(`${url}/users/logUsers`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: email.value,
        password: password.value
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    //SAVING THE JWT
    if (data.token) {
      localStorage.setItem("authToken", data.token);
    }
    if(data.role === 'user'){
      window.location.href = "books.html";
    } else if(data.role === 'admin'){
      window.location.href = "admin.html";
    } else {
      alert("Unknown user role. Please contact support.");
    }
  } catch (error) {
    console.error("Error:", error);
    alert("Login failed. Please check your username and password.");
  }
};

btnLog.addEventListener("click", (event) => {
  event.preventDefault();
  LogIn();
});
