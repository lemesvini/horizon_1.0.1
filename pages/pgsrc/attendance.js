import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getDatabase, ref, get, set, push } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-database.js";
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


// Function to create and show the popup/modal
function showAttendancePopup(studentData) {
    // Create the popup content
    const popupContent = `
        <div id="attendancePopup">
            <button id="closePopup">&times;</button>
            <h2>Add Lesson</h2>
            <p>Student: <strong>${studentData.Name}</strong></p>
            <p>Module: <strong>${studentData.Course}</strong></p>
            <label for="attendanceDate">Date:</label>
            <input type="date" id="attendanceDate" required>
            <label for="lessonInput">Lesson:</label>
            <input type="text" id="lessonInput" required>
            <label for="notesInput">Teacher's Notes:</label>
            <textarea id="notesInput"></textarea>
            <button id="submitAttendance">Submit</button>
        </div>
    `;

    // Add the popup content to the document body
    const popupContainer = document.createElement("div");
    popupContainer.id = "popupContainer";
    popupContainer.innerHTML = popupContent;
    document.body.appendChild(popupContainer);

    // Event listener for the submit button
    const submitButton = document.getElementById("submitAttendance");
    submitButton.addEventListener("click", () => {
        const attendanceDate = document.getElementById("attendanceDate").value;
        const lesson = document.getElementById("lessonInput").value;
        const notes = document.getElementById("notesInput").value;
        const user = auth.currentUser.email;
        const sanitizedEmail = user.replace(/\./g, "-");

        const attendancesRef = ref(db, sanitizedEmail + "/attendances/");
        const newAttendanceRef = push(attendancesRef);
        set(newAttendanceRef, {
            Name: studentData.Name,
            Email: studentData.Email,
            Date: attendanceDate,
            Lesson: lesson,
            Notes: notes
        });
        // Close the popup after submitting
        popupContainer.remove();
    });

    const closebttn = document.getElementById("closePopup");
    closebttn.addEventListener("click", () => {
        popupContainer.remove();
    })
}

// Update the event listener for populating the table
function populateAttendanceTable() {
    const user = auth.currentUser.uid;
    const dbref = ref(db, "teacher/" + user);

    get(dbref)
        .then((snapshot) => {
            if (snapshot.exists()) {
                const tableBody = document.querySelector("#attendanceTable tbody");
                tableBody.innerHTML = ""; // Clear existing table content
                snapshot.forEach((childSnapshot) => {
                    const childData = childSnapshot.val();
                    const row = document.createElement("tr");
                    row.innerHTML = `
                        <td class="studentName">${childData.Name}</td>
                        <td>${childData.Course}</td>
                    `;
                    tableBody.appendChild(row);

                    // Add event listener to each student name
                    row.querySelector(".studentName").addEventListener("click", () => {
                        showAttendancePopup(childData);
                    });
                });
            }
        })
        .catch(error => {
            console.error("Error retrieving students data: ", error);
        });
}
const attendanceItem = document.getElementById('menuitemAttendance');
attendanceItem.addEventListener('click', function () {
    const tableBody = document.querySelector("#attendanceTable tbody");
    tableBody.innerHTML = "";
    populateAttendanceTable();
});

