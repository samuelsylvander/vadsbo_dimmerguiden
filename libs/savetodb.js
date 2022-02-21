async function savetoDB(projectName, roomList, id) {
    const url = "http://localhost:3000/api/savetodbAPI"
    const request = new XMLHttpRequest();
    request.open("POST", url, false);
    request.onreadystatechange = ()=> {
        if (request.readyState == 4 && request.status == 200) {
            console.log("server response: " + request.response)
            let objectID = JSON.parse(request.response).insertedId
            console.log(objectID)
        }
    }
    request.send(JSON.stringify({id: id, projectName: projectName, roomList: roomList, date: new Date()}));
}


export default savetoDB