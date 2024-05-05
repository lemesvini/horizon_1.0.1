import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-database.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyBLAsq_onVnY3DGmC8fIc4Z_VZ80PjXWe8",
    authDomain: "horizon-db7c1.firebaseapp.com",
    databaseURL: "https://horizon-db7c1-default-rtdb.firebaseio.com",
    projectId: "horizon-db7c1",
    storageBucket: "horizon-db7c1.appspot.com",
    messagingSenderId: "1068270701842",
    appId: "1:1068270701842:web:5834b28630cc83de1137cb"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getDatabase();

function populateStudentsTable() {
    const user = auth.currentUser.uid;
    const dbref = ref(db, "teacher/" + user);

    get(dbref)
        .then((snapshot) => {
            if (snapshot.exists()) {
                const tableBody = document.querySelector("#studentsTable tbody");
                snapshot.forEach((childSnapshot) => {
                    const childData = childSnapshot.val();
                    const row = document.createElement("tr");
                    row.innerHTML = `
                        <td>${childData.Name}</td>
                        <td>${childData.Email}</td>
                        <td>${childData.Course}</td>
                    `;
                    tableBody.appendChild(row);
                });
            }
        })
        .catch(error => {
            console.error("Error retrieving students data: ", error);
        });
}
const reloadButton = document.getElementById('reloadButton');
reloadButton.addEventListener('click', function () {
    const tableBody = document.querySelector("#studentsTable tbody");
    const user = auth.currentUser.email;
    tableBody.innerHTML = "";
    populateStudentsTable();
    console.log(user);
});

