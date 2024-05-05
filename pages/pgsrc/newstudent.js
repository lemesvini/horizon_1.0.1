// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBLAsq_onVnY3DGmC8fIc4Z_VZ80PjXWe8",
    authDomain: "horizon-db7c1.firebaseapp.com",
    databaseURL: "https://horizon-db7c1-default-rtdb.firebaseio.com",
    projectId: "horizon-db7c1",
    storageBucket: "horizon-db7c1.appspot.com",
    messagingSenderId: "1068270701842",
    appId: "1:1068270701842:web:5834b28630cc83de1137cb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Database
import { getDatabase, set, get, update, remove, ref, child } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-database.js";

const db = getDatabase();
const auth = getAuth();


// Access DOM elements after the page has fully loaded
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const courseInput = document.getElementById('course');
const hourpriceInput = document.getElementById('pricehour');
const mhoursInput = document.getElementById('mhours');
const form = document.getElementById('dataForm');

form.addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent form submission

    // Get input values
    const name = nameInput.value;
    const email = emailInput.value;
    const course = courseInput.value;
    const user = auth.currentUser.uid;


    // Database insertion
    set(ref(db, "teacher/" + `${user}/` + btoa(email)), {
        Name: name,
        Email: email,
        Course: course,
        Teacher: user
    })
        .then(() => {
            set(ref(db, "student/" + btoa(email)), {
                Name: name,
                Email: email,
                Course: course,
                Teacher: user
            })
            alert("Aluno cadastrado!");
            console.log("Deu certo");
            // Clear input fields after successful submission
            nameInput.value = '';
            emailInput.value = '';
            courseInput.value = '';
            hourpriceInput.value = '';
            mhoursInput.value = '';
        })
        .catch((error) => {
            alert(error);
            console.log("Erro");
        });
});
