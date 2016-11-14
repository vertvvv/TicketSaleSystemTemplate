var flag;
flag = true; //flag for correct closing attraction boxes

function box(element, flag) {
    if(element && flag) {
        if(element.className=='box') {
            while(document.getElementById('main').getElementsByClassName('box target')[0]) {
                document.getElementById('main').getElementsByClassName('box target')[0].className='box';
            }
            element.className='box target';
        }
        else
            element.className='box';
    }
    //console.log(flag);
    window.flag=true;
}

function openModal(flag) {
    if (flag) {
        $("#tab-1").prop('checked', true);
    } else {
        $("#tab-2").prop('checked', true);
    }
}

function buyTicket(flag) {
    //console.log(flag);
    window.flag=false;
}