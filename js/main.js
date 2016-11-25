function changeQuantity(how) {
    let quantity = $('#ticket-counter');
    let ticketCounter = parseInt(quantity.text(), 10);
    if (how == 'down') {
        if (ticketCounter > 1) {
            ticketCounter -= 1;
        } else {
            ticketCounter = 1;
        }
    } else if (how == 'up') {
        ticketCounter += 1;
    } else {
        ticketCounter = 1;
    }
    quantity.text(ticketCounter);
}

$('#attractionModal').on('show.bs.modal', function (event) {
    let box = $(event.relatedTarget);
    let name = box.data('name');
    let quantity = box.data('quantity');
    let id = box.attr('id');
    let modal = $(this);
    modal.find('.modal-title').text(name);
    $('#ticket-counter').text(quantity);
    $('#attrid').attr('src', 'img/' + id + '.png');
});

function openModal(flag) {
    if (flag) {
        $("#tab-1").prop('checked', true);
    } else {
        $("#tab-2").prop('checked', true);
    }
}

$(function () {
    for (let i = 1; i < 10; i++) {
        let nameID = '#attr' + i;
        let name = 'attr' + i;
        $(nameID + " > .box-icon").css('background-image', 'url(img/' + name + '.png)');
    }
});

$(window).on('load', function () {
    $('#page-preloader').delay(1000).fadeOut('slow');
});
