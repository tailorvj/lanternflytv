// lanternflytv - A full page URL rotator for digital signage
// Copyright (C) 2023  Asaf Prihadash TailorVJ.com

// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as
// published by the Free Software Foundation, either version 3 of the
// License, or (at your option) any later version.
const { ipcRenderer } = require("electron");

function generateSecretCode() {
  const characters = "abcdefghijklmnopqrstuvwxyz0123456789";
  const length = 4;

  const secretCode = Array.from({ length }, () =>
    characters.charAt(Math.floor(Math.random() * characters.length)),
  ).join("");

  console.log(`Generated secret code: ${secretCode}`);

  return secretCode;
}

const firebaseConfig = {
  apiKey: "AIzaSyD4THmgb0VvEviPU-iyf9yW6yIYZxiWCIQ",
  authDomain: "fullpagerotator.firebaseapp.com",
  databaseURL: "https://fullpagerotator.firebaseio.com",
  projectId: "fullpagerotator",
  storageBucket: "fullpagerotator.appspot.com",
  messagingSenderId: "86135359372",
  appId: "1:86135359372:web:2cef412316bbe3c07238a9",
};

firebase.initializeApp(firebaseConfig);

firebase
  .auth()
  .signInAnonymously()
  .then((userCredential) => {
    console.log("Signed in as anonymous userId: ", userCredential.user.uid);
    const db = firebase.firestore();

    let timeoutId;
    const userId = userCredential.user.uid;
    const screenRef = db.collection("screens").doc(userId);

    screenRef
      .get()
      .then((docSnapshot) => {
        if (!docSnapshot.exists) {
          const secretCode = generateSecretCode();
          screenRef
            .set({
              secretCode,
              claimed: false,
            })
            .catch((error) => {
              console.error("Error writing document to Firestore: ", error);
            });
        }
      })
      .catch((error) => {
        console.error("Error checking document existence: ", error);
      });

    function sendNextUrl(urlList, urlIndex) {
      const urlData = urlList[urlIndex];

      ipcRenderer.send("url-change", urlData.url);

      if (urlList.length > 1) {
        // If more than one URL, prepare next
        let nextUrlIndex = urlIndex + 1;
        if (nextUrlIndex >= urlList.length) {
          nextUrlIndex = 0; // loop back to start
        }

        timeoutId = setTimeout(
          () => sendNextUrl(urlList, nextUrlIndex),
          urlData.time * 1000,
        );
      }
    }

    screenRef
      .collection("urls")
      .orderBy("time")
      .onSnapshot(
        (querySnapshot) => {
          const urlList = [];
          querySnapshot.forEach((doc) => {
            const docData = doc.data();
            docData.time = Math.max(docData.time, 5); // Ensure time is never less than 5 seconds
            urlList.push(docData);
          });

          if (urlList.length > 0) {
            clearTimeout(timeoutId); // cancel any existing timeout
            sendNextUrl(urlList, 0);
          }
        },
        (err) => {
          console.log(`Encountered error: ${err}`);
        },
      );
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log("Error code: ", errorCode);
    console.log("Error message: ", errorMessage);
  });
