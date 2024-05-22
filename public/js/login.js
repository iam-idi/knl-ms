import fetchAPIFunc  from "../utils/fetchApi.js";
import responseMsgFunc from "../utils/responseMsg";

const submitFormBtn = document.querySelector("#submitFormBtn");

const login = async (e) => {
    e.preventDefault();
    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;
    try {
        const res = await fetchAPIFunc('auth/login', 'POST', {email, password});
        let data = await res.json();

        localStorage.setItem("userName", data.data.first_name);
        localStorage.setItem("jwt", data.token);

        location.assign('../index.html')
    } catch (error) {
        responseMsgFunc(error.message);
    }

}

submitFormBtn.addEventListener('click', (event)=>{
    login(event);
})