// General js file

// const usersSection = document.querySelector('#users');
const burgerNavItemHolder = document.querySelector("#burgerNavItemHolder");
const greeting = document.querySelector('#greeting');
const addUserForm = document.querySelector('#addUserForm');
const menuIcon = document.querySelector('#menuIcon');
const logoutBtn = document.querySelector('#logoutBtn');

const openCloseNavBar = (e) => {
    // burgerNav
    if(burgerNavItemHolder.classList.contains("hidden") || e.target == "div"){
        burgerNavItemHolder.classList.remove("hidden");
        burgerNavItemHolder.classList.add("flex");
    } else {
        burgerNavItemHolder.classList.remove("flex");
        burgerNavItemHolder.classList.add("hidden");
    }
}

// log out func
const logOutFunc = () => {
    // window.history.forward(); 
    console.log('hlogged out')
}

// event listeners
menuIcon.addEventListener('click', (Event) => {openCloseNavBar(Event)});
logoutBtn.addEventListener('click', logOutFunc);