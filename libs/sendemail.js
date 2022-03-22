export default async function sendEmail(input) {
    let email = {};
    for (var pair of input.entries()) {
        email[pair[0]] = pair[1] 
    }
    const url = "/api/sendemailAPI"
    const request = await fetch(url, {
        method: "POST",
        body: JSON.stringify(email)
    })
        .then(response => response.json())
        .then(response => {
            console.log("server response: " + JSON.stringify(response))
            return "success"
        })
        .catch(error => {
            console.log("error in sendemail.js: " + error)
            return "error"
        })
    return request
}