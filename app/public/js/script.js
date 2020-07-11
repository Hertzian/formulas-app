const ham = document.getElementById('ham');
const menu = document.getElementById('navbarBasicExample');
const section = document.getElementsByTagName('section');
const footer = document.querySelectorAll('.footer')
const date = document.getElementById('date');
const modalClose = document.getElementsByClassName('modal-close');
const btnClose = document.getElementsByClassName('closeBtn');
const deleteIngredientBtn = document.getElementsByClassName('deleteIngredientBtn');
const editIngredientBtn = document.getElementsByClassName('editIngredient');
const editIngredientValue = document.getElementsByClassName('editValue');

// open/close menu
ham.addEventListener('click', () => {
    ham.classList.toggle('is-active');
    menu.classList.toggle('is-active');
});

// open/close modal
for (let i = 0; i < modalClose.length; i++) {
    modalClose[i].addEventListener('click', () => {
        document.querySelector('.modal').classList.remove('is-active');
    });

    btnClose[i].addEventListener('click', () => {
        document.querySelector('.modal').classList.remove('is-active');
    });

    deleteIngredientBtn[i].addEventListener('click', () => {
        document.querySelector('.modal').classList.add('is-active');
    });
}

function submitEditIngredient(editIngredient){
    const pureId = editIngredient.slice(17)
    const value = document.getElementById(`editValue-${pureId}`)
    const input = document.getElementById(`hiddenEdit-${pureId}`)
    const form = document.getElementById(`editForm-${pureId}`)

    input.value = value.value;
    // console.log(input)
    // console.log(value)
    // console.log(form)
    form.submit();

    
}


// footer year
date.innerText = new Date().getFullYear();

