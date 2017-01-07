const directory = "assets/index/";

$('span.change-quant').on('click', changeQuantity);
$('div.box').on('click', function () {
    changeQuantity();
    checkMaintenance($(this));
});

$('#attractionModal').on('show.bs.modal', function (event) {
    const box = $(event.relatedTarget);
    const name = box.data('name');
    const quantity = box.data('quantity');
    const id = box.attr('id');
    const modal = $(this);
    modal.find('.modal-title').text(name);
    $('#ticket-counter').text(quantity);
    $('#attrid').attr('src', 'img/' + id + '.png');
});

$('body')
    .on('click', 'a.login-link', function (e) {
    const modalBody = $('#loginBody');
    const loginText = "Log in";
    this.text == loginText ? modalBody.load(directory + "login.html") : modalBody.load(directory + "signup.html");
    })

    .on('click', 'a.forgot-link', function(e) {
        const modalBody = $('#loginBody');
        const forgotText = "Forgot Password?";
        this.text == forgotText ? modalBody.load(directory + "login_forgot_password.html") : modalBody.load(directory + "login.html");
    })

    .on('click', '#testEmpty', function (e) {
    const menu = $('#menutest');
    const testText = "test (profile)";
    if (this.text == testText) {
        menu.load(directory + "test_profile.html");
        this.text = "test (login)";
    } else {
        menu.load(directory + "test_login.html");
        this.text = testText;
    }
    });

$(function () {
    $('.box').each(function() {
        $(this).find('.box-icon').css('background-image', 'url(img/attr' + this.id.substr(4) + '.png)');
    });
});

function checkMaintenance(box) {
    const flag = !!(box.data('maintenance'));
    const buyButton = $('.btn-footer-buy');
    $('.maintenance-text').toggleClass('no-display', !flag);
    buyButton.prop('disabled', flag);
}

function changeQuantity() {
    const quantity = $('#ticket-counter');
    const sumPrice = $('#price');
    let ticketCounter = parseInt(quantity.text(), 10);
    const how = ($(this).data('how')) ? $(this).data('how') : '';

    if (how === 'down') {
        (ticketCounter > 1) ? ticketCounter -= 1 : ticketCounter = 1;
    } else if (how === 'up') {
        ticketCounter += 1;
    } else ticketCounter = 1;
    quantity.text(ticketCounter);
    sumPrice.text((ticketCounter * parseFloat(sumPrice.data('price'))).toFixed(2));
}