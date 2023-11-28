let nameInput = document.getElementById("name-input");
let nameErrorMessage = document.getElementById("name-error-message");

nameInput.addEventListener("submit", function(event) {
    event.preventDefault();
    if (nameInput.validity.valueMissing) {
        console.log("One");
        nameInput.setCustomValidity("");
        nameErrorMessage.innerText = "Please provide your name";
    } else {
        console.log("Two");
        nameInput.setCustomValidity("");
        nameErrorMessage.innerText = "";
    }
    // nameInput.reportValidity();
});