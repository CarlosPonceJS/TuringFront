const container = document.getElementById('bookCards');


const url = "http://localhost:3000";

const getBookData = async () => {
  try {
    const response = await fetch(`${url}/books/getBooks`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;

  } catch (error) {
    console.error("Error:", error);
    alert("Error fetching data");
    return [];
  }
};
document.addEventListener("DOMContentLoaded", async () => {
  const bookData = await getBookData();
  console.log(bookData);

   bookData.forEach(book => {
    const col = document.createElement('div');
    col.className = 'col-md-4 mb-4';

    col.innerHTML = `
    <div class="card h-100">
        <img src="${book.image}" class="card-img-top" alt="${book.title}">
        <div class="card-body">
        <h5 class="card-title">${book.title}</h5>
        <p class="card-text">by ${book.author}</p>
        <button onclick="readedBooks(this,${book.id})" class="btn read-btn">Mark as Read</button>
        </div>
    </div>
    `;

    container.appendChild(col);
});

});


const readedBooks = async(button,bookId)=>{
  try {
    //RETRIEVING THE ID
    const userId = localStorage.getItem("user_id")

      if (!userId) {
      alert("Please log in to mark this book as read.");
      return;
    }
    const response = await fetch(`${url}/userBooks/markBookAsRead`,{
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        user_id: userId,
        book_id: bookId
      })});
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    //BUTON AP
    button.textContent = "Added";
    button.classList.add("btn-success");
    button.disabled = true;

  } catch (error) {
    console.error("Error:", error);
    alert("Error adding a book")
  }
}

const logOut = ()=> {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user_id");
    location.href = "logIn.html";
}

