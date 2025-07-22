// Firebase config (você precisa trocar pelas suas chaves reais)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getDatabase, ref, push, onChildAdded } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

// 🔧 SUBSTITUA pelos seus dados do Firebase:
const firebaseConfig = {
  apiKey: "SUA_API_KEY",
  authDomain: "SEU_AUTH_DOMAIN",
  databaseURL: "SUA_DATABASE_URL",
  projectId: "SEU_PROJECT_ID",
  storageBucket: "SEU_BUCKET",
  messagingSenderId: "SEU_SENDER_ID",
  appId: "SEU_APP_ID"
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
