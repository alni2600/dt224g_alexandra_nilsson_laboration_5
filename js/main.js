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
    //tömmer tidigare felmeddelanden först i validateForm() istället

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
    const localStorageData = localStorage.getItem("StudentCards");

    //omvandlar historyArr till JS (redan deklarerad)
    historyArr = JSON.parse(localStorageData);

    //testar om arrayen är tom, och i så fall tömmer den
    if (historyArr === null){
    historyArr = [];
    }

    //lägger till studentkorten FÖRST i history-arrayen
    historyArr.unshift(studentCardObject);

    //konverterar arrayen till JSON-sträng 
    const historyArrJSON = JSON.stringify(historyArr);

    //sparar i localStorage. Nykelnamn Studentcards och det är informationen i arrayen (i JSON-format) som sparas
    localStorage.setItem("StudentCards", historyArrJSON);

    //skriver ut historiken på sidan
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
    //rensar den utskrivna historiken så att det inte dubbleras
    historySection.innerHTML = "";

    //hämtar historiken i localStorage
    const localStorageData = localStorage.getItem("StudentCards");

    //omvandlar historyArr till JS (redan deklarerad)
    historyArr = JSON.parse(localStorageData);
    
    //om historyArr är null sätter vi den till en tom array
    if (historyArr === null){
        return
    }
    
    //om det finns värden i arrayen loopar vi igenom arrayen
    for (let i = 0; i < historyArr.length; i++) {
       //history är ett div-element i html-koden (historySection i js-koden, deklarerad på rad 21)

       //skapar <p></p>
        const historyPEl = document.createElement("p");

        //lägger till innehåll i p-taggen
        historyPEl.innerHTML = `Namn: ${historyArr[i].name} <br> Epost: ${historyArr[i].email} <br> Telefon: ${historyArr[i].phone} <br> Font: ${historyArr[i].font}`
        
        // lägger till p-taggen med innehåll i vårt div-element
        historySection.appendChild(historyPEl);  
    }
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
    // Radera sparad historik från web storage (webbläsarens minne)
    localStorage.clear();

    // Uppdatera arrayen som lagrat studentkorten, tömmer den
    historyArr = [];

    //Laddar om sidan. Den testar alltså historyArr.length === 0, och eftersom arrayen är tom stannar sidan där. 
    renderHistory();
}


// Eventlyssnare - när användaren klickar på "Skapa studentkort"
form.addEventListener("submit", (event) => {
    event.preventDefault();

    // När formuläret skickas:
    // kör funktionen validateForm som validerar inmatningen och kollar om den är true eller false
    if (validateForm() === true) {
        //om allt är korrekt ifyllt skapas studentkortet (saveHistory() körs också i createStudentCard())
        createStudentCard();
        clearForm();
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
renderHistory();