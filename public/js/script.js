const ham = document.getElementById('ham');
const menu = document.getElementById('navbarBasicExample');
const btnClose = document.getElementsByClassName('closeBtn');
const deleteIngredientBtn = document.getElementsByClassName('deleteIngredientBtn');
const quantity = document.getElementsByClassName('quantity');
const ingredient = document.getElementsByClassName('ingredient');
const calculate = document.getElementById('calculate');
const wishValue = document.getElementById('wishValue');
const result = document.getElementById('result');
const again = document.getElementById('again');

// open/close menu
ham.addEventListener('click', () => {
    ham.classList.toggle('is-active');
    menu.classList.toggle('is-active');
});

// close delete ingredient modal
function closeDeleteModal(modalId){
    const pureId = modalId.split('-');
    const toClose = document.getElementById(`modal-deleteIngredient-${pureId[1]}`);
    toClose.classList.remove('is-active');
}

// open delete modal
function deleteModal(buttonId){
    const pureId = buttonId.split('-')
    let toOpen = document.getElementById(`modal-deleteIngredient-${pureId[1]}`)
    toOpen.classList.add('is-active')
}

// to edit ingredient unit
function submitEditIngredient(editIngredient){
    const pureId = editIngredient.split('-')
    const value = document.getElementById(`editValue-${pureId[1]}`)
    const input = document.getElementById(`hiddenEdit-${pureId[1]}`)
    const form = document.getElementById(`editForm-${pureId[1]}`)

    input.value = value.value;
    form.submit();
}

function eraseFunction(){
    const forms = document.getElementsByClassName('eraseFunction');
    for (const form of forms) {
        form.reset();
    }
}

// reload page
if(again){
    again.addEventListener('click', () => {
        // location.reload();
        result.innerHTML = '';
        wishValue.value = '';
    })
}

// calculate values
if(calculate){
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
}
    
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
document.getElementById('date').innerText = new Date().getFullYear();