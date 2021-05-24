$(document).ready(function () {

    let todoData = JSON.parse(localStorage.getItem('todo')) || []

    for(let i = 0; i < todoData.length; i++ ){

        $('.todo-list').append(` <div class="todo"><span class="todo-name">${todoData[i]}</span><i class="fas fa-trash-alt trash"></i></div>`)
    }
    $('.send-button').click(function () {
        let inputVal = $('.todo-info').val();
        todoData.push(inputVal);
        localStorage.setItem('todo', JSON.stringify(todoData));

        if(inputVal.length >= 4){
            $('.todo-list').append(` <div class="todo"><span class="todo-name">${inputVal}</span><i class="fas fa-trash-alt trash"></i></div>`)
            $('.todo-info').val("");

        }else {
            Swal.fire({
                icon: 'error',
                text: 'Lütfen yapılacak bir şey girin',
              })
        }

       
    })

    $('body').on('click', '.trash', function(){
        let text = $(this).parent().text();
        let ind = todoData.indexOf(text);
        todoData.splice(ind, 1)
        localStorage.setItem('todo', JSON.stringify(todoData))
        $(this).parent().remove();

    })



})