
// Book class to hold the book object

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
  static addBookToList(books) {
    const list = document.querySelector(".table-body");
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${books.title}</td>
      <td>${books.author}</td>
      <td>${books.isbn}</td>
      <td>${books.date}</td>
      <td><i class="far fa-trash-alt text-danger fa-lg"></i></td>  
      `;
    list.appendChild(row);
  }
}

// event listeners to load the table

document.addEventListener("DOMContentLoaded",UI.displayBook());