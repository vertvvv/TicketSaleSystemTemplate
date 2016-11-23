$('#attractionModal').on('show.bs.modal', function (event) {
    let button = $(event.relatedTarget);// Button that triggered the modal
    let attractionName = button.data('name'); // Extract info from data-* attributes
    // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
    // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
    let modal = $(this)
    modal.find('.modal-title').text(attractionName);
});

function openModal(flag) {
    if (flag) {
        $("#tab-1").prop('checked', true);
    } else {
        $("#tab-2").prop('checked', true);
    }
}

