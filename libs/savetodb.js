async function testAPI() {
    const url = "http://localhost:3000/api/hello"
    const request = new XMLHttpRequest();
    request.open("POST", url, true);
    request.onreadystatechange = ()=> {
        if (request.readyState == 4 && request.status == 200) {
            console.log(JSON.parse(request.response).test)
        }
    }
    request.send(JSON.stringify({test: true}));
    }

async function savetoDB(projectName, roomList) {
    const url = "http://localhost:3000/api/savetodb"
    const request = new XMLHttpRequest();
    request.open("POST", url, true);
    request.onreadystatechange = ()=> {
        if (request.readyState == 4 && request.status == 200) {
            console.log(request.response)
        }
    }
    request.send(JSON.stringify({projectName: projectName, roomList: roomList, date: new Date()}));
}

export default savetoDB