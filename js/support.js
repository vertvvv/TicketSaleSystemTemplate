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

function sendMessage() {
    let lastMessage = $('.modal-message:last');
    let dialogMessage = $('#dialogMessage');
    lastMessage.after('<div class="modal-message modal-question">' +
        dialogMessage.val() + '</div>');
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