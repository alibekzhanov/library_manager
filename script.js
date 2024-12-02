import { data } from './data.js';
import { setInitialBooks, addBook, renderBooks } from './js/books.js';

const tabs = document.querySelectorAll('nav ul li a');
const tabContents = document.querySelectorAll('.tab-content');
const modal = document.getElementById('modal');
const addBookButton = document.getElementById('add-book');
const closeModalButton = document.getElementById('close-modal');
const addBookForm = document.getElementById('add-book-form');


setInitialBooks(data.books);


tabs.forEach(tab => {
    tab.addEventListener('click', (e) => {
        e.preventDefault();
        const target = e.target.dataset.tab;

        tabContents.forEach(content => {
            content.classList.remove('active');
        });

        document.getElementById(target).classList.add('active');
    });
});


addBookButton.addEventListener('click', () => {
    modal.classList.add('show');
});


closeModalButton.addEventListener('click', () => {
    modal.classList.remove('show');
});


addBookForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('book-name').value;
    const author = document.getElementById('book-author').value;
    const year = document.getElementById('book-year').value;
    const count = document.getElementById('book-count').value;

    addBook(name, author, year, count);

    modal.classList.remove('show');
    addBookForm.reset();
});


renderBooks();
