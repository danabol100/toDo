const input = document.querySelector('[todo-input]');
const addTodoBtn = document.querySelector('[todo-btn]');
const list = document.querySelector('[todo-list]');
const darkBtn = document.querySelector("#toggle-dark");
const toggle = document.querySelector("#toggle-dark-place");


const body = document.querySelector('#body');
const toDo = document.querySelector('#todo');

let tasksToDo = [];


function loadTasksFromStorage() {
    const saved = localStorage.getItem('tasksToDo');
    if (!saved) return; // Если ничего не сохранено — выходим

    tasksToDo = JSON.parse(saved); // Преобразуем строку в массив

    tasksToDo.forEach((task) => {
        // Создаём <li> и элементы внутри
        const li = document.createElement("li");
        const span = document.createElement("span");
        span.textContent = task.text;

        if (task.done) {
            li.classList.add("done"); // Отмечаем выполненные
        }

        const btnDone = document.createElement("button");
        btnDone.setAttribute("data-action", "done");
        btnDone.textContent = "Готово";
        btnDone.classList.add("btndone");

        const btnDelete = document.createElement("button");
        btnDelete.setAttribute("data-action", "delete");
        btnDelete.textContent = "x";
        btnDelete.classList.add("btndelete");

        li.appendChild(span);
        li.appendChild(btnDone);
        li.appendChild(btnDelete);

        list.appendChild(li); // Добавляем задачу в <ul>
    });

    updateCounter(); // Обновляем счётчик задач
}

loadTasksFromStorage();

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
    const taskText = input.value.trim(); // сначала сохраняем текст
    if (taskText === "") return;

    const li = document.createElement("li");
    const span = document.createElement("span");
    span.textContent = taskText;

    const btnDone = document.createElement('button');
    btnDone.setAttribute('data-action', 'done');
    btnDone.textContent = "Готово";
    btnDone.classList.add("btndone");

    const btnDelete = document.createElement('button');
    btnDelete.setAttribute('data-action', 'delete');
    btnDelete.textContent = "✕";
    btnDelete.classList.add("btndelete");

    li.appendChild(span);
    li.appendChild(btnDone);
    li.appendChild(btnDelete);

    list.appendChild(li);

    input.value = "";
    updateCounter();

    tasksToDo.push({ text: taskText, done: false });
    localStorage.setItem('tasksToDo', JSON.stringify(tasksToDo));
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
    const text = li.querySelector('span').textContent;

    if (action === 'done') {
        li.classList.add('done');
        list.appendChild(li);
        // Находим задачу в массиве и обновляем её статус
        const task = tasksToDo.find(task => task.text === text);
        if (task) {
            task.done = true;
            localStorage.setItem('tasksToDo', JSON.stringify(tasksToDo));
        }

        updateCounter();
    }

    if (action === "delete") {
        li.remove();


        tasksToDo = tasksToDo.filter(task => task.text !== text);
        localStorage.setItem('tasksToDo', JSON.stringify(tasksToDo));

        updateCounter();
    }
});

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