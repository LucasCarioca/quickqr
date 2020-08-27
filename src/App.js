import React from 'react';
import {upload} from './service/skynet.service';
import './App.css';
import {
    AppBar,
    Button,
    CircularProgress,
    Container,
    Divider,
    Grid,
    Paper,
    Toolbar,
    Typography
} from '@material-ui/core';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

const QRCode = require('qrcode.react');

const App = () => {
    return (
        <Router>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" style={{flexGrow: 1}}>
                        QuickQrCode
                    </Typography>
                </Toolbar>
            </AppBar>
            <Container>
                <Switch>
                    <Route path="/">
                        <Home/>
                    </Route>
                </Switch>
            </Container>
        </Router>
    );
}

class Home extends React.Component {

    state = {
        selectedFile: null,
        url: null,
        loading: false,
        imgSrc: null,
        skylink: null,
    };

    onFileChange = event => {
        const reader = new FileReader();
        reader.onload = (e) => {
            this.setState({imgSrc: e.target.result})
        }
        this.setState({selectedFile: event.target.files[0]});
        reader.readAsDataURL(event.target.files[0]);
    };

    onFileUpload = () => {
        this.setState({loading: true});
        upload(this.state.selectedFile).then(link => {
            this.setState({loading: false, skylink: link});
            console.log(link);
            this.setState({url: `https://www.siacdn.com/${link}`})
        }).catch(error => {
            this.setState({loading: false});
            console.error(error);
        })
    };

    fileData = () => {
        if (this.state.selectedFile) {
            return (
                <>
                    <Divider style={{margin: '15px 0'}}/>
                    <h2>File Details:</h2>
                    <p>File Name: {this.state.selectedFile?.name}</p>
                    <p>File Type: {this.state.selectedFile?.type}</p>
                    <p>
                        Last Modified:{" "}
                        {this.state.selectedFile?.lastModifiedDate?.toDateString()}
                    </p>
                    <img style={{maxWidth: '100%'}} src={this.state.imgSrc} alt="user uploaded"/>
                </>
            );
        }
        return null;
    };

    download(){
        const link = document.createElement('a');
        link.download = `${this.state.skylink}.png`;
        link.href = document.getElementById('canvas').toDataURL();
        link.click();
    }

    render() {
        const link = document.createElement('a');
        link.addEventListener('click', function (ev) {
            const canvas = document.querySelector('.Qrcode > canvas');
            link.href = canvas.toDataURL();
            link.download = "code.png";
        }, false);

        return (<>
            <br/>
            <Grid container spacing={3}>
                {this.state.url != null ? null :
                    <Grid item xs={12}>
                        <Paper style={{padding: '15px'}}>
                            {this.state.selectedFile == null ? (
                                <>
                                    <h2>To begin, select a file</h2>
                                    <Button
                                        variant="outlined"
                                        component="label"
                                        color="primary"
                                    >
                                        Select File
                                        <input type="file" style={{display: "none"}} onChange={this.onFileChange}/>
                                    </Button>
                                </>
                            ) : (
                                <>
                                    <h2>Your file is ready</h2>
                                    <p>Click the button below to create upload the file and create a QR code.</p>
                                    {this.state.loading ?
                                        <div style={{padding: '15px', display: 'flex', justifyContent: 'center'}}>
                                            <CircularProgress/></div>
                                        : <Button variant="contained" color="primary"
                                                  onClick={this.onFileUpload}> Generate Code! </Button>}
                                </>
                            )}
                            {this.fileData()}
                        </Paper>
                    </Grid>}
                <Grid item xs={12}>
                    {this.state.url != null ? (
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
                            <p>Skylink id: {this.state.skylink}</p>
                            <a href={this.state.url} target="_target">Skylink url</a>
                            <br/>
                            <Button variant="contained" color="primary" onClick={() => {this.download()}}>Download</Button>
                            <Divider/>
                            <div className="QrCode"
                                 style={{padding: '15px', display: 'flex', justifyContent: 'center'}}>
                                <QRCode id="canvas" value={this.state.url}/>
                            </div>
                            <Button variant="outlined" color="secondary" onClick={() => {
                                this.setState({
                                    selectedFile: null,
                                    url: null,
                                    loading: false,
                                    imgSrc: null,
                                    skylink: null
                                })
                            }}> Start over </Button>
                        </Paper>
                    ) : null}
                </Grid>
            </Grid>
        </>);
    }
}


export default App;
