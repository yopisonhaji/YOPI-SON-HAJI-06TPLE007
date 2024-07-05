document.addEventListener('DOMContentLoaded', () => {
    fetchStudents();

    document.getElementById('studentForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const id = document.getElementById('studentId').value;
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        if (id) {
            updateStudent(id, name, email);
        } else {
            createStudent(name, email);
        }
    });
});

function fetchStudents() {
    fetch('/api/students')
        .then(response => response.json())
        .then(students => {
            const tableBody = document.querySelector('#studentsTable tbody');
            tableBody.innerHTML = '';
            students.forEach(student => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${student.id}</td>
                    <td>${student.name}</td>
                    <td>${student.email}</td>
                    <td>
                        <button onclick="editStudent(${student.id}, '${student.name}', '${student.email}')">Edit</button>
                        <button onclick="deleteStudent(${student.id})">Delete</button>
                    </td>
                `;
                tableBody.appendChild(row);
            });
        });
}

function createStudent(name, email) {
    fetch('/api/students', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email })
    })
    .then(response => response.json())
    .then(student => {
        fetchStudents();
        clearForm();
    });
}

function updateStudent(id, name, email) {
    fetch(`/api/students/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email })
    })
    .then(response => response.json())
    .then(student => {
        fetchStudents();
        clearForm();
    });
}

function deleteStudent(id) {
    fetch(`/api/students/${id}`, {
        method: 'DELETE'
    })
    .then(response => response.json())
    .then(message => {
        fetchStudents();
    });
}

function editStudent(id, name, email) {
    document.getElementById('studentId').value = id;
    document.getElementById('name').value = name;
    document.getElementById('email').value = email;
}

function clearForm() {
    document.getElementById('studentId').value = '';
    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
}
