// async function test() {
//     await fetch('/tasks', {
//         method: "POST"
//     })
//     .then((data) => {
//         data.json();
//     })
//     .then((data) => {

//     })
// }

function loadDoc(titolo) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById(titolo).remove();
        }
    };
    xhttp.open("POST", "/tasks", true);
    xhttp.send();
}

function rimuovi(titolo) {
    fetch('/delete', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ Titolo: titolo })
    });

    loadDoc(titolo);
}

var tasks = '<%- tasks %>';