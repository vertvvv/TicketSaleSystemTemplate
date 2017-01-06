$(window).load(function () {
    $('#page-preloader').delay(1000).fadeOut('slow');
});

$(function () {
    $('[data-toggle="popover"]').popover();
});

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