import React from 'react';
import { upload } from './service/skynet.service';
import './App.css';
import { 
  Container, 
  Button, 
  Divider, 
  Grid, 
  Paper, 
  CircularProgress,
  AppBar,
  Toolbar,
  Typography
} from '@material-ui/core';

const QRCode = require('qrcode.react');

class App extends React.Component { 
   
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
    this.setState({ selectedFile: event.target.files[0] }); 
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
   
  render() { 
    return ( <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{flexGrow: 1}}>
            QuickQrCode
          </Typography>
        </Toolbar>
      </AppBar>
      <Container>
        <h1> 
          
        </h1> 
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
                  <input type="file" style={{ display: "none" }} onChange={this.onFileChange} /> 
                  </Button>
                </>
              ) : (
              <>
                <h2>Your file is ready</h2>
                <p>Click the button below to create upload the file and create a QR code.</p>
                {this.state.loading ? <div style={{padding: '15px', display: 'flex', justifyContent: 'center'}}><CircularProgress /></div>
                : <Button variant="contained" color="primary" onClick={this.onFileUpload}> Generate Code! </Button>}
              </>
              )}
              {this.fileData()} 
            </Paper>
          </Grid>}
          <Grid item xs={12}>
            {this.state.url != null ? (
            <Paper style={{padding: '15px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
              <h2>
                Your QR Code is ready!!
              </h2>
              <p>Skylink id: {this.state.skylink}</p>
              <a href={this.state.url} target="_target">Skylink url</a>
              <div style={{padding: '15px', display: 'flex', justifyContent: 'center'}}>
                <QRCode value={this.state.url} />
              </div>
              <Button variant="outlined" color="secondary" onClick={() => {
                  this.setState({selectedFile: null,
                    url: null,
                    loading: false,
                    imgSrc: null,
                    skylink: null
                  })}}> Start over </Button>
            </Paper>
            ) : null}
          </Grid>
        </Grid>
      </Container> 
    </>); 
  } 
} 

export default App; 
