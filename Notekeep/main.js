document.addEventListener('DOMContentLoaded', () => {
    // Pobranie notatek
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    // Pobranie kontenera
    const notesContainer = document.getElementById('notes');
    // Pobranie formularza
    const form = document.getElementById('noteForm');

    // Funkcja zapisująca notatki
    const saveNotes = (notes) => {
        localStorage.setItem('notes', JSON.stringify(notes));
        displayNotes();
    };

    const createNoteElement = (note) => {
        const element = document.createElement('div');
        element.classList.add('note'); // Dodanie klasy 'note'
        element.style.backgroundColor = note.color; // Tło notatki
        // Ustawienie treści: tytuł, treść, data, przycisk usuwania
        element.innerHTML = `
            <h3>${note.title}</h3>
            <p>${note.content}</p>
            <small>${note.date}</small>
            <span class="delete" onclick="deleteNote('${note.id}')">Usuń</span>
        `;
        return element;
    };

    // Funkcja wyświetlająca wszystkie notatki
    const displayNotes = () => {
        notesContainer.innerHTML = ''; // Wyczyszczenie kontenera
        // Sortowanie notatek w kolejności od najnowszej
        notes.sort((a, b) => b.pin - a.pin);
        // Czynność po każdej notatce i dodanie ich
        notes.forEach(note => {
            notesContainer.appendChild(createNoteElement(note));
        });
    };

    // Sprawdzenie zdarzenia 'submit'
    form.addEventListener('submit', (e) => {
        e.preventDefault(); // Zapobieganie domyślnej akcji przesyłania formularza

        // Pobranie wartości pól
        const title = document.getElementById('title').value;
        const content = document.getElementById('content').value;
        const color = document.getElementById('color').value;
        const pin = document.getElementById('pin').checked;
        const date = new Date().toLocaleDateString('pl-PL'); // Pobranie aktualnej daty
        const id = Date.now().toString(); // Utworzenie unikalnego identyfikatora notatki

        // Utworzenie nowej notatki na podstawie pobranych wartości
        const newNote = { id, title, content, color, pin, date };
        notes.push(newNote); // Dodanie nowej notatki do tablicy
        saveNotes(notes); // Zapisanie notatek i odświeżenie wyświetlania

        form.reset(); // Wyczyszczenie formularza po dodaniu notatki
    });

    // Funkcja usuwająca notatki
    window.deleteNote = (id) => {
        // Znalezienie id notatki
        const index = notes.findIndex(note => note.id === id);
        if (index > -1) {
            notes.splice(index, 1); // Usunięcie notatki z tablicy
            saveNotes(notes); // Zapisanie notatek po usunięciu
        }
    };

    displayNotes();
});
