import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
const firebaseConfig = {
    apiKey: "AIzaSyBLAsq_onVnY3DGmC8fIc4Z_VZ80PjXWe8",
    authDomain: "horizon-db7c1.firebaseapp.com",
    projectId: "horizon-db7c1",
    storageBucket: "horizon-db7c1.appspot.com",
    messagingSenderId: "1068270701842",
    appId: "1:1068270701842:web:5834b28630cc83de1137cb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const user = auth.currentUser;

// CHECK LOGIN HERE >>>>>

function CheckLogin() {
    auth.onAuthStateChanged(function (user) {
        if (user) {
            console.log("User Logged In!", user)
        } else {
            window.location.href = '../index.html';
            console.log("User NOT Logged In!")
        }
    })
}

window.onload = function () {
    CheckLogin()
    populateStudentsTable()
};