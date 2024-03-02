const myLibrary = [];
const title = document.querySelector("#title");
const author = document.querySelector("#author");
const pages = document.querySelector("#pages");
const read = document.querySelector("#read");
const empty = document.querySelector(".empty");
const bookCount = document.querySelector(".book-count");

const submit = document
  .querySelector("#input-card")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    addBookToLibrary();
  });

empty.addEventListener("click", function () {
  myLibrary.length = 0;
  displayBooks();
});

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.toggleRead = function () {
    this.read = !this.read;
  };
}

function displayBooks() {
  const display = document.querySelector(".books-display");
  display.innerHTML = "";
  bookCount.textContent =
    myLibrary.length === 1
      ? "1 book in library. 📚"
      : `${myLibrary.length} books in library. 📚`;

  myLibrary.forEach((book, index) => {
    const bookCard = document.createElement("div");
    bookCard.classList.add("book-card");

    const bookContent = document.createElement("div");
    bookContent.classList.add("book-content");

    const titleElement = document.createElement("p");
    titleElement.classList.add("book-title");
    titleElement.textContent = `${book.title}`;
    bookContent.appendChild(titleElement);

    const authorElement = document.createElement("p");
    authorElement.classList.add("book-author");
    authorElement.textContent = `by ${book.author}🖊️`;
    bookContent.appendChild(authorElement);

    const pagesElement = document.createElement("p");
    pagesElement.classList.add("book-pages");
    pagesElement.textContent = `${book.pages} pages 📖`;
    bookContent.appendChild(pagesElement);

    const readElement = document.createElement("p");
    readElement.classList.add("book-read");
    readElement.addEventListener("click", function () {
      book.toggleRead();
      displayBooks();
    });
    readElement.textContent = `${book.read ? "Read ✅" : "Not read ❌"}`;
    bookContent.appendChild(readElement);

    const removeBookBtn = document.createElement("button");
    removeBookBtn.classList.add("remove-book");
    removeBookBtn.textContent = "Remove";
    removeBookBtn.addEventListener("click", () => removeBook(index));

    bookCard.appendChild(bookContent);
    bookCard.appendChild(removeBookBtn);
    display.appendChild(bookCard);
  });
}

function removeBook(index) {
  myLibrary.splice(index, 1);
  displayBooks();
}

function addBookToLibrary() {
  const newBook = new Book(
    title.value,
    author.value,
    pages.value,
    read.checked
  );
  myLibrary.push(newBook);
  displayBooks();
}
