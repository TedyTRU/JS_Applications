const url = 'http://localhost:3030/jsonstore/collections/students';

const list = document.querySelector('tbody');
const form = Array.from(document.querySelectorAll('#form input'));
document.getElementById('submit').addEventListener('click', submitStudent);

loadStudents();

async function submitStudent(event) {
    event.preventDefault();
    if (form.map(f => f.value.trim()).some(v => v == '')) {
        return;
    };

    const student = {
        firstName: form[0].value,
        lastName: form[1].value,
        facultyNumber: form[2].value,
        grade: Number(form[3].value),
    };

    const result = await createStudent(student);
    loadStudents();
    form.forEach(f => f.value = '');
}

async function createStudent(student) {
    const options = {
        method: 'post',
        headres: { 'Content-Type': 'application/json' },
        body: JSON.stringify(student)
    };

    const res = await fetch(url, options);
    const result = await res.json();

    return result;
}

async function loadStudents() {
    const res = await fetch(url);
    const data = await res.json();

    const result = Object.values(data).map(s => createRow(s));
    list.replaceChildren(...result);
}

function createRow(student) {
    const row = document.createElement('tr');
    row.innerHTML = `<td>${student.firstName}</td>
    <td>${student.lastName}</td>
    <td>${student.facultyNumber}</td>
    <td>${student.grade}</td>`;

    return row;
}