"use strict";
/*
 * Laboration 5 - Studentkortsgenerator
 * Namn: Alexandra Nilsson
 */

// Hämta element från DOM
const form = document.querySelector("#studentform");
const submitButton = document.querySelector("#generate");
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
    // Kontrollera formulärets obligatoriska fält

    // Visa eventuella felmeddelanden

    // Returnera resultatet (true eller false) av valideringen
}


/**
 * Visar felmeddelanden på sidan.
 */
function displayErrors() {
    // Rensa tidigare felmeddelanden

    // Skriv ut aktuella felmeddelanden till DOM
}


/**
 * Skapar ett studentkort och visar det på sidan.
 */
function createStudentCard() {
   // Hämta information från formuläret
    const name = fullnameInput.value;
    const email = emailInput.value;
    const phone = phoneInput.value;
    const font = fontSelect.value;
    
    // Uppdatera studentkortet
    previewFullname.textContent = name;
    previewEmail.textContent = email;
    previewPhone.textContent = phone;
    previewFullname.style.fontFamily = font;
    previewEmail.style.fontFamily = font;
    previewPhone.style.fontFamily = font;

    // Lägg till studentkortet i historiken
    

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
    // Återställ formulär och studentkort

    // Rensa eventuella felmeddelanden
}


/**
 * Raderar hela historiken.
 */
function deleteHistory() {
    // Radera sparad historik

    // Uppdatera history och visningen på sidan
}


// Eventlyssnare - när användaren klickar på "Skapa studentkort"
submitButton.addEventListener("click", (event) => {
    event.preventDefault();
    // När formuläret skickas:
    // - validera inmatningen
    validateForm();

// - skapa studentkort om valideringen lyckas
    createStudentCard();
    saveHistory();
});

// När användaren klickar på "Rensa"
clearButton.addEventListener("click", (event) => {
    event.preventDefault();
    // Rensa formulär och felmeddelanden
    clearForm();
});

// När användaren klickar på "Radera historik"
deleteHistoryButton.addEventListener("click", (event) => {
    event.preventDefault();
    //anropa funktionen deleteHistory() för att radera historiken
    deleteHistory();
});

// När sidan laddas:
// - läs in och visa eventuell tidigare historik