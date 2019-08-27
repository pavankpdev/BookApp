// Book class to hold the book object
// This class 'Book' is assumed as local storage
class Book {
  constructor(title, author, isbn, date) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
    this.date = date;
  }
}

// UI class to handle UI task

class UI {
  static displayBook() {
    let arrayOfBooks = [
      {
        title: "JS",
        author: "pavan",
        isbn: 123,
        date: "2019-08-24"
      },
      {
        title: "JS",
        author: "pavan",
        isbn: 123,
        date: "2019-08-24"
      }
    ];
    let book = arrayOfBooks;
    book.forEach(books => {
      UI.addBookToList(books);
    });
  }

  //method to add a book
  static addBookToList(books) {
    const list = document.querySelector(".table-body");
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${books.title}</td>
      <td>${books.author}</td>
      <td>${books.isbn}</td>
      <td>${books.date}</td>
      <td><i class="far fa-trash-alt text-danger fa-lg delete" id="trash"></i></td>  
      `;
    list.appendChild(row);
  }

  // method to delete a book
  static deleteBook(element) {
    if (element.classList.contains("delete")) {
      element.parentNode.parentNode.remove();
    }
  }

  static clearFields() {
    document.getElementById("title").value = "";
    document.getElementById("author").value = "";
    document.getElementById("isbn").value = "";
    document.getElementById("release_date").value = "";
  }
}

// event listeners to load the table

document.addEventListener("DOMContentLoaded", UI.displayBook());

// Add a book from the UI

const submit = document.getElementById("submit");
submit.addEventListener("click", () => {
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const isbn = document.getElementById("isbn").value;
  const date = document.getElementById("release_date").value;

  let books = new Book(title, author, isbn, date); // assuming that we're storing the book details in the local storage

  // call a method from UI handler to display this values in the UI

  UI.addBookToList(books);

  // call a method to clear the input fields after submiting a book.

  UI.clearFields();
});

// call a method to delete a book

const trash = document.querySelector(".table-body");
trash.addEventListener("click", element => {
  UI.deleteBook(element.target);
});
