// user specific js file
import fetchAPIFunc from '../utils/fetchApi.js';
import responseMsgFunc from '../utils/responseMsg.js';
import templates from '../utils/htmlTemplates.js';

// elements
const usersSection = document.querySelector('#users');
const addUserForm = document.querySelector('#addUserForm');
const closeFormX = document.querySelector('#closeFormX');
const addUserBtn = document.querySelector('#addUserBtn');
const submitFormBtn = document.querySelector('#submitFormBtn');


// form input elements
const first_name = document.getElementById('firstName');
const last_name = document.getElementById('lastName');
const other_name = document.getElementById('otherName');
const phone = document.getElementById('phone');
const email = document.getElementById('email');
const password = document.getElementById('password');
const image = document.getElementById('image');

let paswordFieldHidden;
let userId;
let formData;

// add event listeners to edit and delete btns
const addEventToEditDeleteUserBtnFunc = () => {
    const editBtn = document.querySelectorAll('.editBtn');
    const deleteBtn = document.querySelectorAll('.deleteBtn');
    const confirmDeletePanel = document.querySelector('#confirmDeletePanel');
    const cancelDeleteBtn = document.querySelector('#cancelDeleteBtn');
    const confirmDeleteBtn = document.querySelector('#confirmDeleteBtn');

        editBtn.forEach(btn => {
        btn.addEventListener('click', (event) => {
            userId = event.target.parentElement.id;
            let formInputArr = [first_name, last_name, phone, email, image];
            formInputArr.forEach(elem => {
                elem.removeAttribute('required');
            })
            openCloseUserForm(event)
        });
    });

    deleteBtn.forEach( btn => {
        btn.addEventListener('click', (event) => {
            userId = event.target.parentElement.id;
            console.log("userId:" + event.target.parentElement.id)
            confirmDeletePanel.classList.remove('hidden')
            confirmDeletePanel.classList.add('flex')
            usersSection.classList.add('blur-sm');
        });
    })

    cancelDeleteBtn.addEventListener('click', () => {
        confirmDeletePanel.classList.remove('flex')
        confirmDeletePanel.classList.add('hidden')
        usersSection.classList.remove('blur-sm');
    })

    confirmDeleteBtn.addEventListener('click', async() => {
            try {
                console.log("user id:"+userId)
                let res = await fetchAPIFunc(`users/${userId}`, 'DELETE');
                if(!res.ok){
                    throw new error('Something went wrong')
                }
                responseMsgFunc('User Deleted Succesfully', true)
            } catch (error) {
                responseMsgFunc(error.message, false)
            }
        confirmDeletePanel.classList.remove('flex')
        confirmDeletePanel.classList.add('hidden')
        usersSection.classList.remove('blur-sm');
    })
}

// APIrequests
    // get all users
(async() => {
    try {
        let res = await fetchAPIFunc('users', 'GET');
        if(!res.ok){
            throw new error('Something went wrong')
        }
        let val = await res.json();
        val.data.forEach(({_id, first_name, last_name, other_name, image, email, phone, role}) => {
            templates.userTemplate(_id, first_name, last_name, other_name, image, email, phone, role);
        })
        addEventToEditDeleteUserBtnFunc();
    } catch (error) {
        responseMsgFunc(error.message, false)
    }
})();

// addUserForm
const openCloseUserForm = (e) => {
    const editBtn = document.querySelectorAll('.editBtn');
    // hiding password field
    userId = e.target.parentElement.id;
    let permission = false;
    editBtn.forEach(elem => {
        e.target == elem && ( permission = true );
    })
    if(permission){
        password.classList.remove('hidden')
        password.classList.add('block')
        submitFormBtn.innerHTML = 'Update User'
        paswordFieldHidden = false;
    } else {
        password.classList.add('hidden')
        password.classList.remove('block')
        submitFormBtn.innerHTML = 'Create User'
        paswordFieldHidden = true;
        let formInputArr = [first_name, last_name, phone, email, image];
            formInputArr.forEach(elem => {
                elem.setAttribute('required', true);
            })
    }

    // open and close form
    if(addUserForm.classList.contains('hidden')){
        addUserForm.classList.remove('hidden');
        addUserForm.classList.add('flex');
        usersSection.classList.add('blur-sm');
    } else{
        addUserForm.classList.remove('flex');
        addUserForm.classList.add('hidden');
        usersSection.classList.remove('blur-sm');
    }
    
}

    // add or edit user
const submitAddOrEditUserForm = async(e) => {
    e.preventDefault();
    const first_name = document.getElementById('firstName').value;
    const last_name = document.getElementById('lastName').value;
    const other_name = document.getElementById('otherName').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const image = document.getElementById('image').value;

    // removing empty inputs
    let payload = {first_name, last_name, other_name, phone, email, password, image};
    let payloadArr = Object.entries(payload);
    formData = new FormData();
    payloadArr.forEach((elem) => {
        if(elem[1] == ''){
            delete payload[elem[0]];
        } else {
            console.log(elem[0], elem[1])
            formData.append(elem[0], elem[1]);
        }
    })
    console.log("formData: " + JSON.stringify(formData.getAll()))

    // checking if to create or update user
    if(Object.values(payload).length > 0){
        if(paswordFieldHidden && Object.values(payload).length >= 5){
            submitFormBtn.innerHTML = 'Creating User...';
            createOrUpdateUser(payload, 'create');
            // console.log(['user created successfully', payload]);
        } else if(!paswordFieldHidden){
            submitFormBtn.innerHTML = 'Updating User...';
            createOrUpdateUser(payload, 'update');
            // console.log(['user updated successfully', payload]);
        } else {
            responseMsgFunc("Please fill all required fields", false);
        }
    } else {
        responseMsgFunc("You can't submit an empty form", false);
    }
}

// user create or update function
const createOrUpdateUser = async(payload, createOrUpdate) => {
    console.log("payload: " + JSON.stringify(payload))
    console.log("formData: " + JSON.stringify(formData))
    try {
        if(createOrUpdate == 'create'){
            let res = await fetchAPIFunc('auth/register', 'POST', formData);
            if(!res || !res.status){
                throw new Error('Something went wrong');
            }
            let data = await res.json();
            console.log(data)
            responseMsgFunc(data.message, data.success);
        } else {
            let res = await fetchAPIFunc(`/users/${userId}`, 'PATCH', formData);
            if(!res || !res.status){
                throw new Error('Something went wrong');
            }
            let data = await res.json();
            responseMsgFunc(data.message, data.success);
        }
    } catch (error) {
       responseMsgFunc(error.message, false)
    }
}

// event listeners
addUserBtn.addEventListener('click', (event) => { openCloseUserForm(event) });
closeFormX.addEventListener('click', (event) => { openCloseUserForm(event) });
submitFormBtn.addEventListener('click', (event) => { submitAddOrEditUserForm(event) });