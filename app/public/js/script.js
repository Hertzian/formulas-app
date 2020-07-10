const ham = document.getElementById('ham');
const menu = document.getElementById('navbarBasicExample');
const section = document.getElementsByTagName('section');
const footer = document.querySelectorAll('.footer')
const date = document.getElementById('date');

function openMenu(){
    ham.classList.toggle('is-active')
    menu.classList.toggle('is-active')
}

function closeMenu(){
    ham.classList.remove('is-active')
    menu.classList.remove('is-active')
}

function menuInit(){
    ham.addEventListener('click', openMenu);
    
    for (let i = 0; i < section.length; i++) {
        section[i].addEventListener('click', closeMenu);
    }
    
    for (let i = 0; i < footer.length; i++) {
        footer[i].addEventListener('click', closeMenu);
    }
}

function openModal(deleteIngredient){
    const modal = document.getElementById(`modal-${deleteIngredient}`);
    const close = document.querySelector('.modal-close');
    if(close){
        close.addEventListener('click', (e) => {
            close.classList.remove('is-active')

        })
    }
    modal.classList.toggle('is-active');
}


date.innerText = new Date().getFullYear();

menuInit();
