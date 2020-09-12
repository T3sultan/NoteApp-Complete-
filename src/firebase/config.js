import * as firebase from 'firebase';
import "@firebase/auth";
import "@firebase/firestore";

const firebaseConfig={
    apiKey: "AIzaSyBcakZx6lmYmzC5o2SprCoNiT7JtoOO7U4",
    authDomain: "noteapp-39da2.firebaseapp.com",
    databaseURL: "https://noteapp-39da2.firebaseio.com",
    projectId: "noteapp-39da2",
    storageBucket: "noteapp-39da2.appspot.com",
    messagingSenderId: "732080127925",
    appId: "1:732080127925:web:3e3c4f2d4bb7839b6523fc"

};
if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
}
export {firebase};

