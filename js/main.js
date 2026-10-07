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

const errorListUl = document.querySelector("#errorlist");
const historySection = document.querySelector("#history");
const deleteHistoryButton = document.querySelector("#delete");

// Array som används för felmeddelanden
let errorsArr = [];

// Array som innehåller sparade studentkort
let historyArr = [];

/**
 * Validerar formulärets inmatning.
 * @returns {boolean}
 */

function validateForm() {
    //rensa tidigare felmeddelanden
    errorsArr = [];
    errorListUl.innerHTML = "";

    //Kontrollerar om fälten är tomma
    if (fullnameInput.value.trim() === "") {
        errorsArr.push("Fullständigt namn är obligatoriskt.");
    } 
    if (emailInput.value.trim() === "") {
        errorsArr.push("E-postadress är obligatoriskt.");
    } 
      if (phoneInput.value.trim() === "") {
        errorsArr.push("Telefonnummer är obligatoriskt.");
    } 
    
    //kontrollerar om namn är mellan 3 och 50 tecken långt
    if (fullnameInput.value.trim().length < 3 || fullnameInput.value.trim().length > 50) {
        errorsArr.push("Namn måste vara mellan 3 och 50 tecken.");
    }

    //kontrollerar om e-postadressen innehåller ett @-tecken
    //egentligen onödig eftersom detta kontrolleras i html-koden
    if (!emailInput.value.includes("@")) {
        errorsArr.push("E-postadressen måste ha ett giltigt format.");
    }

    //kontrollerar om telefonnumret består av siffror och är mellan 7 och 15 tecken långt
    if (phoneInput.value.trim().length < 7 || phoneInput.value.trim().length > 15) {
        errorsArr.push("Telefonnumret måste vara mellan 7 och 15 siffror långt.");
    }
   
   // funkar inte, återkom senare
    // if (!Number.isInteger(phoneInput.value.trim())) {
    //     errorsArr.push("Telefonnumret måste bestå av siffror.");   
    // } 


    //Om fonten inte väljs blir det den första, alltså måste den inte kontrolleras

    // Visa eventuella felmeddelanden och returnera resultatet (true eller false) av valideringen
    if (errorsArr.length > 0) {
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
    for (let i = 0; i < errorsArr.length; i++) {
        //Skapar ett li-element för varje felmeddelande
        const liEl = document.createElement("li");
        
        //skapar en textnod med felmeddelandet som hämtas från errors-arrayen
        let errorText = document.createTextNode(errorsArr[i]);
        
        //lägger till felmeddelandet i li-elementet
        liEl.appendChild(errorText);   
        
        //lägger till li-elementet i ul-elementet
        errorListUl.appendChild(liEl);
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
       // Hämta information från formuläret och skapar variabler av dem
    let name = fullnameInput.value.trim();
    let email = emailInput.value.trim();
    let phone = phoneInput.value.trim();
    let font = fontSelect.value;
    
    //skapar ett "objekt" som innehåller informationen från formuläret
    const studentCardObject = {
        name: name,
        email: email,
        phone: phone,
        font: font
    };
    
    //hämtar historiken i localStorage
    const localStorageData = localStorage.getItem("historyArr");

    historyArr = JSON.parse(localStorageData);
    if (historyArr === null){
        historyArr = [];
    }

    //lägger till studentkorten i history-arrayen (redan deklarerad)
    historyArr.push(studentCardObject);

     //konverterar till JSON-sträng
    const StudentCardObjectJSON = JSON.stringify(historyArr);

    //sparar i localStorage
    localStorage.setItem("historyArr", StudentCardObjectJSON);

    renderHistory();
 
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
    //hämtar historiken i localStorage
    const localStorageData = localStorage.getItem("historyArr");

    //konverterar till JSON-sträng
    const StudentCardObjectJSON = JSON.stringify(historyArr);
    
    //om historyArr är null sätter vi den till en tom array
    if (historyArr === null){
        historyArr = [];
    }

    //om det inte finns några värden i arrayen returnerar vi här och ingen mer kod körs
    if(historyArr.length === 0){
        return
    }
    
    //om det finns värden i arrayen loopar vi igenom arrayen
    for (let i = 0; i < historyArr.length; i++) {
       //history är ett div-element i html-koden (historySection i js-koden, deklarerad på rad 21)
       
       //skapar en p-tagg
        const historyPEl = document.createElement("p");

        //lägger till innehåll i p-taggen
        historyPEl.innerHTML = `Namn: ${historyArr[i].name} <br> Epost: ${historyArr[i].email} <br> Telefon: ${historyArr[i].phone}`
        
        // lägger till p-taggen med innehåll i vårt div-element
        historySection.appendChild(historyPEl);  
    }

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
    errorListUl.innerHTML = "";
    errorsArr = [];
    
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
    // kör funktionen validateForm som validerar inmatningen och kollar om den är true eller false
    if (validateForm() === true) {
        //om allt är korrekt ifyllt skapas studentkortet (saveHistory() körs också i createStudentCard())
        createStudentCard();
    } else {
        //om något är fel skrivs felmeddelanden ut på sidan
        displayErrors();
    }
});

// När användaren klickar på "Rensa"
clearButton.addEventListener("click", clearForm);

// När användaren klickar på "Radera historik"
deleteHistoryButton.addEventListener("click", deleteHistory);


// När sidan laddas:
// - läs in och visa eventuell tidigare historik