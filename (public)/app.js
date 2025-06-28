// ✅ Firebase CDN SDK imports (for use in browser via <script>)
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";
import {
  getFirestore,
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot
} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";

// ✅ Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAGoGiLMGTbU6AlSmibflOWEY5N_u-c6_A",
  authDomain: "fittrack-app-4422f.firebaseapp.com",
  projectId: "fittrack-app-4422f",
  storageBucket: "fittrack-app-4422f.appspot.com",
  messagingSenderId: "304461788532",
  appId: "1:304461788532:web:e3369ad11f7c16f149a821",
  measurementId: "G-J2G7D4KCL5"
};

// ✅ Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

// ✅ DOM Elements
const authSection = document.getElementById("auth-section");
const dashboard = document.getElementById("dashboard");
const userEmailSpan = document.getElementById("user-email");

function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  signInWithEmailAndPassword(auth, email, password).catch(alert);
}

function signup() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  createUserWithEmailAndPassword(auth, email, password).catch(alert);
}

function logout() {
  signOut(auth);
}

async function addWorkout() {
  const type = document.getElementById("type").value;
  const duration = parseInt(document.getElementById("duration").value);
  const date = document.getElementById("date").value;

  if (!type || !duration || !date) {
    alert("Please fill all fields");
    return;
  }

  await addDoc(collection(db, `users/${auth.currentUser.uid}/workouts`), {
    type,
    duration,
    date: new Date(date)
  });

  document.getElementById("type").value = '';
  document.getElementById("duration").value = '';
  document.getElementById("date").value = '';
}

onAuthStateChanged(auth, user => {
  if (user) {
    authSection.style.display = 'none';
    dashboard.style.display = 'block';
    userEmailSpan.textContent = user.email;

    const q = query(
      collection(db, `users/${user.uid}/workouts`),
      orderBy("date", "desc")
    );

    onSnapshot(q, snapshot => {
      const list = document.getElementById("workout-list");
      list.innerHTML = "";
      let total = 0;
      snapshot.forEach(doc => {
        const data = doc.data();
        total += data.duration;
        const li = document.createElement("li");
        li.textContent = `${data.type} - ${data.duration} min on ${new Date(data.date.toDate()).toLocaleDateString()}`;
        list.appendChild(li);
      });

      const badge = document.getElementById("badge");
      if (total >= 150) {
        badge.textContent = "🏅 Congrats! Active Week!";
      } else {
        badge.textContent = "";
      }
    });

  } else {
    authSection.style.display = 'block';
    dashboard.style.display = 'none';
  }
});

// Only expose necessary functions to window
window.signup = signup;
window.login = login;
window.logout = logout;
window.addWorkout = addWorkout;