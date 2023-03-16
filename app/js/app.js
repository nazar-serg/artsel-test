//Slider
var swiper = new Swiper(".slider-hero", {
    slidesPerView: 4,
    spaceBetween: 40,
});

//Contact Form
const form = document.getElementById('form');
const email = document.getElementById('email');
const submitButton = document.getElementById('submit');

email.addEventListener('keyup', (e) => {
    const value = e.currentTarget.value;
    submitButton.disabled = false;
    submitButton.classList.add('active');
    
    if (value === "") {
        submitButton.disabled = true;
        submitButton.classList.remove('active');
    } 
})

form.addEventListener('submit', e => {
    e.preventDefault();

    validateInputs();
});

const setError = (element, message) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = message;
    inputControl.classList.add('error');
    inputControl.classList.remove('success');
}

const setSuccess = element => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = '';
    inputControl.classList.add('success');
    inputControl.classList.remove('error');
};

const isValidEmail = email => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

const validateInputs = () => {
    const emailValue = email.value.trim();

    if (emailValue === '') {
        setError(email, 'Please complete this email field.');
    } else if (!isValidEmail(emailValue)) {
        setError(email, 'This email does not seem to look right.');
    } else {
        setSuccess(email);
    }
};

