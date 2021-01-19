/* <reference path="../jQuery_3x/jquery.js" /> */

$(document).ready(function(){

    $('[data-toggle="tooltip"]').click(function () {
        $('[data-toggle="tooltip"]').tooltip("hide");
    });

    loader();
    mockRepeat();
})

function loader() {
    setTimeout(function(){
        $('#loader').addClass('d-none');
        $('#records').removeClass('d-none');
    },2000)
}

function mockRepeat() {
    $('.mock-repeat').each(function () {
        var _rep = $(this);
        var _times = parseInt($(this).data('repeat')) || 10;

        for (i = 0; i < _times; i++) {
            _rep.parent().append(_rep.clone());
        }
    })   
}

$('#deleteToaster').click(function(e){
    e.stopPropagation();
    $('#toast').addClass('show');
    setTimeout(function(){
        $('#toast').removeClass('show');
    },3000)
});