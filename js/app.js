// buttons
const submit = document.getElementById("submit");
const clear = document.getElementById("clear");

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
  static deleteRecord(target) {
    if (target.classList.contains("delete")) {
      target.parentNode.parentNode.remove();
    }
  }
}
// This adds the existing list of books when the App is loaded
document.addEventListener("DOMContentLoaded", UI.displayBooks);

let trash = document.querySelector(".table-body");
trash.addEventListener("click", element => {
  console.log("click recorded ", element.target);
  UI.deleteRecord(element.target);
});
