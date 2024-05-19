const resMsg = document.querySelector('#resMsg');
// response message element
const responseMsgFunc = (response, success) => {
    if(!success){
        resMsg.classList.remove('bg-green-600');
        resMsg.classList.add('bg-red-600');
    }

    resMsg.innerHTML = response;
    resMsg.classList.remove('hidden');
    resMsg.classList.add('flex');

    setTimeout(() => {
        resMsg.classList.add('hidden');
        resMsg.classList.remove('flex');
        resMsg.classList.remove('bg-red-600');
        resMsg.classList.add('bg-green-600');
    }, 4000);
}

export default responseMsgFunc;