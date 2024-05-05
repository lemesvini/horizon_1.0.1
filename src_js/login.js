// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import { getDatabase, set, get, update, remove, ref, child } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-database.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
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
const db = getDatabase();



function checkLoggedInAndRedirect() {
    const user = auth.currentUser;

    if (user) {
        const userEmail = btoa(user.email);
        const dbrefCourse = ref(db, "student/" + `${userEmail}/` + "Course/");
        const dbrefName = ref(db, "student/" + `${userEmail}/` + "Name/");
        const dbrefEmail = ref(db, "student/" + `${userEmail}/` + "Email/");

        console.log(userEmail);

        get(dbrefCourse)
            .then((snapshot) => {
                console.log(snapshot.val()); // GET STUDENTS *****COURSE***** HERE
                var coursePage = "pages/" + snapshot.val() + ".html"; // Assuming the course name matches the page name
                window.location.href = coursePage;
            })
            .catch(error => {
                console.error("Error retrieving data: ", error);
            });
        get(dbrefName)
            .then((snapshot) => {
                console.log(snapshot.val()); // GET STUDENTS *****NAME******* HERE
                document.getElementById('studentname').innerHTML = snapshot.val()
            })
            .catch(error => {
                console.error("Error retrieving data: ", error);
            });
        get(dbrefEmail)
            .then((snapshot) => {
                console.log(snapshot.val()); // GET STUDENTS *****Email******* HERE
            })
            .catch(error => {
                console.error("Error retrieving data: ", error);
            });
    } else {
        console.log("User is not logged in");
    }
}


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
            checkLoggedInAndRedirect()

        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert("Erro de login", errorMessage)
            console.log(errorMessage)
            // ..
        });
})