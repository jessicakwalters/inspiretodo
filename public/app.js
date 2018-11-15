$(document).ready( () => {
    $.getJSON("/api/tasks")
    .then(addTasks)
    .catch((err) => {
        console.log(err);
    });

    $('#todoInput').keypress((event) => {
        if(event.which == 13) {
            createTask();
        }
    });

    $('.list').on('click', 'li', (event) => {
        updateTask($(event.target));
    });

    //don't forget to add the listening to something on the DOM that ISNT dynamically added
    $('.list').on('click', 'span', (event) => {
        event.stopPropagation();
        removeTask($(event.target).parent());
    });
});



function addTasks(tasks) {
    tasks.forEach((task) => {
       addTask(task);
    });
}

function addTask(task) {
    let newTask = $('<li class="task">' + task.task + '<span>X</span></li>');
      newTask.data('id', task._id);
      newTask.data('completed', task.completed);
    console.log(newTask.data());
    if(task.completed){
        newTask.addClass("done");
    }
    $('.list').append(newTask);
}

function createTask() {
    let input = $('#todoInput').val();
    $.post('/api/tasks', {task: input})
    .then((newTask) => {
        $('#todoInput').val('');
        addTask(newTask);
    })
    .catch((err) => {
        console.log(err);
    })
}

function removeTask(task) {
    let clickedId = task.data('id');
    let url = '/api/tasks/' + clickedId
    $.ajax({
        method: 'DELETE',
        url: url
    })
    .then((data) => {
        task.remove();
    })
    .catch((err) => {
        console.log(err);
    })
}

function updateTask(task){
    let clickedId = task.data('id');
    let clickedStatus = !task.data('completed');
    let update = {completed: clickedStatus};
    let url = '/api/tasks/' + clickedId
    $.ajax({
        method: 'PUT',
        url: url,
        data: update
    })
    .then ((updatedTask) => {
        task.toggleClass('done');
        task.data('completed', clickedStatus);
    })
    .catch((err) => {

    })

    console.log();
}