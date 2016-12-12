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
        let ticket = $('#ticket-sum-price' + i);
        let parentdiv = ticket.parent().parent();
        let ticketprice = ticket.text();
        if (!(parentdiv.hasClass('hidden-ticket'))) {
            totalcost += parseFloat(ticketprice);
        }
    }
    if (totalcost == 0) {
        cartEmpty(true);
    } else {
        $("#totalAmount").text(totalcost);
    }
}

function ticketHide(item) {
    let ticket = $('#ticket' + item);
    ticket.addClass('nonvisible-ticket');
    ticket.delay(1000).queue(function() {
        $(this).removeClass('nonvisible-ticket').addClass('hidden-ticket');
        totalAmount();
    });
}

function cartEmpty(flag) {
    let main = $('#display');
    let link = $('#testEmpty');
    if (flag) {
        main.load('assets/cart_empty.html');
        link.text('with tickets').attr('onclick', 'cartEmpty(false); return false;');
    } else {
        main.load('assets/cart_full.html');
        link.text('when empty').attr('onclick', 'cartEmpty(true); return false;');
        setTimeout(function() {loadInfo()},50);
    }
}

function checkDate() {
    let thisdate = new Date($("#visitDate").val());
    $("#completeDate").text(thisdate.toLocaleDateString());
    $("#completeCost").text($("#totalAmount").text());
}

$(loadInfo());

function loadInfo() {
    for (let i = 1; i < 4; i++) {
        let ticketID = '#ticket' + i;
        let name = 'attr' + i;
        $(ticketID + ' > .cart-item-img > .attr-img').attr('src', 'img/' + name + '.png');
    }
    totalAmount();
}