import React from 'react';
import Paper from "@material-ui/core/Paper";
import {Link} from "react-router-dom";
import {Button} from "@material-ui/core";

const Home = () => {
    return (
        <Paper style={{padding: '15px', textAlign: 'center'}}>
            <h1>Welcome to QuickQrCode</h1>
            <p>
                In an increasingly contactless and paperless world it is important to be able to quickly and effortlessly share files with your customers.
                Here you can quickly upload any file to share publicly as a QR code.
                Once uploaded, your file will be added to the Skynet CDN which is a free decentralized content distribution network.
                You will then be given a url to retrieve the file as well as a downloadable QR code to make share the file as easy as possible.
            </p>
            <Button component={Link} variant="contained" color="primary" to="/code">Get Started</Button>
        </Paper>
    )
}

export default Home;