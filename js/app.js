// reference constantes
const submit = document.getElementById("submit");
const clear = document.getElementById("clear");
const success = "Success! your book has been added";
const danger = "Please fill in required fields.";

// Book Class: Represents a Book
class Book {
  constructor(title, author, isbn, date) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
    this.date = date;
  }
}

//class to handle UI tasks
class UI {
  static displayBooks() {
    let arrayOfBooks = [
      {
        title: "Pavan",
        author: "kp",
        isbn: "123",
        date: "12/12/2000"
      },
      {
        title: "JS",
        author: "Pavan",
        isbn: "456",
        date: "112/2/2000"
      }
    ];
    let booksRecord = arrayOfBooks;
    booksRecord.forEach(books => UI.addBook(books));
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
    <td><i class="far fa-trash-alt text-danger delete"></i></td>
    `;
    table.appendChild(tableRow);
  }

  // method ro delete record
  static deleteRecord(target) {
    if (target.classList.contains("delete")) {
      target.parentNode.parentNode.remove();
    }
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
}

// This adds the existing list of books when the App is loaded
document.addEventListener("DOMContentLoaded", UI.displayBooks);

// this will trigger a method to remove a record
let trash = document.querySelector(".table-body");
trash.addEventListener("click", element => {
  console.log("click recorded ", element.target);
  UI.deleteRecord(element.target);
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
    let book = new Book(title, author, isbn, date);

    // Using addBook method to display records into list
    UI.addBook(book);

    // clear the input fields after successfull insertion
    UI.clearFields();

    // alerts success message
    UI.message("success", success);
  }
});

// functionality triggered when submit button in pressed

clear.addEventListener("click", () => {
  UI.clearFields();
});
