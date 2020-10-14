// web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyAsUT-0nKLspmWvVYBacrtb6UM5okvenRI",
    authDomain: "cliffed.firebaseapp.com",
    databaseURL: "https://cliffed.firebaseio.com",
    projectId: "cliffed",
    storageBucket: "cliffed.appspot.com",
    messagingSenderId: "75035139261",
    appId: "1:75035139261:web:ae9f5a396e646628036bd4",
    measurementId: "G-X8ED1ETDRG"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Setup access to the database
let db = firebase.firestore();

let score = 0;

function saveScore() {
    // Get name from input box
    let name = document.getElementById('name').value;
    let score = document.getElementById('score').innerText;
    // Make sure name has a value, if not send alert.
    if (name !== "") {
        // Add a new document in collection "scores"
        db.collection("scores").doc().set({
            name: name,
            score: score
        })
            .then(function () {
                console.log("Document successfully written!");
                updateScores();
            })
            .catch(function (error) {
                console.error("Error writing document: ", error);
            });
    } else {
        alert('Please enter a name');
    }
}

function updateScores() {
    // Clear current scores in our scoreboard
    document.getElementById('scoreboard').innerHTML = '<tr><th>Name</th><th>Score</th></tr>';

    // Get the top 5 scores from our scoreboard
    db.collection("scores").orderBy("score", "desc").limit(5).get().then((snapshot) => {
        snapshot.forEach((doc) => {
            document.getElementById('scoreboard').innerHTML += '<tr>' +
                '<td>' + doc.data().name + '</td>' +
                '<td>' + doc.data().score + ' seconds ' + '</td>' +
                '</tr>';
        })
    })
}

window.onload = setTimeout(updateScores, 1000);