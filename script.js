let tasks = [];

function addTask() {
    const taskName = document.getElementById('task').value;
    const dueDate = document.getElementById('due-date').value;
    const dueTime = document.getElementById('due-time').value;
    const taskDuration = parseFloat(document.getElementById('duration').value);

    if (taskName !== '' && dueDate !== '' && dueTime !== '' && !isNaN(taskDuration) && taskDuration > 0) {
        const taskDate = new Date(`${dueDate} ${dueTime}`);
        tasks.push({ name: taskName, date: taskDate, duration: taskDuration });
        document.getElementById('task-ul').innerHTML += `<li>${taskName} - ${taskDate.toLocaleString()} - ${taskDuration} hours</li>`;
        document.getElementById('task').value = '';
        document.getElementById('due-date').value = '';
        document.getElementById('due-time').value = '';
        document.getElementById('duration').value = '';
    }
}

function quicksort(tasks, left, right) {
    if (left < right) {
        const pivotIndex = partition(tasks, left, right);
        quicksort(tasks, left, pivotIndex - 1);
        quicksort(tasks, pivotIndex + 1, right);
    }
}

function partition(tasks, left, right) {
    const pivot = tasks[right].date;
    let i = left - 1;

    for (let j = left; j < right; j++) {
        if (tasks[j].date <= pivot) {
            i++;
            swap(tasks, i, j);
        }
    }

    swap(tasks, i + 1, right);
    return i + 1;
}

function swap(tasks, i, j) {
    const temp = tasks[i];
    tasks[i] = tasks[j];
    tasks[j] = temp;
}

function prioritizeTasks() {
    quicksort(tasks, 0, tasks.length - 1);

    const resultUl = document.getElementById('result-ul');
    resultUl.innerHTML = '';

    const currentDate = new Date();
    let currentTime = new Date();

    tasks.forEach((task) => {
        const isLate = task.date < currentDate;
        const formattedDate = task.date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' });

        if (isLate) {
            resultUl.innerHTML += `<li style="color: red;">[ATRASADO] ${task.name} - ${formattedDate} - Duração estimada: ${task.duration} horas</li>`;
        } else {
            resultUl.innerHTML += `<li>${task.name} - ${formattedDate} - Duração estimada: ${task.duration} horas</li>`;
        }

        const startTime = currentTime;
        const endTime = new Date(currentTime.getTime() + task.duration * 60 * 60 * 1000);

        if (isLate) {
            resultUl.innerHTML += `<li style="color: red;"> Agendado de ${startTime.toLocaleTimeString()} até ${endTime.toLocaleTimeString()}</li>`;
        } else {
            resultUl.innerHTML += `<li>Agendado de ${startTime.toLocaleTimeString()} até ${endTime.toLocaleTimeString()}</li>`;
        }

        currentTime = endTime;
    });
}
