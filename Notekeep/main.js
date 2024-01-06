document.addEventListener('DOMContentLoaded', () => {
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    const notesContainer = document.getElementById('notes');
    const form = document.getElementById('noteForm');

    const saveNotes = (notes) => {
        localStorage.setItem('notes', JSON.stringify(notes));
        displayNotes();
    };

    const createNoteElement = (note) => {
        const element = document.createElement('div');
        element.classList.add('note');
        element.style.backgroundColor = note.color;
        element.innerHTML = `
            <h3>${note.title}</h3>
            <p>${note.content}</p>
            <small>${note.date}</small>
            <span class="delete" onclick="deleteNote('${note.id}')">Usuń</span>
        `;
        return element;
    };

    const displayNotes = () => {
        notesContainer.innerHTML = '';
        notes.sort((a, b) => b.pin - a.pin);
        notes.forEach(note => {
            notesContainer.appendChild(createNoteElement(note));
        });
    };

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const title = document.getElementById('title').value;
        const content = document.getElementById('content').value;
        const color = document.getElementById('color').value;
        const pin = document.getElementById('pin').checked;
        const date = new Date().toLocaleDateString('pl-PL');
        const id = Date.now().toString();

        const newNote = { id, title, content, color, pin, date };
        notes.push(newNote);
        saveNotes(notes);

        form.reset();
    });

    window.deleteNote = (id) => {
        const index = notes.findIndex(note => note.id === id);
        if (index > -1) {
            notes.splice(index, 1);
            saveNotes(notes);
        }
    };

    displayNotes();
});
