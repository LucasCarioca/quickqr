import app from 'firebase/app';
import React from 'react';

export const FirebaseContext = React.createContext(null);

export const config = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    databaseURL: process.env.DATABASE_URL,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_SENDER_ID,
    appId: process.env.APP_ID,
    measurementId: process.env.MEASUREMENT_ID,
};

class Firebase {
    constructor() {
        app.initializeApp(config);
    }
}

export default Firebase;