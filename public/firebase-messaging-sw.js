"use strict";

importScripts("https://www.gstatic.com/firebasejs/8.5.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.5.0/firebase-messaging.js");

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: "AIzaSyAkNriTMXYrIjAjMO0iPAXCDAaqJQGSwbA",
    authDomain: "message-70a41.firebaseapp.com",
    projectId: "message-70a41",
    storageBucket: "message-70a41.appspot.com",
    messagingSenderId: "421667851980",
    appId: "1:421667851980:web:bc14b4956e03a461a43c69",
    measurementId: "G-1034KTZH0D",
  });
}

firebase.messaging();
//background notifications will be received here
firebase.messaging().onBackgroundMessage(async (message) => {
  if (Notification.permission === "granted") {
    if (navigator.serviceWorker)
      navigator.serviceWorker.getRegistration().then(async function (reg) {
        if (reg)
          await reg.showNotification(message.notification.title, {
            body: message.notification.body,
          });
      });
  }
});
