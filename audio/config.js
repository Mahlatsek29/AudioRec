// firebase config key setup
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

// Your web app's Firebase configuration

const firebaseConfig = {
    apiKey: "AIzaSyAXAn42oGtQzwy2vLhjVXJbG_POwUgrVII",
    authDomain: "audio-35da3.firebaseapp.com",
    projectId: "audio-35da3",
    storageBucket: "audio-35da3.appspot.com",
    messagingSenderId: "27149202818",
    appId: "1:27149202818:web:fb0399497972bb416a0b9b",
    measurementId: "G-TB3QBS1KHF"
}

if (!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
}

export{firebase}; 