const username = document.querySelector('#username')
const pass = document.querySelector('#password')
const pass2 = document.querySelector('#password2')
const email = document.querySelector('#email')
const clearBtn = document.querySelector('.clear')
const sendBtn = document.querySelector('.send')
const popup = document.querySelector('.popup')
const allInputs = [username,pass,pass2,email]

const clearError = input => {
    const formBox = input.parentElement
    formBox.classList.remove('error')
}

const showError =(input,msg)=>{
    const formBox = input.parentElement;
    const errMsg = formBox.querySelector('.error-text')
    formBox.classList.add('error');
    errMsg.textContent = msg
}
const checkForm = (input) => {
    input.forEach(el=>{
        if (el.value===''){
            showError(el,el.placeholder)
        }
        else {
            clearError(el)
        }
    })
}
const checkLength = (input,min)=> {
    if (input.value.length < min) {
        const elSibling = input.previousElementSibling;
        const textElSibling = elSibling.innerText.replace(':','')
        showError(input,`${textElSibling} sklada się z minimum ${min} znaków`)
    }
}

const checkPass = (pass1,pass2) => {
    if (pass1.value !== pass2.value) {
        showError(pass2, 'hasła nie sa jednakowe') 
    }
}

const checkMail =(mail)=> {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(email.value)){
        clearError(email)
    }
    else {
        showError(email,'email jest niepoprawny')
    }
}

const checkErrors =()=>{
    const allInput = document.querySelectorAll('.form-box');
    let errorCount = 0;
    allInput.forEach(el=>{
        if (el.classList.contains('error')) {
            errorCount++;
        }
    })
    if (errorCount===0){
        popup.classList.add('show-popup')
    }
    
}

sendBtn.addEventListener('click',e=>{
    e.preventDefault();
    checkForm(allInputs)
    checkLength(username,3)
    checkLength(pass, 8)
    checkPass(pass,pass2)
    checkMail(email)
    checkErrors()
})

clearBtn.addEventListener('click',(e)=>{
    e.preventDefault();
    allInputs.forEach(e=>{
        e.value='';
        clearError(e)
    })
})