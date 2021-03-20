// Book class: Represents a Book
class Book{
    constructor(title, author, isbn){
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}


// UI class: Handle UI tasks
class UI{
    static displayBook(){
        const StoredBooks = [
            {
                title: "Book One",
                author: "John Doe",
                isbn: "3434343434343434"
            },
            {
                title: "Book Two",
                author: "Jane Doe",
                isbn: "4545454545454545"
            }
        ];
        const books = StoredBooks;

        books.forEach((book) => UI.addBookToList(book));
    }
    static addBookToList(book){
        const list = document.querySelector('#book-list');

        const row = document.createElement('tr');

        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
        `;

        list.appendChild(row);
    }

    static deleteBook(target){
        if(target.classList.contains('delete')){
            // targeting the parent element, the "tr" tag
            target.parentElement.parentElement.remove();
        }
    }

    static showAlert(message, className){
        const div = document.createElement('div');
        // add an alert class to the div element for alert
        div.className = `alert alert-${className}`;

        // add message inside the div element
        div.appendChild(document.createTextNode(message));

        // grab a container and form and put container of the alert popup inbetween div and form
        const container = document.querySelector('.container');
        const form = document.querySelector('#book-form');
        
        container.insertBefore(div, form);

        // Make it vanish after 3 seconds
        setTimeout(() => document.querySelector('.alert').remove(), 3000);
    }

    static clearFields(){
        document.querySelector("#title").value = "";
        document.querySelector("#author").value = "";
        document.querySelector("#isbn").value = "";
    }
}

// Store class: Handles Storage
class Storage{
    
}

// Events to desplay books
document.addEventListener('DOMContentLoaded', UI.displayBook);

// Events to add a book
document.querySelector('#book-form').addEventListener('submit', (e) => {
    // prevent the actual submit
    e.preventDefault();

    // Get form values
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const isbn = document.querySelector('#isbn').value;

    // Validate
    if(title === "" || author === "" || isbn === ""){
        UI.showAlert("Please fill in all of the fields.", "danger");
    }
    else{
        // instantiate a book
        const book = new Book(title, author, isbn);

        // add book to UI
        UI.addBookToList(book);

        // Show success message
        UI.showAlert("You have successfully put in a new book!", "success");

        // clear fields
        UI.clearFields();
    
    }
});

// Events to remove a book
document.querySelector('#book-form').addEventListener('click', (e) =>{
    UI.deleteBook(e.target);

    // Show info message
    UI.showAlert("You have successfully removed a book!", "info");
});