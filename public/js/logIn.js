import axios from 'axios';

const username = document.getElementById("username");
const password = document.getElementById("password");
const btnLog = document.getElementById("btnLog");

const url = "http://localhost:3000"


const LogIn = ()=>{
    axios.get("/users/logUsers").then(response => console.log(response.data))
  .catch(error => console.error(error));
}