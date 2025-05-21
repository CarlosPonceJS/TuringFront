const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const btnRegister = document.getElementById("btnRegister");

const url = "http://localhost:3000";

const Register = async () => {
  try {
    const response = await fetch(`${url}/users/postUsers`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: username.value,
        email: email.value,
        password: password.value,
        role: "user"
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    alert("User Created succesfully");
    window.location.href = "logIn.html";

  } catch (error) {
    console.error("Error:", error);
    alert("Register failed. Username or email already exists.");
  }
};

btnRegister.addEventListener("click", (event) => {
  event.preventDefault();
  Register();
});
