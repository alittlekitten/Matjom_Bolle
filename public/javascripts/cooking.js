window.addEventListener('DOMContentLoaded', ()=>{
    const checks = document.querySelectorAll('.input-form__check');
    checks.forEach(elem=>elem.querySelector('input').addEventListener('click', (event)=>selectType(event)))

    const submit = document.querySelector('.input-form__submit');
    submit.addEventListener('click', createCookie);
});

const createCookie = ()=>{
    const contents = document.querySelector('.input-form__text').value;
    if (contents=='') return;

    document.querySelector('.input-form__result__modal').classList.remove('hidden');
    document.querySelector('.input-form__result__cookie').classList.add('animation');
    document.querySelector('.input-form').classList.add('hidden');

    let type;
    document.querySelectorAll('.input-form__check').forEach(elem=>{
        if(elem.querySelector('input').checked) 
            type=elem.querySelector('input').value;
    });
    type = +type;

    sendCookie(type, contents);
}

const sendCookie = async(type, contents)=>{
    let response = await fetch('./ovenapi/add', {
        method: 'post', 
        headers: {'Content-Type': 'application/json'}, 
        body: JSON.stringify({"type":type, "contents":contents})
    });
    
    let result;
    if (response.ok)
        result = await response.json();
}

const selectType = (event)=>{
    document.querySelectorAll('.input-form__check').forEach(elem=>elem.querySelector('input').checked = false);
    event.target.checked = true;
}