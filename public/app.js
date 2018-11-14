$(document).ready( () => {
    $.getJSON("/api/tasks")
    .then(addTasks)
    .catch((err) => {
        res.send(err);
    })
});

function addTasks(tasks) {
    tasks.forEach((item) => {
        let newTask = $('<li class="task">' + item.task + '</li>');
        $('.list').append(newTask);
    });
}