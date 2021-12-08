import { html, render } from './node_modules/lit-html/lit-html.js';

// template:
// display item data
// highlight item based on match

const studentRow = (student) => html`

`;

const input = document.getElementById('searchField');
document.getElementById('searchBtn').addEventListener('click', onSearch);
let students;
start();

// start:
// fetch and parse data
// add event listeners
// call update
async function start() {
   const res = await fetch('http://localhost:3030/jsonstore/advanced/table');
   const data = await res.json();
   students = Object.values(data).map(s => ({ item: s, match: false }));

   update();
}

// update:
// render template
function update() {
   render(students.map(studentsRow), document.querySelector('tbody'));
}

// on search
// read input value
// compare input with all data fields
// mark matching items
// call update
function onSearch() {
   const value = input.value.trim().toLocaleLowerCase();

   for (let student of students) {
      student.match = Object.values(student.item).some(v => v.toLocaleLowerCase().includes(value));
   }

   update();
}




