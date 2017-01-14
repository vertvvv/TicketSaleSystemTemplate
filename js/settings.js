$('#inputPasswordConfirm').on('keyup', function () {
    const firstField = $('#inputPassword');
    if (!(firstField.val().isEmptyString())) {
        const inspect = ($(this).val() == firstField.val());
        $(this).parent().parent()
            .toggleClass('has-success', inspect)
            .toggleClass('has-error', !inspect);
        firstField.parent().parent()
            .toggleClass('has-success', inspect);
    } else {
        $(this).parent().parent()
            .removeClass('has-success has-error');
        firstField.parent().parent()
            .removeClass('has-success');
    }
});

$('#inputPassword').on('keyup', function () {
    if ($(this).val().isEmptyString()) {
        $('#inputPasswordConfirm').parent().parent().removeClass('has-error');
    }
});