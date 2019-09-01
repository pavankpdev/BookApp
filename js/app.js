// reference constantes & variables
const submit = document.getElementById("submit");
const clear = document.getElementById("clear");
const success = "Success! your book has been added";
const danger = "Please fill in required fields.";
const clearTable = document.getElementById("clearTable");
let bookList;
let idG = 0;

// Book Class: Represents a Book (this returs the input values as an object)
class Book {
  constructor(title, author, isbn, date, id) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
    this.date = date;
    this.id = id;
  }
}

//class to handle UI tasks
class UI {
  static displayBooks() {
    Store.getItem();
    console.log("TCL: UI -> displayBooks -> bookList", bookList);

    bookList.forEach(books => UI.addBook(books));
  }
  // method add books to list in UI
  static addBook(records) {
    let table = document.querySelector(".table-body");
    let tableRow = document.createElement("tr");
    tableRow.innerHTML = `
    <td>${records.title}</td>
    <td>${records.author}</td>
    <td>${records.isbn}</td>
    <td>${records.date}</td>
    <td><i class="far fa-trash-alt text-danger delete" id=${records.id}></i></td>
    `;
    table.appendChild(tableRow);
  }

  // method ro delete record
  static deleteRecord(target) {
    if (target.classList.contains("delete")) {
      target.parentNode.parentNode.remove();
    }
    let test = target.attributes.id.values;
  }

  // method to clear input fields after inserting books
  static clearFields() {
    document.getElementById("title").value = "";
    document.getElementById("author").value = "";
    document.getElementById("isbn").value = "";
    document.getElementById("date").value = "";
  }

  // method to create alert
  static message(classname, message) {
    let alertSpot = document.querySelector(".card-body");
    let alertElement = `
        <div
        class="alert alert-${classname} alert-dismissible fade show"
        role="alert"
        data-dismiss="alert"
        data-auto-dismiss="2000"
      >
        <button
          type="button"
          class="close"
          data-dismiss="alert"
          aria-label="Close"
        >
          <span aria-hidden="true">&times;</span>
          <span class="sr-only">Close</span>
        </button>
        <strong>${message}</strong>
      </div>
      `;
    alertSpot.insertAdjacentHTML("beforebegin", alertElement);
    setTimeout(() => document.querySelector(".alert").remove(), 3000);
  }

  // clear table method
  static clearTable() {
    const tableBody = document.querySelector(".table-body");
    tableBody.innerHTML = "";
    UI.message("info", "Success! Table's Cleared");
    localStorage.clear("book");
    bookList = [];
    console.log("TCL: UI -> clearTable -> bookList", bookList);
  }
}

// Storage class

class Store {
  static getItem() {
    let data = localStorage.getItem("book");
    if (data) {
      let arrayOfBooks = JSON.parse(data);
      bookList = arrayOfBooks;
    } else {
      bookList = [];
    }
  }

  static addItem(book) {
    bookList.push({
      title: book.title,
      author: book.author,
      isbn: book.isbn,
      date: book.date,
      id: idG
    });
    localStorage.setItem("book", JSON.stringify(bookList));
    idG++;
  }

  static removeItem(isbn) {
    const books = JSON.parse(localStorage.getItem("book"));
    for (let i = 0; i < books.length; i++) {
      if (books[i].isbn === isbn) {
        books.splice(i, 1);
      }
    }

    console.log("TCL: Store -> removeItem -> books", books);

    localStorage.setItem("book", JSON.stringify(books));
  }
}

// This adds the existing list of books when the App is loaded
document.addEventListener("DOMContentLoaded", UI.displayBooks);

// this will trigger a method to remove a record
let trash = document.querySelector(".table-body");
trash.addEventListener("click", element => {
  console.log("click recorded ", element.target);
  UI.deleteRecord(element.target);
  let idRemove = element.target.attributes.id.value;
  console.log("TCL: idRemove", idRemove);
  Store.removeItem(
    element.target.parentElement.previousElementSibling.textContent
  );
});

//clear table button's icon animation triggered
clearTable.addEventListener("mouseover", () => {
  const spin = document.querySelector(".fa-sync-alt");
  spin.classList.add("w3-spin");
});

//clear table button's icon animation stopped
clearTable.addEventListener("mouseout", () => {
  const spin = document.querySelector(".fa-sync-alt");
  spin.classList.remove("w3-spin");
});

// functionality triggered when submit button in pressed
submit.addEventListener("click", () => {
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const isbn = document.getElementById("isbn").value;
  const date = document.getElementById("date").value;

  if (title == "" || author == "" || isbn == "" || date == "") {
    UI.message("danger", danger);
  } else {
    // Instantiating Book class to wrap the input fields into an object
    let book = new Book(title, author, isbn, date, idG);
    console.log("TCL: book", book);

    // Using addBook method to display records into list
    UI.addBook(book);

    // clear the input fields after successfull insertion
    UI.clearFields();

    // alerts success message
    UI.message("success", success);

    Store.addItem(book);
  }
});

// functionality triggered when submit button in pressed

clear.addEventListener("click", () => {
  UI.clearFields();
});

clearTable.addEventListener("click", () => {
  UI.clearTable();
});
