import React from 'react';
import { upload } from './service/skynet.service';
import './App.css';

const QRCode = require('qrcode.react');

class App extends React.Component { 
   
  state = { 
    selectedFile: null,
    url: null
  }; 

  onFileChange = event => { 
    this.setState({ selectedFile: event.target.files[0] }); 
  }; 
   
  onFileUpload = () => { 
    upload(this.state.selectedFile).then(link => {
      console.log(link);
      this.setState({url: `https://www.siacdn.com/${link}`})
    }).catch(error => {
      console.error(error);
    })
  }; 

  fileData = () => { 
   
    if (this.state.selectedFile) { 
        
      return ( 
        <div> 
          <h2>File Details:</h2> 
          <p>File Name: {this.state.selectedFile?.name}</p> 
          <p>File Type: {this.state.selectedFile?.type}</p> 
          <p> 
            Last Modified:{" "} 
            {this.state.selectedFile?.lastModifiedDate?.toDateString()} 
          </p> 
        </div> 
      ); 
    } else { 
      return ( 
        <div> 
          <br /> 
          <h4>Choose before Pressing the Upload button</h4> 
        </div> 
      ); 
    } 
  }; 
   
  render() { 
   
    return ( 
      <div> 
          <h1> 
            QuickQr
          </h1> 
          <h3> 
            File Upload using React! 
          </h3> 
          <div> 
              <input type="file" onChange={this.onFileChange} /> 
              <button onClick={this.onFileUpload}> 
                Upload! 
              </button> 
          </div> 
        {this.fileData()} 
        {this.state.url != null ? <QRCode value={this.state.url} /> : null}
      </div> 
    ); 
  } 
} 

export default App; 
