$(function () {
    for (let i = 1; i < 5; i++) {
        let ticketID = '#ticket' + i;
        let name = 'attr' + i;
        $(ticketID).css('background-image', 'url(img/' + name + '.png)');
    }
});

function printOrder(num) {
    $('#order' + num).printElement(
        {
            overrideElementCSS:[
                'main.css',
                { href:'css/main.css',media:'print'}]
        });
}