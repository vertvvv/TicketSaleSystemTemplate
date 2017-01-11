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

$('.admin-close-question').on('click', function () {
    let btn = $(this);
    btn.parent().parent().remove();
});

$('#maintenanceModal').on('show.bs.modal', function (event) {
    const item = $(event.relatedTarget).parent().parent().parent().parent().find('div:first-of-type').find('.attr-id');
    const name = (item.length) ? item.attr('placeholder') : 'New attraction';
    const modal = $(this);
    modal.find('.attr-id-rdy').attr('placeholder', name);
});

$('#addCategory').on('click', () => {
    const selects = $('select');
    const category = $('#newCategoryName').val();
    console.log(category);
    selects.each(function (item) {
        $(this).find('option:last-of-type').after('<option>'+category+'</option>');
    });
});

$('#removeCategory').on('click', function() {
    const currentOption = $(this).parent().parent().find('select').find('option:checked');
    const optionText = currentOption.text();
    const selects = $('select');
    selects.each(function (item) {
        const options = $(this).find('option');
        options.each(function (option) {
            if ($(this).text() == optionText) {
                $(this).remove();
            }
        });
    });
});

$('#dialogModal')
    .on('show.bs.modal', function (event) {
    const item = $(event.relatedTarget);
    const name = item.text();
    const modal = $(this);
    modal.find('.modal-title').text(name);
})
    .on('keydown', sendOnCtrl);

$('#srch-term')
    .on('change', filterUsers)
    .on('keyup', filterUsers);

$('.btn-ft-modal').on('click', () => checkIfEmpty($('#dialogMessage')));
$('#inlineRadio1').on('change', filterUsers);
$('#inlineRadio2').on('change', filterUsers);
$('#inlineRadio3').on('change', filterUsers);
$('#inlineCheckbox4').on('change', filterUsers);

function filterUsers() {
    const idSearch = $('#inlineRadio1').is(':checked');
    const loginSearch = $('#inlineRadio2').is(':checked');
    const isBanned = $('#inlineCheckbox4').is(':checked');
    const filter = $('#srch-term').val().toLowerCase();

    function filterString(user, str) {
        if (!(str.includes(filter))) {
            user.addClass('no-display');
        }
    }

    $('.user-container').each(function () {
        if (isBanned) {
            let str = $(this).find('.user-status').text();
            $(this).toggleClass('no-display', !(str.includes('Banned')));
        } else {
            $(this).removeClass('no-display');
        }
        let str = (idSearch) ? $(this).find('.user-id').text() :
            (loginSearch) ? $(this).find('.user-login').text().toLowerCase() :
                $(this).find('.user-name').text().toLowerCase();
        filterString($(this), str);
    })
}

function randomID () {
    return randomPartID(4)+'-'+randomPartID(5)+'-'+randomPartID(6)+'-'+randomPartID(4);
}

function randomPartID(multiply) {
    return Math.floor(Math.random() * (Math.pow(10, multiply) - 9*multiply + 1) + 9*multiply);
}

function sendMessage() {
    const lastMessage = $('.modal-message:last');
    const dialogMessage = $('#dialogMessage');
    const tomorrow = new Date(new Date().getTime() + 20 * 60 * 60 * 1000);
    lastMessage.after('<div class="modal-message modal-question">' +
        '<img class="img-circle message-img" src="img/identicon6.png" alt=""><p>'
        + formattedMessage(dialogMessage.val()) + '</p><span class="message-date">'+ tomorrow.getFormattedTime() + '</span></div>');
    dialogMessage.val('');
}

$(function () {
    $('.user-id').each(function() {
        $(this).text('ID: ' + randomID());
    });
    $('.attr-id').each(function() {
        $(this).attr('placeholder', randomID());
    });
});