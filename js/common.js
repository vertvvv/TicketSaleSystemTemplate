$(window).load(() => {
    $('#page-preloader').delay(1000).fadeOut('slow');
});

$(() => {
    $('[data-toggle="popover"]').popover();
});

$(function () {
    document.title += ' - Ticket Sale System';
});

function formattedMessage(mes) {
    let splitted = mes.split("\n");
    return splitted.join('<br>');
}

function sendOnCtrl(e) {
    const textarea = $(e.target);
    if (e.keyCode == 13 && e.ctrlKey) {
        checkIfEmpty(textarea);
    } else {
        textarea.parent().parent().removeClass('has-error');
        textarea.attr('placeholder', 'Your message...');
    }
}

function checkIfEmpty(textarea) {
    const message = textarea.val();
    if (message.isEmptyString() || !message) {
        textarea.val('');
        textarea.attr('placeholder', 'Write something!');
        textarea.parent().parent().addClass('has-error');
    } else {
        textarea.attr("id") == "dialogMessage" ? sendMessage() : messageSent();
    }
}

String.prototype.isTrueEmail = function () {
    const emailRegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegExp.test(this);
};

String.prototype.isEmptyString = function () {
    const regexp = /^\s*$/;
    return regexp.test(this);
};

Date.prototype.getFormattedTime = function () {
    return ("0" + this.getDate()).slice(-2)
        + "."
        + ("0" + (this.getMonth() + 1)).slice(-2)
        + "."
        + this.getFullYear()
        + ", "
        + (this.getHours() + 4)
        + ":"
        + ("0" + this.getMinutes()).slice(-2);
};

Date.prototype.getFormattedDate = function () {
    return this.getFullYear()
        + "-"
        + ("0" + (this.getMonth() + 1)).slice(-2)
        + "-"
        + ("0" + this.getDate()).slice(-2);
};