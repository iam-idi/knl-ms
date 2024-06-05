import fetchAPIFunc  from "../utils/fetchApi.js";
import responseMsgFunc from "../utils/responseMsg.js";

const submitFormBtn = document.querySelector("#submitFormBtn");

const login = async (e) => {
    e.preventDefault();
    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;
    try {
        const res = await fetchAPIFunc('auth/login', 'POST', {email, password}, login);
        if(!res || !res.status ){
            throw new Error('Something went wrong');
        }

        let data = await res.json();
        responseMsgFunc(data.message, data.success);
        if(data.success){
            localStorage.setItem("userName", data.data.data.first_name);
            localStorage.setItem("jwt", data.data.token);
            location.assign('../index.html')
        }
    } catch (error) {
        console.log(error)
        responseMsgFunc(error.message, false);
    }

}

submitFormBtn.addEventListener('click', (event)=>{
    login(event);
})