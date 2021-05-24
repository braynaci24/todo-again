$(document).ready(function () {

    let todoData = JSON.parse(localStorage.getItem('todo')) || []
    let favorites = JSON.parse(localStorage.getItem('favorites')) || []

    for(let i = 0; i < favorites.length; i++ ){

        $('.favorites-container').append(` <div class="favorites-box">${favorites[i]}<i class="fas fa-trash-alt trash-2"></i></div>`)
    }
    for(let i = 0; i < todoData.length; i++ ){

        $('.todo-list').append(` <div class="todo"><span class="todo-name">${todoData[i]}</span><i class="fas fa-star star"></i><i class="fas fa-trash-alt trash"></i></div>`)
    }

    $('.send-button').click(function () {
        let inputVal = $('.todo-info').val();
       

        if(inputVal.length >= 4){
            todoData.push(inputVal);
            localStorage.setItem('todo', JSON.stringify(todoData));
            $('.todo-list').append(`<div class="todo"><span class="todo-name">${inputVal}</span><i class="fas fa-star star"></i><i class="fas fa-trash-alt trash"></i></div>`)
            $('.todo-info').val("");

        }else {
            Swal.fire({
                icon: 'error',
                text: 'Lütfen yapılacak bir şey girin',
              })
        }
    })

    $('body').on('click', '.trash', function(){
        Swal.fire({
            title: 'Silmek İstediğinden emin misin ?',
            showDenyButton: true,
            confirmButtonText: `Delete`,
          }).then((result) => {
            if (result.isConfirmed) {
                let text = $(this).parent().text();
                let ind = todoData.indexOf(text);
                todoData.splice(ind, 1)
                localStorage.setItem('todo', JSON.stringify(todoData))
                $(this).parent().remove();
            } 
          })
        
    })

    $('body').on('click', '.star', function(){
        $(this).css('color','yellow')
        let starText = $(this).parent().text();
        $(this).remove();
        $('.favorites-container').append(` <div class="favorites-box">${starText}<i class="fas fa-trash-alt trash-2"></i></div>`)
        favorites.push(starText);
        localStorage.setItem('favorites', JSON.stringify(favorites));
    })
    $('body').on('click', '.trash-2', function(){
        Swal.fire({
            title: 'Favorilerden silmek istediğinden emin misin ?',
            showDenyButton: true,
            confirmButtonText: `Delete`,
          }).then((result) => {
            if (result.isConfirmed) {
                let favText = $(this).parent().text();
                let favInd = favorites.indexOf(favText);
                favorites.splice(favInd, 1)
                localStorage.setItem('favorites', JSON.stringify(favorites))
                $(this).parent().remove();
            } 
          })
    })
    $('.favorites-open-button').click(function(){
        $('.favorites-container').show();
    })
    $('.cross').click(function(){
        $('.favorites-container').hide();
    })
})