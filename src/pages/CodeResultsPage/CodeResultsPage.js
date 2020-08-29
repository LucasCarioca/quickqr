import React from 'react';
import {useParams} from "react-router";
import {Button, Divider, Paper} from "@material-ui/core";
import {Link} from "react-router-dom";

const QRCode = require('qrcode.react');

const CodeResultsPage = () => {
    const {id} = useParams("/blog/:slug");
    const baseUrl = "https://www.siacdn.com/";
    const linkUrl = baseUrl + id;


    const download = () => {
        const link = document.createElement('a');
        link.download = `${id}.png`;
        link.href = document.getElementById('canvas').toDataURL();
        link.click();
    }

    const link = document.createElement('a');
    link.addEventListener('click', function (ev) {
        const canvas = document.querySelector('.Qrcode > canvas');
        link.href = canvas.toDataURL();
        link.download = "code.png";
    }, false);

    return (
        <Paper style={{
            padding: '15px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <h2>
                Your QR Code is ready!!
            </h2>
            <p>id: {id}</p>
            <a href={linkUrl} target="_target">Content url</a>
            <br/>
            <Button variant="contained" color="primary" onClick={() => {download()}}>Download</Button>
            <Divider/>
            <div className="QrCode"
                 style={{padding: '15px', display: 'flex', justifyContent: 'center'}}>
                <QRCode id="canvas" value={linkUrl}/>
            </div>
            <Button variant="outlined" color="secondary" component={Link} to="/"> Start over </Button>
        </Paper>
    )
};

export default CodeResultsPage;