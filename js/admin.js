$('.ban-button').on('click', function () {
    let btn = $(this);
    if (btn.text() == 'Ban') {
        btn.text('Unban');
        btn.removeClass('btn-danger');
        btn.addClass('btn-default');
        btn.parent().siblings('.user-status').text('Banned');
    } else {
        btn.text('Ban');
        btn.removeClass('btn-default');
        btn.addClass('btn-danger');
        btn.parent().siblings('.user-status').text('Active');
    }
});

$('#dialogModal').on('show.bs.modal', function (event) {
    const item = $(event.relatedTarget);
    const name = item.text();
    const modal = $(this);
    modal.find('.modal-title').text(name);
});

$('.btn-footer-buy').on('click', sendMessage);
$('textarea').on('keydown', function (e) {
    e = e || window.event;
    if (e.keyCode == 13 && e.ctrlKey) {
        sendMessage();
    }
});

$('#srch-term').on('change', filterUsers);
$('#srch-term').on('keyup', filterUsers);
$('#inlineRadio1').on('change', filterUsers);
$('#inlineRadio2').on('change', filterUsers);
$('#inlineCheckbox3').on('change', filterUsers);

function filterUsers() {
    const idSearch = $('#inlineRadio1').is(':checked');
    const isBanned = $('#inlineCheckbox3').is(':checked');
    const filter = $('#srch-term').val();

    function filterString(user, str) {
        if (!(str.includes(filter))) {
            user.addClass('no-display');
        }
    }

    $('.user-container').each(function () {
        if (isBanned) {
            let str = $(this).find('.user-status').text();
            if (!($(this).text().includes('Banned'))) {
                $(this).addClass('no-display');
            } else {
                $(this).removeClass('no-display');
            }
        } else {
            $(this).removeClass('no-display');
        }
        if (idSearch) {
            let str = $(this).find('.user-id').text();
            filterString($(this), str);
        } else {
            let str = $(this).find('.user-name').text().toLowerCase();
            filterString($(this), str);
        }
    })
}

function sendMessage() {
    const lastMessage = $('.modal-message:last');
    const dialogMessage = $('#dialogMessage');
    const tomorrow = new Date(new Date().getTime() + 20 * 60 * 60 * 1000);
    lastMessage.after('<div class="modal-message modal-question">' +
        '<img class="img-circle message-img" src="img/identicon6.png" alt=""><p>'
        + dialogMessage.val() + '</p><span class="message-date">'+ tomorrow.getFormattedTime() + '</span></div>');
    dialogMessage.val('');
}

function randomID () {
    return randomPartID(4)+'-'+randomPartID(5)+'-'+randomPartID(6)+'-'+randomPartID(4);
}

function randomPartID(multiply) {
    return Math.floor(Math.random() * (Math.pow(10, multiply) - 9*multiply + 1) + 9*multiply);
}

$(function () {
    $('.user-id').each(function() {
        $(this).text('ID: ' + randomID());
    });
});