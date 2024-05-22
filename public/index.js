// // home specific js file
import fetchAPIFunc from './utils/fetchApi.js';
import responseMsgFunc from './utils/responseMsg.js';
const greeting = document.querySelector("#greeting");
const admins = document.querySelector("#admins");
const gallery = document.querySelector("#gallery");
const staffs = document.querySelector("#staffs");
const players = document.querySelector("#players");
const news = document.querySelector("#news");
const testimonials = document.querySelector("#testimonials");

if(!localStorage.getItem('jwt')){
    location.assign('./pages/login.html')
}

let userName = localStorage.getItem('userName');
greeting.innerHTML = `Hello, ${(userName ? userName : "Anon")}`;
const getUsers = async() => {
    try {
        let res = await fetchAPIFunc('users', 'GET');
        let data = await res.json();
        admins.innerHTML = data.data.length;
    } catch (error) {
        responseMsgFunc(error.message, false);
    }
    getstaffsPlayers();
}

const getstaffsPlayers = async() => {
    try {
        let noOfStaffs = 0;
        let noOfPlayers = 0;
        let res = await fetchAPIFunc('teams', 'GET');
        let data = await res.json();
        data.forEach(elem => {
            if(elem.role == 'staff'){
                noOfStaffs++
            } else{
                noOfPlayers++
            }
        })
        staffs.innerHTML = noOfStaffs;
        players.innerHTML = noOfPlayers;
    } catch (error) {
    responseMsgFunc(error.message, false);
    }
    getGallery();
}

const getGallery = async() => {
    try {
        let res = await fetchAPIFunc('gallery', 'GET');
        let data = await res.json();
        gallery.innerHTML = data.data.length;
    } catch (error) {
    responseMsgFunc(error.message, false);
    }
    getNews();
}

const getNews = async() => {
    try {
        let res = await fetchAPIFunc('news', 'GET');
        let data = await res.json();
        news.innerHTML = data.data.length;
    } catch (error) {
    responseMsgFunc(error.message, false);
    }
    getTestimonials();
}

const getTestimonials = async() => {
    try {
        let res = await fetchAPIFunc('testimonials', 'GET');
        let data = await res.json();
        testimonials.innerHTML = data.data.length;
    } catch (error) {
    responseMsgFunc(error.message, false);
    }
}

getUsers();