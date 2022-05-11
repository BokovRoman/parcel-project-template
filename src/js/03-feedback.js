import throttle from "lodash.throttle";
const STORAGE_KEY = 'feedback-form-state';
const formRef = document.querySelector('.feedback-form');
const inputFormRef = document.querySelector('.feedback-form input');
const textAreaFormRef = document.querySelector('.feedback-form textarea');

formRef.addEventListener('submit', onFormSubmit);
formRef.addEventListener('input', throttle(onInputForm,1000));

populateInputValueForm();

const formData = {};

function onFormSubmit(e) {
    e.preventDefault();
    // console.log(e.target);
    if (inputFormRef.value !== '' || textAreaFormRef.value !== '') {
        console.log(`Ведений емейл:${inputFormRef.value}`, `Введене повідомлення:${textAreaFormRef.value}`)
        console.log('відправили форму')
        e.target.reset();
        localStorage.removeItem(STORAGE_KEY);
    }
    
}

// Длинный способ
// function onInputForm(e) {
//     console.log(e.target.name);
//     if (e.target.name === 'email') {
//         formData.email = e.target.value;
//     }
//     else(formData.message = e.target.value);
    
//     console.log(formData);
//     localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
// }

function onInputForm(e) {
    // console.log(e.target.name);
    formData[e.target.name] = e.target.value;
   
    console.log(formData);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function populateInputValueForm() {
    const savedValuesInInput = localStorage.getItem(STORAGE_KEY);
    const formValuesParse = JSON.parse(savedValuesInInput);
    console.log(formValuesParse);
    if (formValuesParse) {
        if (formValuesParse.email && formValuesParse.message) {
            inputFormRef.value = formValuesParse.email;
            textAreaFormRef.value = formValuesParse.message;
        }
        else if (formValuesParse.email) {
            inputFormRef.value = formValuesParse.email;
        }
        else if (formValuesParse.message) {
            textAreaFormRef.value = formValuesParse.message;
        }
    }
}