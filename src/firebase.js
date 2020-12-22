import app from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

var firebaseConfig = {
    apiKey: "AIzaSyCusDyom8ItGV6_vxHj-yBR63dmKkgyAUo",
    authDomain: "donapepa-41e4b.firebaseapp.com",
    projectId: "donapepa-41e4b",
    storageBucket: "donapepa-41e4b.appspot.com",
    messagingSenderId: "765899660770",
    appId: "1:765899660770:web:f3952a6839a19493e2adbb"
  }

  app.initializeApp(firebaseConfig);

  const db = app.firestore()
  const auth = app.auth()

export {db,auth}