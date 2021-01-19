$( document ).ready(function() {
    setTimeout(function(){ eventWidth() },500)
});

$('.monthly-event-list').click(function (e) {
    $('.selected-td').remove();
    if (!$(e.target).hasClass("event-item")) {
        $(this).append('<div class="selected-td"></div>');
        $('#add').modal('show');
    }
});

function eventWidth() {

    var col = $('.monthly-schedule-table tbody tr td').outerWidth();

    console.log(col);

    if ($('.event-item').hasClass('w-200')) {
        $('.w-200').width((col * 2) - 10);
    }
    if ($('.event-item').hasClass('w-300')) {
        $('.w-300').width((col * 3) - 10);
    }
    if ($('.event-item').hasClass('w-400')) {
        $('.w-400').width((col * 4) - 10);
    }
    if ($('.event-item').hasClass('w-500')) {
        $('.w-500').width((col * 5) - 10);
    }
    if ($('.event-item').hasClass('w-600')) {
        $('.w-600').width((col * 6) - 10);
    }
    if ($('.event-item').hasClass('w-700')) {
        $('.w-700').width((col * 7) - 10);
    }

    $('.event-item').removeClass('event-transition');

    $(function() {
        var col = $('.monthly-schedule-table tbody tr td').outerWidth();

        $('.monthly-event-list').addClass('droppable');

        $(".droppable").sortable({
            connectWith: ".droppable",
            cancel: ".holiday-list",
            placeholder: "ui-state-highlight",
            start: function(event, ui) {
                var eventItem = ui.item;
                eventItem.css('width', col);
            }
        }).disableSelection();
    });
}