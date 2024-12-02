import { saveData } from './utils.js';

let books = JSON.parse(localStorage.getItem('books')) || [];

export function setInitialBooks(dataBooks) {
    if (!localStorage.getItem('books')) {
        books = dataBooks;
        saveData({ books });
    } else {
        books = JSON.parse(localStorage.getItem('books'));
    }
}

export function addBook(name, author, year, count) {
    const newId = books.length ? books[books.length - 1].id + 1 : 1;
    const newBook = { id: newId, name, author, year: parseInt(year), count: parseInt(count) };
    books.push(newBook);
    saveData({ books });
    renderBooks();
}

export function deleteBook(id) {
    books = books.filter(book => book.id !== id);
    saveData({ books });
    renderBooks();
}

export function editBook(id, updatedData) {
    const bookIndex = books.findIndex(book => book.id === id);
    if (bookIndex !== -1) {
        books[bookIndex] = { ...books[bookIndex], ...updatedData };
        saveData({ books });
        renderBooks();
    }
}

export function renderBooks() {
    const booksContainer = document.getElementById('books-container');
    booksContainer.innerHTML = '';
    books.forEach(book => {
        const bookCard = document.createElement('div');
        bookCard.classList.add('book-card');
        bookCard.dataset.id = book.id;
        bookCard.innerHTML = `
            <h3>${book.name}</h3>
            <p>Автор: ${book.author}</p>
            <p>Год: ${book.year}</p>
            <p>Количество: ${book.count}</p>
            <button class="edit-book" data-id="${book.id}">Изменить</button>
            <button class="delete-book" data-id="${book.id}">Удалить</button>
        `;
        booksContainer.appendChild(bookCard);
    });

    document.querySelectorAll('.delete-book').forEach(button => {
        button.addEventListener('click', () => deleteBook(parseInt(button.dataset.id)));
    });

    document.querySelectorAll('.edit-book').forEach(button => {
        button.addEventListener('click', () => {
            const bookId = parseInt(button.dataset.id);
            const book = books.find(b => b.id === bookId);
            if (book) {
                const modal = document.getElementById('modal');
                const form = document.getElementById('add-book-form');
                document.getElementById('book-name').value = book.name;
                document.getElementById('book-author').value = book.author;
                document.getElementById('book-year').value = book.year;
                document.getElementById('book-count').value = book.count;
                modal.classList.add('show');

                form.onsubmit = (event) => {
                    event.preventDefault();
                    const updatedData = {
                        name: document.getElementById('book-name').value,
                        author: document.getElementById('book-author').value,
                        year: parseInt(document.getElementById('book-year').value),
                        count: parseInt(document.getElementById('book-count').value),
                    };
                    editBook(bookId, updatedData);
                    modal.classList.remove('show');
                    form.reset();
                };

                document.getElementById('close-modal').onclick = () => {
                    modal.classList.remove('show');
                    form.reset();
                };
            }
        });
    });
}
