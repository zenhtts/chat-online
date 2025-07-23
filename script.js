// Firebase config (você precisa trocar pelas suas chaves reais)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getDatabase, ref, push, onChildAdded } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

// 🔧 SUBSTITUA pelos seus dados do Firebase:
const firebaseConfig = {
  apiKey: "AIzaSyCYRtY4OLcPyy7qMROb1pQDRNjUKOd72u0",
  authDomain: "conversas-d112d.firebaseapp.com",
  databaseURL: "https://conversas-d112d-default-rtdb.firebaseio.com",
  projectId: "conversas-d112d",
  storageBucket: "conversas-d112d.firebasestorage.app",
  messagingSenderId: "775752240791",
  appId: "1:775752240791:web:5844ce1a973952c876a3d2",
  measurementId: "G-9PF4N1Y2QS"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const messagesRef = ref(db, "messages");

function sendMessage() {
  const username = document.getElementById("username").value.trim();
  const message = document.getElementById("message").value.trim();

  if (username && message) {
    push(messagesRef, {
      username,
      text: message,
      timestamp: Date.now()
    });
    document.getElementById("message").value = "";
  }
}

onChildAdded(messagesRef, (data) => {
  const msg = data.val();
  const messagesDiv = document.getElementById("messages");
  const messageElement = document.createElement("div");
  messageElement.textContent = `${msg.username}: ${msg.text}`;
  messagesDiv.appendChild(messageElement);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
});
