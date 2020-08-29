import app from 'firebase/app';
import 'firebase/auth';
import React from 'react';

export const FirebaseContext = React.createContext(null);

export const config = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID,
    measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};

class Firebase {
    constructor() {
        app.initializeApp(config);
        this.AUTH_LS_KEY = "firebaseAuth";
        this.auth = app.auth();
        this.user = null;
        this.credential = null;
        this.googleProvider = new app.auth.GoogleAuthProvider();
    }

    authenticateWithGoogle = () => {
        this.auth.signInWithRedirect(this.googleProvider);
    }
}

export default Firebase;