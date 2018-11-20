$(document).ready( () => {
   
    getZenQuote();
    
    $('#new-quote').on('click', (event) => {
        $(event.target).prev().remove();
        getZenQuote();
    })

    $('#todoInput').keypress((event) => {
        if(event.which == 13) {
            createTask();
        }
    });

    $('.modal').modal();

    $('#signup-form').on('submit', (event) => {
        event.preventDefault();
        createUser();
    })

    $('#login-form').on('submit', (event) => {
        event.preventDefault();
        userLogin();
    })

    $('.list').on('click', 'li', (event) => {
        updateTask($(event.target));
    });

    //don't forget to add the listening to something on the DOM that ISNT dynamically added
    $('.list').on('click', 'i', (event) => {
        event.stopPropagation();
        removeTask($(event.target).parent());
    });

    $('#logout').on('click', (event) => {
        currentlyLoggedIn();
    });

    currentlyLoggedIn();
});

function getTasks() {
    $.get('/api/tasks', addTasks)
    .catch((err) => {
        console.log(err);
    });
}

function addTasks(tasks) {
    tasks.forEach((task) => {
            addTask(task);
    });
}

function addTask(task) {
    let newTask = $('<li class="card-panel hoverable">' + task.task + '<i class="small material-icons right">clear</i></li>');
      newTask.data('id', task._id);
      newTask.data('completed', task.completed);
    if(task.completed){
        newTask.addClass("done");
    }
    $('.list').append(newTask);
}

function createTask() {
    let input = $('#todoInput').val();
    let taskname = {task: input}
    $.ajax({
        method:'POST',
        url:'/api/tasks', 
        data: taskname
    })
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

function getZenQuote() {
    $.ajax({
        method: 'GET',
        url: 'https://api.github.com/zen',
    })
    .done ((zenQuote) => {
      let newQuote = $('<h2 class="section">' + zenQuote + '</h2>');
      $('.quote').prepend(newQuote);
    })
    .catch((err) => {
        console.log(err);
    });
}

  function createUser() {
    let data = $('#signup-form').serialize();
    $.ajax({
        method:'POST',
        url:'/api/users', 
        data: data
    })
    .then(() => {
        currentlyLoggedIn();
    })
    .catch((err) => {
        console.log(err);
    })
}

    function userLogin() {
        let data = $('#login-form').serialize();
        $.ajax({
            method:'POST',
            url:'/api/users/login', 
            data: data
        })
        .done(() => {
            $.getJSON("/api/tasks")
            .then(addTasks)
            .catch((err) => {
                console.log(err);
            });
        })
        .then(() => {
            currentlyLoggedIn();
        })
        .catch((err) => {
            console.log(err);
        })
        
    }

    function currentlyLoggedIn () {
        $.getJSON("/api/user_data")
        .then((user) => {
            console.log(user.username);
            if (user.username == undefined) {
                $('#logout').addClass('hide');
                $('#taskInput').addClass('hide');
                console.log('Not Logged In');
            } else {
                $('#login-trigger').addClass('hide');
                $('#signup-trigger').addClass('hide');
                $('#logout').removeClass('hide');
                $('#taskInput').removeClass('hide');
                console.log('Logged in as: ' + user.username);
            }
        })
        .catch((err) => {
            console.log(err);
        })
        
    }
    

