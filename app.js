// $(document).ready(function(){
//   $.ajax({
//     type: 'GET',
//     url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks?api_key=1',
//     dataType: 'json',
//     success: function (response, textStatus) {
//       response.tasks.forEach(function (task) {
//         $('.list').append('<p>' + task.content + '</p>');
//       })
//     },
//     error: function (request, textStatus, errorMessage) {
//       console.log(errorMessage);
//     }
//   });
// });
$(document).ready(function(){
function displayTasks() {
    $.ajax({
      type: 'GET',
      url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks?api_key=296',
      dataType: 'json',
      success: function (response, textStatus) {
        $('.list').empty();
        response.tasks.forEach(function (task) {
          $('.list').append('<div class="row"><p class="col-xs-8">' + task.content + '</p><button class="delete" data-id="' + task.id + '">Delete</button><input type="checkbox" class="mark-complete" data-id="' + task.id + '"' + (task.completed ? 'checked' : '') + '>');
        })
      },
      error: function (request, textStatus, errorMessage) {
        console.log(errorMessage);
      }
    });
}

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

$(document).on('change', '.mark-complete', function() {
  if(this.checked){
       markTaskCompleted($(this).data('id'));
  }else{
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
        console.log(response);
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