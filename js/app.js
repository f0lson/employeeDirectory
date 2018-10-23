//===========================================================
// Variables
//===========================================================
const gallery = document.querySelector('#gallery');


//===========================================================
//  Fetch request
//===========================================================
fetch('https://randomuser.me/api/?nat=us&results=12')
    .then( response => response.json() )
    .then( data => generateCards(data.results) )

//===========================================================
//  Helper functions
//===========================================================

const generateCards = ( data ) => {
    // iterate and create card for each employee
    let cardHTML = ``;
    data.forEach( employee => {
        let firstName = employee.name.first;
        let lastName = employee.name.last;
        let photo = employee.picture.large;
        let email = employee.email;
        let city = employee.location.city;
        let state = employee.location.state;
        let address = employee.location.street;
        let cell = employee.cell;
        let birthday = employee.dob.date;
        cardHTML += `
            <div class="card">
                <div class="card-img-container">
                    <img class="card-img" src="${photo}" alt="profile picture">
                </div>
                <div class="card-info-container">
                    <h3 id="name" class="card-name cap">${firstName} ${lastName}</h3>
                    <p class="card-text">${email}</p>
                    <p class="card-text cap">${city}, ${state}</p>
                    <p class="address hidden">${address}</p>
                    <p class="cell hidden">${cell}</p>
                    <p class="birthday hidden">${birthday}</p>
                </div>
            </div>
        `;
    }); // end forEach
    gallery.innerHTML = cardHTML;

    // adding click listener for modal to generated cards
    let cards = document.querySelectorAll('.card');
    cards.forEach( card => {
        card.addEventListener('click', (e) => {
            let cardClicked = e.target.closest('.card');
            generateModal(cardClicked);
        }); // end click
    }); // end forEach
}

const generateModal = ( info ) => {
    let name = info.querySelector('#name').textContent;
    console.log(name);
}
