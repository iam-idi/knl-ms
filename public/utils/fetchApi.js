const baseUrl = "https://knlbba-api.onrender.com/api";

const fetchAPIFunc = async(endpoint, methodType, payload, contentType) => {
    try {
        let result;
        if(!contentType){
            if(!payload){
                result = await fetch(`${baseUrl}/${endpoint}`, {
                    method: methodType,
                    headers: {
                        'Content-Type': 'application/json',
                        // 'Authorization': localStorage.getItem('jwt')
                    },
                });
            } else {
                result = await fetch(`${baseUrl}/${endpoint}`, {
                    method: methodType,
                    headers: {
                        'Content-Type': 'multipart/form-data', boundary:'--webkitThisIsTheBoundary--',
                        // 'Authorization': localStorage.getItem('jwt')
                    },
                    body: JSON.stringify(payload),
                });
            }
        } else{
            result = await fetch(`${baseUrl}/${endpoint}`, {
                method: methodType,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });
        }
        return result;
    } catch (error) {
        return error.message;
    }
}
//     // .then(response => {
//     //     if (!response) {
//     //         throw new Error('Registeration failed');
//     //     }
//     //     return response.json();
//     // })
//     // .then(data => {
//     //     // Handle successful login response
//     //     if (data.success == false){
//     //     } else{
//     //         location.assign('./login.html')
//     //     }
//     // })
//     // .catch(error => {
//     //     // Handle login error
//     // });
// }

export default fetchAPIFunc;