const tomorrow = new Date(new Date().getTime() + 20 * 60 * 60 * 1000);
const nextYearTomorrow = new Date(new Date().getTime() + 365 * 24 * 60 * 60 * 1000);
const directory = "assets/cart/";

$("#visitDate").val(tomorrow.getFormattedDate()).attr('min', tomorrow.getFormattedDate()).attr('max', nextYearTomorrow.getFormattedDate());

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
        cartEmpty(false);
    } else {
        $("#totalAmount").text(totalCost);
    }
}

function cartEmpty() {
    const main = $('#display');
    const testText = "with tickets";
    if (this.text == testText) {
        main.load(directory + "cart_full.html");
        setTimeout(() => loadInfo(),50);
        this.text = "when empty";
    } else {
        main.load(directory + "cart_empty.html");
        this.text = testText;
    }
}

$('body')
    .on('click', '#testEmpty', cartEmpty)

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