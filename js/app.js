//===========================================================
// Variables
//===========================================================
const gallery = document.querySelector('#gallery');
const modal = document.createElement('div');

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
    let cardHTML = '';
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
        let zip = employee.location.postcode;
        cardHTML += `
            <div class="card">
                <div class="card-img-container">
                    <img class="card-img" src="${photo}" alt="profile picture">
                </div>
                <div class="card-info-container">
                    <h3 id="name" class="card-name cap">${firstName} ${lastName}</h3>
                    <p class="card-text email">${email}</p>
                    <p class="address hidden">${address}</p>
                    <p class="card-text cap city">${city}, ${state}</p>
                    <p class="zip hidden"></p>
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
    let email = info.querySelector('.email').textContent;
    let cell = info.querySelector('.cell').textContent;
    let city = info.querySelector('.city').textContent;
    let address = info.querySelector('.address').textContent;
    let birthday = info.querySelector('.birthday').textContent;
    let img = info.querySelector('.card-img').src;
    let modalHTML = `
        <div class="modal-container">
            <div class="modal">
                <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                <div class="modal-info-container">
                    <img class="modal-img" src="${img}" alt="profile picture">
                    <h3 id="name" class="modal-name cap">${name}</h3>
                    <p class="modal-text">${email}</p>
                    <p class="modal-text cap">${city}</p>
                    <hr>
                    <p class="modal-text">${cell}</p>
                    <p class="modal-text">${address}</p>
                    <p class="modal-text">Birthday: ${birthday}</p>
                </div>
            </div>
        </div>
    `;
    modal.innerHTML = modalHTML;
    modal.style.display = 'block';
    gallery.appendChild(modal);
    console.log(modalHTML);

    let close = modal.querySelector('#modal-close-btn');
    close.addEventListener('click', () => {
        modal.style.display = 'none';
    });
}
