import { initializeApp } from "firebase/app";
import { getDatabase, ref, push, set, onChildAdded } from "firebase/database";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBUPMef27jfxAutdfVGZQVndpmAnnfRFJo",
  authDomain: "chatpod-44419.firebaseapp.com",
  databaseURL: "https://chatpod-44419-default-rtdb.firebaseio.com",
  projectId: "chatpod-44419",
  storageBucket: "chatpod-44419.appspot.com",
  messagingSenderId: "536887192529",
  appId: "1:536887192529:web:83b8a8915118120fc80ef0"
};

// Init Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// DOM elements
const usernameInput = document.getElementById("username");
const messageInput = document.getElementById("message");
const sendBtn = document.getElementById("sendBtn");
const chatbox = document.getElementById("chatbox");

// Send message
function sendMessage() {
  const user = usernameInput.value.trim();
  const text = messageInput.value.trim();

  if (!user || !text) return;

  const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const newMessage = {
    user,
    text,
    time
  };

  const messagesRef = ref(db, "messages");
  const newMsgRef = push(messagesRef);
  set(newMsgRef, newMessage);

  messageInput.value = "";
  messageInput.focus();
}

// Listen to new messages
const messagesRef = ref(db, "messages");
onChildAdded(messagesRef, (snapshot) => {
  const msg = snapshot.val();
  const p = document.createElement("p");
  p.textContent = `${msg.time} | ${msg.user}: ${msg.text}`;
  chatbox.appendChild(p);
  chatbox.scrollTop = chatbox.scrollHeight;
});

// Event listeners
sendBtn.addEventListener("click", sendMessage);
messageInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") sendMessage();
});
// Store and retrieve username using localStorage
window.addEventListener("DOMContentLoaded", function () {
  const usernameInput = document.getElementById("username");
  const savedName = localStorage.getItem("chatUsername");

  if (savedName && usernameInput) {
    usernameInput.value = savedName;
  }

  if (usernameInput) {
    usernameInput.addEventListener("blur", function () {
      const name = usernameInput.value.trim();
      if (name) {
        localStorage.setItem("chatUsername", name);
      }
    });
  }
});
