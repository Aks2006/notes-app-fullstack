const form = document.getElementById('noteForm');
const notesContainer = document.getElementById('notesContainer');

// Fetch and render all notes
async function fetchNotes() {
    try {
        const response = await fetch('/api/notes');
        const notes = await response.json();

        notesContainer.innerHTML = ''; // Clear previous notes

        notes.forEach(note => {
            const div = document.createElement('div');
            div.className = 'note';
            div.innerHTML = `
                <h3>${note.title}</h3>
                <p>${note.content}</p>
                <button class="delete-btn" onclick="deleteNote('${note._id}')">Delete</button>
            `;
            notesContainer.appendChild(div);
        });
    } catch (error) {
        console.error('Error fetching notes:', error);
    }
}

// Create a new note:
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;

    await fetch('/api/notes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content }),
    });

    form.reset();
    fetchNotes(); // Refresh the list
});

// Delete note
async function deleteNote(id) {
    await fetch(`/api/notes/${id}`, {
        method: 'DELETE',
    });
    fetchNotes(); // Refresh the list
}

// Initialize
fetchNotes();
