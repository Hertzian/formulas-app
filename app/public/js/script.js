const ham = document.getElementById('ham');
const menu = document.getElementById('navbarBasicExample');
// const modalClose = document.getElementsByClassName('modal-close');
const btnClose = document.getElementsByClassName('closeBtn');
const deleteIngredientBtn = document.getElementsByClassName('deleteIngredientBtn');
const quantity = document.getElementsByClassName('quantity');
const ingredient = document.getElementsByClassName('ingredient');
const calculate = document.getElementById('calculate');
const wishValue = document.getElementById('wishValue');
const result = document.getElementById('result');
const again = document.getElementById('again');
// const modal = document.querySelector('.modal');

// open/close menu
ham.addEventListener('click', () => {
    ham.classList.toggle('is-active');
    menu.classList.toggle('is-active');
});




// open/close modal

// for (let i = 0; i < modalClose.length; i++) {
//     modalClose[i].addEventListener('click', () => {
//         modal.classList.remove('is-active');
//         console.log('cross button')
//     });
    
//     btnClose[i].addEventListener('click', () => {
//         console.log('cancel button')
//     });
// }

// function closeModal(buttonId){
    
//     modal.classList.remove('is-active');
// }







function deleteModal(buttonId){
    let toOpen = document.getElementById(`modal-${buttonId}`)
    toOpen.classList.add('is-active')
}

// to edit ingredient unit
function submitEditIngredient(editIngredient){
    const pureId = editIngredient.slice(17)
    const value = document.getElementById(`editValue-${pureId}`)
    const input = document.getElementById(`hiddenEdit-${pureId}`)
    const form = document.getElementById(`editForm-${pureId}`)

    input.value = value.value;
    form.submit();
}

// reload page
again.addEventListener('click', () => {
    location.reload();
})

// calculate values
calculate.addEventListener('click', (e) => {
    e.preventDefault();

    let rawValues = [];
    
    for (let i = 0; i < quantity.length; i++) {
        rawValues.push(quantity[i].value * wishValue.value)

        const htmlString = resultTemplate(rawValues[i], ingredient[i].innerText)
        const resultElement = createTemplate(htmlString)
        calculate.setAttribute('disabled', true)

        result.append(resultElement);
    }
});
    
// create html template
function createTemplate(HTMLString){
    const html = document.implementation.createHTMLDocument();
    html.body.innerHTML = HTMLString;
    return html.body.children[0]
}

// result template
function resultTemplate(quantity, ingredient){
    return `
    <div class="card">
        <header class="card-header">
            <p class="card-header-title is-relative" style="width: 100%;">${ingredient}</p>
    
            <div class="field is-horizontal">
                <div class="field-label is-normal"><label class="label">Unidades</label></div>
    
                <div class="field-body">
                    <div class="field">
                        <p class="control is-expanded has-icons-left">
                            <input class="input " type="text" placeholder="Name" value="${quantity}">
                        </p>
                    </div>
                </div>
    
            </div>
            <div class="card-footer-item"></div>
            <div class="card-footer-item editIngredient"><span class="icon has-text-success"><i class="fas fa-arrow-left"></i></span></div>
        </header>
    </div>
    `
}

// footer year
document.querySelectorAll('.footer').innerText = new Date().getFullYear();

