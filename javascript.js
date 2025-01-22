const myLibrary = []

function Book(author, title, pages, read) {
  this.author = author
  this.title = title
  this.pages = pages
  this.read = read
}

function addBookToLibrary(book) {
  myLibrary.push(book)
}

function displayLibrary() {
    const library = document.querySelector('.library')
    library.replaceChildren()

    myLibrary.forEach((book, index) => {
        const card = document.createElement('div')
        card.classList.add('book')

        const title = document.createElement('div')
        title.classList.add('title')
        title.textContent = book.title
        card.appendChild(title)

        const author = document.createElement('div')
        author.classList.add('author')
        author.textContent = "by " + book.author
        card.appendChild(author)
        
        const pages = document.createElement('div')
        pages.classList.add('pages')
        pages.textContent = book.pages + " pages"
        card.appendChild(pages)

        const buttons = document.createElement('div')
        buttons.classList.add('buttons')

        const remove = document.createElement('button')
        remove.classList.add('remove')
        remove.textContent = "Remove"
        remove.addEventListener('click', () => {
            removeBookFromLibrary(index)
        })
        
        const toggle = document.createElement('button')
        toggle.classList.add('toggle')
        toggle.textContent = myLibrary[index].read ? "Read" : "Not Read"
        toggle.style.backgroundColor = myLibrary[index].read ? 'green' : 'red';
        toggle.addEventListener('click', () => {
            toogleRead(index)
        })
        
        buttons.appendChild(remove)
        buttons.appendChild(toggle)
        card.appendChild(buttons)

        library.appendChild(card)
    })
}

function clickButton() {
    const dialog = document.querySelector('dialog')
    const form = document.querySelector('form')
    const buttons = document.querySelectorAll('button')

    buttons.forEach(button => {
        button.addEventListener('click', (e) => {
            if (button.classList.contains('new')) {
                form.reset()
                dialog.showModal()
            }
            else if (button.classList.contains('close'))
                dialog.close()
            else if (button.classList.contains('add')) {
                if (addBook(e))
                    dialog.close()
            }
        })
    })
}

clickButton()

function addBook(e) {
    e.preventDefault()

    const form = e.target.closest('form')
    if (!form.checkValidity()) {
        form.reportValidity()
        return false
    }

    const author = document.getElementById('author').value
    const title = document.getElementById('title').value
    const pages = document.getElementById('pages').value
    const read = document.getElementById('read').checked
    
    const book = new Book(author, title, pages, read)
    addBookToLibrary(book)
    displayLibrary()

    return true
}

function removeBookFromLibrary(index) {
    myLibrary.splice(index, 1)
    displayLibrary()
}

function toogleRead(index) {
    myLibrary[index].read = !myLibrary[index].read
    displayLibrary()
}