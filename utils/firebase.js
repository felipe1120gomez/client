// Import the functions you need from the SDKs you need
import "firebase/messaging";
import firebase from "firebase/app";
import localforage from "localforage";

const firebaseCloudMessaging = {
  init: async () => {
    if (!firebase?.apps?.length) {
      // TODO: Add SDKs for Firebase products that you want to use
      // https://firebase.google.com/docs/web/setup#available-libraries

      // Your web app's Firebase configuration
      // For Firebase JS SDK v7.20.0 and later, measurementId is optional
      // Initialize the Firebase app with the credentials
      firebase?.initializeApp({
        apiKey: "AIzaSyAkNriTMXYrIjAjMO0iPAXCDAaqJQGSwbA",
        authDomain: "message-70a41.firebaseapp.com",
        projectId: "message-70a41",
        storageBucket: "message-70a41.appspot.com",
        messagingSenderId: "421667851980",
        appId: "1:421667851980:web:bc14b4956e03a461a43c69",
        measurementId: "G-1034KTZH0D",
      });

      try {
        const messaging = firebase.messaging();
        const tokenInLocalForage = await localforage.getItem("fcm_token");

        // Return the token if it is alredy in our local storage
        if (tokenInLocalForage !== null) {
          return tokenInLocalForage;
        }

        // Request the push notification permission from browser
        const status = await Notification.requestPermission();
        if (status && status === "granted") {
          // Get new token from Firebase
          const fcm_token = await messaging.getToken({
            vapidKey:
              "BIUEd5hV_URnPSVPfkf-kTJ12CQzhPitlCu7nsdJqevOf8zAfAffMWr5ZvYqrZvsX0vPX85Qhf7VUowmnp-ZZuA",
          });

          // Set token in our local storage
          if (fcm_token) {
            localforage.setItem("fcm_token", fcm_token);
            return fcm_token;
          }
        }
      } catch (error) {
        console.error(error);
        return null;
      }
    }
  },
};
export { firebaseCloudMessaging };
