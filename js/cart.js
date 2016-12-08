function changeQuantity(how, item) {
    let quantity = $('#ticket-counter' + item);
    let sumprice = $('#ticket-sum-price' + item);
    let ticketCounter = parseInt(quantity.text(), 10);
    let ticketSumPrice = parseFloat(sumprice.attr('price'), 10);
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
    let sum = ticketCounter*ticketSumPrice;
    sumprice.text(sum.toFixed(2))
}

function ticketHide(item) {
    let ticket = $('#ticket' + item);
    ticket.addClass('nonvisible-ticket');
    ticket.delay(1000).queue(function()
    {$(this).removeClass('nonvisible-ticket').addClass('hidden-ticket')}
    );
}

$(function () {
    for (let i = 1; i < 4; i++) {
        let ticketID = '#ticket' + i;
        let name = 'attr' + i;
        $(ticketID + ' > .cart-item-img > .attr-img').attr('src', 'img/' + name + '.png');
    }
});