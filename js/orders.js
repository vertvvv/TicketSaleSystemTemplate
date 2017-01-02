$(function () {
    $('.orders-container').each(function() {
        $(this).css('background-image', 'url(img/attr' + this.id.substr(6) + '.png)');
    });
});

$('.print-button').on('click', function (e) {
    $(this).parent().parent().parent().parent()
        .printElement(
        {
            overrideElementCSS:[
                'main.css',
                { href:'css/main.css',media:'print'}]
        });
});