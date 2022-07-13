//  Treehouse FSJS Techdegree
//  Project 5 - Public API Requests

// Get and display 12 random users

const searchContainer = document.querySelector('.search-container');
const gallery = document.getElementById('gallery');
//const url = `https://randomuser.me/?results=12&inc=name,picture,email,location,phone,dob&noinfo&nat=US`;
const url = "https://randomuser.me/api/?results=12";
let employees = [];
let modal = 0;

// GET EMPLOYEE DATA

fetch(url)
.then(res => res.json())
//.then(checkStatus)
.then(data => {
    employees = data.results;
    displayEmployees(employees);
})
.catch(err => console.log(err));

// DISPLAY EMPLOYEE CARDS

function displayEmployees(employeeData){
    console.log(employeeData);
    let employeeHTML = '';
    employeeData.forEach((employee, index) => {
        const name = employee.name;
        const email = employee.email;
        const picture = employee.picture;
        const city = employee.location.city;
        const state = employee.location.state;

        employeeHTML += 
        `<div class="card" data-index="${index}">
            <div class="card-img-container">
                <img class="card-img" src="${picture.medium}" alt="profile picture">
            </div>
            <div class="card-info-container">
                <h3 id="name" class="card-name cap">${name.first} ${name.last}</h3>
                <p class="card-text">${email}</p>
                <p class="card-text cap">${city}, ${state}</p>
            </div>
        </div>`;
    });
    gallery.innerHTML = employeeHTML;
    document.querySelectorAll('.card').forEach((card, index) => {
        card.addEventListener('click',() => generateModal(index) )
    })
}

// DISPLAY MODAL

const modalContainer = document.querySelector(".modal-container");
modalContainer.style.display = 'none';
function generateModal(index) {
    console.log(index);
    const {name, dob, phone, email, location, picture} = employees[index];
    const {city,state,street,postcode} = location;
    const newFormatPhone = phone.replace(/-/," ");
    let date = new Date(dob.date);

    const modalHTML =
    `<div class="modal">
        <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
        <div class="modal-info-container">
            <img class="modal-img" src="${picture.large}" alt="profile picture">
            <h3 id="name" class="modal-name cap">${name.first} ${name.last} </h3>
            <p class="modal-text">${email}</p>
            <p class="modal-text cap">${city}</p>
            <hr>
            <p class="modal-text">${newFormatPhone}</p>
            <p class="modal-text">${street.number} ${street.name}, ${city}, ${state}, ${postcode}</p>
            <p class="modal-text">${date.getMonth()}/${date.getDate()}/${date.getFullYear()}</p>
        </div>
    </div>`;
    modalContainer.innerHTML = modalHTML;
    modalContainer.style.display = 'block';

    document.getElementById('modal-close-btn').addEventListener('click', () => {
        modalContainer.innerHTML = '';
        modalContainer.style.display = 'none';
    })
}
