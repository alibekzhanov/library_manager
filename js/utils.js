export function saveData({ books, users, cards }) {
    if (books) localStorage.setItem('books', JSON.stringify(books));
    if (users) localStorage.setItem('users', JSON.stringify(users));
    if (cards) localStorage.setItem('cards', JSON.stringify(cards));
}
