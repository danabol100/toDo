const input = document.querySelector('[todo-input]');
const addTodoBtn = document.querySelector('[todo-btn]');
const list = document.querySelector('[todo-list]');
const darkBtn = document.querySelector("#toggle-dark");
const toggle = document.querySelector("#toggle-dark-place");


const body = document.querySelector('#body');
const toDo = document.querySelector('#todo');


toggle.addEventListener("click", () => {
    body.classList.toggle("dark");
    toDo.classList.toggle('dark');
    input.classList.toggle('dark')

    darkBtn.classList.toggle('move-right')


})
// darkBtn.addEventListener('click', () => {
//     body.chainList.remove("dark");
// })



function addTask() {


    const li = document.createElement("li");
    const span = document.createElement("span");

    span.textContent = input.value;
    if (input.value.trim() === "") return;


    const btnDone = document.createElement('button');
    btnDone.setAttribute('data-action', 'done');
    btnDone.textContent = "Готово";
    btnDone.classList.add("btndone");

    const btnDelete = document.createElement('button');
    btnDelete.setAttribute('data-action', 'delete')
    btnDelete.textContent = "x";
    btnDelete.classList.add("btndelete");


    li.appendChild(span);
    li.appendChild(btnDone);
    li.appendChild(btnDelete);


    list.appendChild(li);
    input.value = "";
    updateCounter();
}

addTodoBtn.addEventListener('click', addTask);

input.addEventListener('keydown', (e) => {
    if (e.key === "Enter") {
        addTask();
    }
});



list.addEventListener("click", (e) => {
    const action = e.target.dataset.action;
    if (!action) return;
    const li = e.target.closest('li');

    if (action === 'done') {
        li.classList.add('done');
        updateCounter();

    }
    if (action === "delete") {
        li.remove();
        updateCounter();

    }
})
function updateCounter() {
    const counter = document.querySelector('[data-counter]');
    const tasks = list.querySelectorAll('li');

    let activeCount = 0;
    tasks.forEach((task) => {
        if (!task.classList.contains('done')) {
            activeCount += 1;
        }
    })

    counter.innerText = `Осталось задач: ${activeCount}`;
} 