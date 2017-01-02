const tomorrow = new Date(new Date().getTime() + 20 * 60 * 60 * 1000);
const nextyeartomorrow = new Date(new Date().getTime() + 365 * 24 * 60 * 60 * 1000);
const directory = "assets/cart/";

function getFormattedDate (date) {
    return date.getFullYear()
        + "-"
        + ("0" + (date.getMonth() + 1)).slice(-2)
        + "-"
        + ("0" + date.getDate()).slice(-2);
}

$("#visitDate").val(getFormattedDate(tomorrow)).attr('min', getFormattedDate(tomorrow)).attr('max', getFormattedDate(nextyeartomorrow));

function totalAmount() {
    let totalCost = 0;
    for (let i = 1; i < 4; i++) {
        const ticket = $('#ticket-sum-price' + i);
        const parentDiv = ticket.parent().parent();
        const ticketPrice = ticket.text();
        if (!(parentDiv.hasClass('hidden-ticket'))) {
            totalCost += parseFloat(ticketPrice);
        }
    }
    if (totalCost == 0) {
        cartEmpty(true);
    } else {
        $("#totalAmount").text(totalCost);
    }
}

$('body')
    .on('click', '#testEmpty', function (e) {
        const main = $('#display');
        const testText = "when empty";
        if (this.text == testText) {
            main.load(directory + "cart_empty.html");
            this.text = "with tickets";
        } else {
            main.load(directory + "cart_full.html");
            this.text = testText;
            setTimeout(function() {loadInfo()},50);
        }
    })

    .on('click', '.close-ticket', function (e) {
        const item = $(this).parent().parent().attr('id').substr(6);
        const ticket = $('#ticket' + item);
        ticket.addClass('nonvisible-ticket');
        ticket.delay(1000).queue(function() {
            $(this).removeClass('nonvisible-ticket').addClass('hidden-ticket');
            totalAmount();
        });
    })

    .on('click', '.btn-pay-now', function (e) {
        let thisdate = new Date($("#visitDate").val());
        $("#completeDate").text(thisdate.toLocaleDateString());
        $("#completeCost").text($("#totalAmount").text());
    })

    .on('click', '.change-quant', function (e) {
        const item = $(this).parent().parent().parent().attr('id').substr(6);
        const quantity = $('#ticket-counter' + item);
        const sumPrice = $('#ticket-sum-price' + item);
        let ticketCounter = parseInt(quantity.text(), 10);
        const how = $(this).data('how');

        if (how === 'down') {
            (ticketCounter > 1) ? ticketCounter -= 1 : ticketCounter = 1;
        } else if (how === 'up') {
            ticketCounter += 1;
        } else ticketCounter = 1;

        quantity.text(ticketCounter);
        sumPrice.text((ticketCounter*parseFloat(sumPrice.data('price'))).toFixed(2));
        totalAmount();
    });

$(loadInfo());

function loadInfo() {
    $('.cart-item').each(function() {
        $(this).find('.attr-img').attr('src', 'img/attr' + this.id.substr(6) + '.png');
    });
    totalAmount();
}