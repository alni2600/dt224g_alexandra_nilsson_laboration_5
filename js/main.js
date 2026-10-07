"use strict";
/*
 * Laboration 5 - Studentkortsgenerator
 * Namn: Alexandra Nilsson
 */

// Hämta element från DOM
const form = document.querySelector("#studentform");
const clearButton = document.querySelector("#clear");

const fullnameInput = document.querySelector("#fullname");
const emailInput = document.querySelector("#email");
const phoneInput = document.querySelector("#phone");
const fontSelect = document.querySelector("#font");

const previewFullname = document.querySelector("#previewfullname");
const previewEmail = document.querySelector("#previewemail");
const previewPhone = document.querySelector("#previewphone");

const errorList = document.querySelector("#errorlist");
const historySection = document.querySelector("#history");
const deleteHistoryButton = document.querySelector("#delete");

// Array som används för felmeddelanden
let errors = [];

// Array som innehåller sparade studentkort
let history = [];

/**
 * Validerar formulärets inmatning.
 * @returns {boolean}
 */

function validateForm() {
    // Kontrollera formulärets obligatoriska fält. 

    //Kontrollerar om fälten är tomma
    if (fullnameInput.value.trim() === "") {
        errors.push("Fullständigt namn är obligatoriskt.");
    } 
    if (emailInput.value.trim() === "") {
        errors.push("E-postadress är obligatoriskt.");
    } 
      if (phoneInput.value.trim() === "") {
        errors.push("Telefonnummer är obligatoriskt.");
    } 
    
    //kontrollerar om namn är mellan 3 och 50 tecken långt
    if (fullnameInput.value.trim().length < 3 || fullnameInput.value.trim().length > 50) {
        errors.push("Namn måste vara mellan 3 och 50 tecken.");
    }

    //kontrollerar om e-postadressen innehåller ett @-tecken
    if (!emailInput.value.includes("@")) {
        errors.push("E-postadressen måste ha ett giltigt format.");
    }

    //kontrollerar om telefonnumret består av siffror och är mellan 7 och 15 tecken långt
    if (!Number.isInteger(phoneInput.value.trim())) {
        errors.push("Telefonnumret måste bestå av siffror.");   
    } 
    if (phoneInput.value.trim().length < 7 || phoneInput.value.trim().length > 15) {
        errors.push("Telefonnumret måste vara mellan 7 och 15 siffror långt.");
    }

    //Om fonten inte väljs blir det den första, alltså måste den inte kontrolleras

    // Visa eventuella felmeddelanden
    displayErrors(errors);

    // Returnera resultatet (true eller false) av valideringen
    if (errors.length > 0) {
        return false; // Valideringen misslyckades
    } else {
        return true; // Valideringen lyckades
    }
}


/**
 * Visar felmeddelanden på sidan.
 */
function displayErrors() {
    // Rensa tidigare felmeddelandens
    

    //loopar igenom errors-arrayen
    for (let i = 0; i < errors.length; i++) {
        //Skapar ett li-element för varje felmeddelande
        let errorsEl = document.createElement("li");
        //skapar en textnod med felmeddelandet
        let errorText = document.createTextNode(errors[i]);

        //lägger till felmeddelandet i li-elementet
        errorsEl.appendChild(errorText);   
        //lägger till li-elementet i ul-elementet
        errorList.appendChild(errorsEl);
    };

    // Skriv ut aktuella felmeddelanden till DOM
}


/**
 * Skapar ett studentkort och visar det på sidan.
 */
function createStudentCard() {
   // Hämta information från formuläret
    let name = fullnameInput.value.trim();
    let email = emailInput.value.trim();
    let phone = phoneInput.value.trim();
    let font = fontSelect.value;
    
    // Uppdatera studentkortet
    previewFullname.textContent = name;
    previewEmail.textContent = email;
    previewPhone.textContent = phone;

    // Ändra fonten på studentkortet
    previewFullname.style.fontFamily = font;
    previewEmail.style.fontFamily = font;
    previewPhone.style.fontFamily = font;

    // Lägg till studentkortet i historiken
    saveHistory();

    // Spara och uppdatera historiken
}


/**
 * Sparar historiken i localStorage.
 */
function saveHistory() {
    // Spara history i localStorage
}


/**
 * Läser in tidigare historik från localStorage.
 */
function loadHistory() {
    // Hämta eventuell sparad historik

    // Uppdatera history
}


/**
 * Visar historiken på sidan.
 */
function renderHistory() {
    // Rensa tidigare visad historik

    // Skriv ut innehållet i history till DOM
}


/**
 * Rensar formulär, aktuellt studentkort och felmeddelanden.
 */
function clearForm() {
    // Återställ formulär och studentkort genom att tömma input-fälten och återställa fonten till standard
    fullnameInput.value = "";
    emailInput.value = "";
    phoneInput.value = "";
    fontSelect.value = "Georgia";

    // Rensa eventuella felmeddelanden
    errorList.innerHTML = "";
    errors = [];
    
}


/**
 * Raderar hela historiken.
 */
function deleteHistory() {
    // Radera sparad historik

    // Uppdatera history och visningen på sidan
}


// Eventlyssnare - när användaren klickar på "Skapa studentkort"
form.addEventListener("submit", (event) => {
    event.preventDefault();

    // När formuläret skickas:
    // - validera inmatningen
    validateForm();

// - skapa studentkort om valideringen lyckas
    if (validateForm === true) {
        createStudentCard();
    }
});


// När användaren klickar på "Rensa"
clearButton.addEventListener("click", clearForm);

// När användaren klickar på "Radera historik"
deleteHistoryButton.addEventListener("click", deleteHistory);


// När sidan laddas:
// - läs in och visa eventuell tidigare historik