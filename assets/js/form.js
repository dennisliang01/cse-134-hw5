

let contactForm = document.getElementById("contact-me-email-form");
contactForm.noValidate = true;

contactForm.addEventListener("submit", validateForm);

async function validateForm(event) {

    event.preventDefault();

    if (!nameInput.checkValidity()) {
        nameErrorMessage.innerText = "Please provide a valid name";
        nameErrorMessage.classList.add("fade-out");
        nameInput.classList.add("error-field");
        recordError(nameInput, "Name Error");
    } else {
        nameErrorMessage.innerText = "";
        nameErrorMessage.classList.remove("fade-out");
        nameInput.classList.remove("error-field");
    }

    if (!emailInput.checkValidity()) {
        emailErrorMessage.innerText = "Please provide a valid email";
        emailErrorMessage.classList.add("fade-out");
        emailInput.classList.add("error-field");
        recordError(emailInput, "Email Error");
    } else {
        emailErrorMessage.innerText = "";
        emailErrorMessage.classList.remove("fade-out");
        emailInput.classList.remove("error-field");
    }

    if (!subjectInput.checkValidity()) {
        subjectErrorMessage.innerText = "Please provide a valid subject";
        subjectErrorMessage.classList.add("fade-out");
        subjectInput.classList.add("error-field");
        recordError(subjectInput, "Subject Error");

    } else {
        subjectErrorMessage.innerText = "";
        subjectErrorMessage.classList.remove("fade-out");
        subjectInput.classList.remove("error-field");
    }

    if (!commentsInput.checkValidity()) {
        commentsErrorMessage.innerText = "Please provide a valid comment";
        commentsErrorMessage.classList.add("fade-out");
        commentsInput.classList.add("error-field");
        recordError(commentsInput, "Comments Error");
    } else {
        commentsErrorMessage.innerText = "";
        commentsErrorMessage.classList.remove("fade-out");
        commentsInput.classList.remove("error-field");
    }

    if (!contactForm.checkValidity()) {
        console.log("Error");
    } else {
        const formData = new FormData(event.target);
        formData.append('form_errors', JSON.stringify(form_errors));

        await fetch("https://httpbin.org/post", {
            method: "post",
            body: formData,
        });
        alert("Email Form Submitted");
        contactForm.reset(); 
    }
    
}

// Error Array Recording

const form_errors = [];

function recordError(input, errorType) {
    let error = {
        errorType: errorType,
        input: input.value,
    }

    form_errors.push(error);
}

// Name Validation

let nameInput = document.getElementById("name-input");
let nameErrorMessage = document.getElementById("name-error-message");

nameInput.setCustomValidity("");
nameInput.addEventListener("input", validateName);
let lastGoodNameInput = "";

function validateName() {
    // if (!nameInput.checkValidity() || nameInput.validity.patternMismatch) {
    if (nameInput.validity.patternMismatch) {
        nameErrorMessage.innerText = "Please enter a valid character";
        nameErrorMessage.classList.add("fade-out");
        nameInput.classList.add("error-field");
        nameInput.value = lastGoodNameInput;
    } else {
        nameErrorMessage.innerText = "";
        nameErrorMessage.classList.remove("fade-out");
        nameInput.classList.remove("error-field");
        lastGoodNameInput = nameInput.value;
    }
}

nameInput.addEventListener("focusout", resetMessage);
function resetMessage() {
    nameErrorMessage.innerText = "";
    nameErrorMessage.classList.remove("fade-out");
    nameInput.classList.remove("error-field");
}


// Email Validation

let emailInput = document.getElementById("email");
let emailErrorMessage = document.getElementById("email-error-message");
let lastGoodEmailInput = "";

emailInput.setCustomValidity("");
emailInput.addEventListener("input", validateEmail);

// Not including pattern checking for email field due to complex constraint and using built in type checking
function validateEmail() {
    if (emailInput.validity.typeMismatch) {
        emailErrorMessage.innerHTML = "Please enter a valid email address";
        emailErrorMessage.classList.add("fade-out");
        emailInput.classList.add("error-field");
    } else {
        emailErrorMessage.innerHTML = "";
        emailErrorMessage.classList.remove("fade-out");
        emailInput.classList.remove("error-field");
    }
}

// Subject Validation

let subjectInput = document.getElementById("subject");
let subjectErrorMessage = document.getElementById("subject-error-message");

subjectInput.setCustomValidity("");
subjectInput.addEventListener("input", validateSubject);
let lastGoodSubjectInput = "";

function validateSubject() {
    if (subjectInput.validity.patternMismatch) {
        subjectErrorMessage.innerText = "Please provide a valid email subject";
        subjectErrorMessage.classList.add("fade-out");
        subjectInput.classList.add("error-field");
        subjectInput.value = lastGoodSubjectInput;
    } else {
        subjectErrorMessage.innerText = "";
        subjectErrorMessage.classList.remove("fade-out");
        subjectInput.classList.remove("error-field");
        lastGoodSubjectInput = subjectInput.value;
    }
}

// Comments Validation

let commentsInput = document.getElementById("comments");
let commentsErrorMessage = document.getElementById("comments-error-message");
let commentsInfoMessage = document.getElementById("comments-info-message");

commentsInput.setCustomValidity("");
let commentsPattern = /^[\w\s~!@#$%^&*()-=_+;'",./<>?|]*$/
let lastGoodCommentsInput = "";


commentsInput.addEventListener("input", () => {
    validateComments();
    countCharacters();
});

function validateComments() {
    if (!commentsPattern.test(commentsInput.value)) {
        commentsErrorMessage.innerText = "Please input a valid comment";
        commentsErrorMessage.classList.add("fade-out");
        commentsInput.classList.add("error-field");
        commentsInput.value = lastGoodCommentsInput;
    } else {
        commentsErrorMessage.innerText = "";
        commentsErrorMessage.classList.remove("fade-out");
        commentsInput.classList.remove("error-field");
        lastGoodCommentsInput = commentsInput.value;

    }
}

let currentLength = 0;
commentsInfoMessage.innerText = currentLength + " / 1000";

function countCharacters() {
    currentLength = commentsInput.value.length;
    commentsInfoMessage.innerText = currentLength + " / 1000";
    if (currentLength < 750) {
        commentsInfoMessage.style.color = 'black';
    } else if (currentLength < 1000) {
        commentsInfoMessage.style.color = 'orange';
    } else if (currentLength >= 1000) {
        commentsInfoMessage.style.color = 'red';
        commentsInfoMessage.innerText = "Max Characters of 1000 Reached"
    }

}
    