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

// function to show the given classes
function showGivenClasses() {
    const user = auth.currentUser.email;
    const sanitizedEmail = user.replace(/\./g, "-");
    const attendancesRef = ref(db, sanitizedEmail + "/attendances/");

    get(attendancesRef).then((snapshot) => {
        if (snapshot.exists()) {
            const data = snapshot.val();
            const tableBody = document.querySelector("#recordsTable tbody");
            tableBody.innerHTML = ""; // Clear existing table content

            Object.values(data).forEach((record) => {
                const row = tableBody.insertRow();
                row.insertCell().textContent = record.Name;
                row.insertCell().textContent = record.Lesson;
                row.insertCell().textContent = record.Date;
                row.insertCell().textContent = record.Notes;
            });
        } else {
            console.log("No attendance data available");
        }
    }).catch((error) => {
        console.error("Error getting attendance data:", error);
    });
}

// Adding an event listener to the button
const bttnshow = document.getElementById("menuitemRecords");
bttnshow.addEventListener("click", () => {
    showGivenClasses();
});
function filterRecords() {
    const searchText = document.getElementById("searchInput").value.toLowerCase();
    const selectedMonth = document.getElementById("monthFilter").value;
    const tableRows = document.querySelectorAll("#recordsTable tbody tr");

    tableRows.forEach((row) => {
        const name = row.cells[0].textContent.toLowerCase();
        const date = row.cells[2].textContent;
        const recordMonth = date.split("-")[1]; // Extracting month from the date
        const matchesSearch = name.includes(searchText);
        const matchesMonth = selectedMonth === "" || recordMonth === selectedMonth;

        // Show the row if it matches both the search and month filter
        if (matchesSearch && matchesMonth) {
            row.style.display = "";
        } else {
            row.style.display = "none"; // Hide the row if it doesn't match
        }
    });
}

// Adding event listeners to the search input and month filter
const searchInput = document.getElementById("searchInput");
searchInput.addEventListener("input", filterRecords);

const monthFilter = document.getElementById("monthFilter");
monthFilter.addEventListener("change", filterRecords);
