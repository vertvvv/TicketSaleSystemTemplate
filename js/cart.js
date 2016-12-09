let tomorrow = new Date(new Date().getTime() + 20 * 60 * 60 * 1000);
let nextyeartomorrow = new Date(new Date().getTime() + 365 * 24 * 60 * 60 * 1000);

function getFormattedDate (date) {
    return date.getFullYear()
        + "-"
        + ("0" + (date.getMonth() + 1)).slice(-2)
        + "-"
        + ("0" + date.getDate()).slice(-2);
}

$("#visitDate").val(getFormattedDate(tomorrow)).attr('min', getFormattedDate(tomorrow)).attr('max', getFormattedDate(nextyeartomorrow));

function changeQuantity(how, item) {
    let quantity = $('#ticket-counter' + item);
    let sumprice = $('#ticket-sum-price' + item);
    let ticketCounter = parseInt(quantity.text(), 10);
    let ticketSumPrice = parseFloat(sumprice.attr('price'));
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
    sumprice.text(sum.toFixed(2));
    totalAmount();
}

function totalAmount() {
    let totalcost = 0;
    for (let i = 1; i < 4; i++) {
        let ticketprice = $('#ticket-sum-price' + i).text();
        totalcost += parseFloat(ticketprice);
    }
    $("#totalAmount").text(totalcost);
}

function ticketHide(item) {
    let ticket = $('#ticket' + item);
    ticket.addClass('nonvisible-ticket');
    ticket.delay(1000).queue(function() {
        $(this).removeClass('nonvisible-ticket').addClass('hidden-ticket');
    });
}

function checkDate() {
    let thisdate = new Date($("#visitDate").val());
    $("#completeDate").text(thisdate.toLocaleDateString());
    $("#completeCost").text($("#totalAmount").text());
}

$(function () {
    for (let i = 1; i < 4; i++) {
        let ticketID = '#ticket' + i;
        let name = 'attr' + i;
        $(ticketID + ' > .cart-item-img > .attr-img').attr('src', 'img/' + name + '.png');
    }
    totalAmount();
});
