const directory = "assets/support/";

$('#dialogModal').on('show.bs.modal', function (event) {
    const item = $(event.relatedTarget);
    const name = item.text();
    const modal = $(this);
    modal.find('.modal-title').text(name);
});

$('.btn-footer-buy').on('click', function (e) {
    $(this).parent().parent().parent().parent().attr("id") == "dialogModal" ? sendMessage() : messageSent();
});

$('body')
    .on('click', '.test-link', function (e) {
        const questions = $('#questions');
        const linkText = "with questions";
        this.text == linkText ? questions.load(directory + "questions_true.html") : questions.load(directory + "questions_false.html");
    });

function messageSent() {
    const modalBody = $('#modalBody');
    modalBody.load(directory + "support_success_message.html");
    modalBody.siblings('.modal-footer').remove();
    setTimeout(function() {window.location = 'support.html'}, 1500);
}

function sendMessage() {
    const lastMessage = $('.modal-message:last');
    const dialogMessage = $('#dialogMessage');
    const tomorrow = new Date(new Date().getTime() + 20 * 60 * 60 * 1000);
    lastMessage.after('<div class="modal-message modal-question">' +
        '<img class="img-circle message-img" src="img/identicon8.png" alt=""><p>'
        + dialogMessage.val() + '</p><span class="message-date">'+ getFormattedTime(tomorrow) + '</span></div>');
    dialogMessage.val('');
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