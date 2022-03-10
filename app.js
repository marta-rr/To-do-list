
$(document).ready(function(){

$('.button-bonus').append('<button class="show-completed">Complete</button>');
$('.button-bonus').append('<button class="show-active">Active</button>');
$('.button-bonus').append('<button class="show-all">All</button>');

function displayTasks(){
    $.ajax({
      type: 'GET',
      url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks?api_key=296',
      dataType: 'json',
      success: function (response, textStatus) {
        $('.list').empty();
        $('.bonus').empty();
        response.tasks.forEach(function (task) {
          $('.list').append('<div class="row"><div class="col-9">'+
            '<input type="checkbox"class="mark-complete"data-id="' +
            task.id+'"'+(task.completed ? 'checked' : '')+'>'
            +  task.content +
            '</span></div><div class="col-3"><button class="delete" data-id="' +
            task.id + '">Delete</button></div></div>');
        })
      },
      error: function (request, textStatus, errorMessage) {
        console.log(errorMessage);
      }
    });
}

function checkCompletedTasks(){
   $.ajax({
     type: 'GET',
     url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks?api_key=296',
     dataType: 'json',
     success: function (response, textStatus) {
         $('.list').empty();
         $('.bonus').empty();
       response.tasks.forEach(function (task){
           if(task.completed){
             $('.bonus').append('<div class="row"><div class="col-9">'+
                 '<input type="checkbox"class="mark-complete"data-id="' +
                 task.id+'"'+(task.completed ? 'checked' : '')+'>'
                 + task.content +
                 '</div><div class="col-3"><button class="delete" data-id="' +
                 task.id + '">Delete</button></div></div>');
           }
       })
     },
     error: function (request, textStatus, errorMessage) {
       console.log(errorMessage);
     }
   });
}

$(document).on('click', '.show-completed', function () {
  checkCompletedTasks($(this).data('id'));
});

function checkActive(){
  $.ajax({
    type: 'GET',
    url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks?api_key=296',
    dataType: 'json',
    success: function (response, textStatus) {
        $('.list').empty();
        $('.bonus').empty();
      response.tasks.forEach(function (task){
          if(task.completed == false){
            $('.bonus').append('<div class="row"><div class="col-9">'+
                '<input type="checkbox"class="mark-complete"data-id="' +
                task.id+'"'+(task.completed ? 'checked' : '')+'>'
                + task.content +
                '</div><div class="col-3"><button class="delete" data-id="' +
                task.id + '">Delete</button></div></div>');
          }
      })
    },
    error: function (request, textStatus, errorMessage) {
      console.log(errorMessage);
    }
  });
}

$(document).on('click', '.show-active', function () {
  checkActive($(this).data('id'));
});

function checkAll(){
  $.ajax({
    type: 'GET',
    url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks?api_key=296',
    dataType: 'json',
    success: function (response, textStatus) {
        $('.list').empty();
        $('.bonus').empty();
      response.tasks.forEach(function (task){
            $('.bonus').append('<div class="row"><div class="col-9">'+
                '<input type="checkbox"class="mark-complete"data-id="' +
                task.id+'"'+(task.completed ? 'checked' : '')+'>'
                + task.content +
                '</div><div class="col-3"><button class="delete" data-id="' +
                task.id + '">Delete</button></div></div>');
      })
    },
    error: function (request, textStatus, errorMessage) {
      console.log(errorMessage);
    }
  });
}

$(document).on('click', '.show-all', function () {
  checkAll($(this).data('id'));
});

function markTaskCompleted(id){
$.ajax({
 type: 'PUT',
    url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks/' + id + '/mark_complete?api_key=296',
    dataType: 'json',
    success: function (response, textStatus) {
      displayTasks();
    },
    error: function (request, textStatus, errorMessage) {
      console.log(errorMessage);
    }
  });
}

function markTaskActive(id) {
$.ajax({
    type: 'PUT',
    url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks/' + id + '/mark_active?api_key=296',
    dataType: 'json',
    success: function (response, textStatus) {
      displayTasks();
    },
    error: function (request, textStatus, errorMessage) {
      console.log(errorMessage);
    }
  });
}

$(document).on('change', '.mark-complete', function(task) {
    if(this.checked){
       markTaskCompleted($(this).data('id'));
    } else{
       markTaskActive($(this).data('id'));
  }
});

function createTask() {
    $.ajax({
    type: 'POST',
    url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks?api_key=296',
    contentType: 'application/json',
    dataType: 'json',
    data: JSON.stringify({
        task: {
        content: $('.input-question').val()
        }
    }),
    success: function (response, textStatus) {
        $('.input-question').val('');
        displayTasks();
    },
    error: function (request, textStatus, errorMessage) {
        console.log(errorMessage);
    }
    });
}

$('#new-task').on('submit', function (e) {
  e.preventDefault();
  createTask();
});

displayTasks();

function deleteTask(id){
$.ajax({
 type: 'DELETE',
  url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks/' + id + '?api_key=296',
  success: function (response, textStatus) {
    displayTasks();
  },
  error: function (request, textStatus, errorMessage) {
    console.log(errorMessage);
  }
});
}

$(document).on('click', '.delete', function () {
  deleteTask($(this).data('id'))
});
});