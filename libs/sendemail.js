export default async function sendEmail(input) {
    let email = {};
    for (var pair of input.entries()) {
        email[pair[0]] = pair[1] 
    }
    console.log(email)
    const url = "../api/sendemailAPI"
    const request = new XMLHttpRequest();
    try {
        request.open("POST", url, false);
        request.onreadystatechange = ()=> {
            if (request.readyState == 4 && request.status == 200) {
                console.log("server response: " + request.response)
            }
        }
        request.send(JSON.stringify(email));
        return "success"
    } catch (error) {
        console.log("error in sendemail.js: " + error)
        return "error"
    }
}