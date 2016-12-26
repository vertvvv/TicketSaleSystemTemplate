$('#dialogModal').on('show.bs.modal', function (event) {
    let item = $(event.relatedTarget);
    let name = item.text();
    let modal = $(this);
    modal.find('.modal-title').text(name);
});

function messageSent() {
    let modalBody = $('#modalBody');
    modalBody.load("assets/support_success_message.html");
    setTimeout(function() {window.location = 'support.html'},3000)
}

function getFormattedTime (date) {
    return ("0" + date.getDate()).slice(-2)
        + "."
        + ("0" + (date.getMonth() + 1)).slice(-2)
        + "."
        + date.getFullYear()
        + ", "
        + (date.getHours() + 4)
        + ":"
        + ("0" + date.getMinutes()).slice(-2);
}

function sendMessage() {
    let lastMessage = $('.modal-message:last');
    let dialogMessage = $('#dialogMessage');
    let tomorrow = new Date(new Date().getTime() + 20 * 60 * 60 * 1000);
    lastMessage.after('<div class="modal-message modal-question">' +
        '<img class="img-circle message-img" src="img/identicon8.png" alt=""><p>'
        + dialogMessage.val() + '</p><span class="message-date">'+ getFormattedTime(tomorrow) + '</span></div>');
    dialogMessage.val('');
}

function questionsAdd(flag) {
    let questions = $('#questions');
    if (flag) {
        questions.load('assets/questions_true.html');
    } else {
        questions.load('assets/questions_false.html');
    }
}