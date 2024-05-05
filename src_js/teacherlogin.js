import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyBLAsq_onVnY3DGmC8fIc4Z_VZ80PjXWe8",
    authDomain: "horizon-db7c1.firebaseapp.com",
    projectId: "horizon-db7c1",
    storageBucket: "horizon-db7c1.appspot.com",
    messagingSenderId: "1068270701842",
    appId: "1:1068270701842:web:5834b28630cc83de1137cb"
};
const app = initializeApp(firebaseConfig);

const auth = getAuth();

const loginSubmit = document.getElementById('loginSubmit');
loginSubmit.addEventListener("click", function (event) {
    event.preventDefault()

    //inputs
    const loginEmail = document.getElementById('loginEmail').value;
    const loginPassword = document.getElementById('loginPassword').value;


    signInWithEmailAndPassword(auth, loginEmail, loginPassword)
        .then((userCredential) => {
            // Signed up 
            const user = userCredential.user;
            // ...
            console.log("user logged in!")
            window.location.href = 'pages/teacherhomepage.html';

        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert("Erro de login", errorMessage)
            console.log(errorMessage)
            // ..
        });
})