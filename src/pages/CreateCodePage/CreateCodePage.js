import React from "react";
import {upload} from "../../service/skynet.service";
import {Button, CircularProgress, Divider, Paper} from "@material-ui/core";
import {Redirect} from "react-router-dom";
import {FirebaseContext} from "../../firebase";


class CreateCodePage extends React.Component {

    static contextType = FirebaseContext;
    state = {
        selectedFile: null,
        url: null,
        loading: false,
        imgSrc: null,
        pathToResults: null,
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
            if (this.context.user != null) {
                this.context.database.ref('codes/' + this.context.user.uid).push().set({
                    name: this.state.selectedFile?.name,
                    type: this.state.selectedFile?.type,
                    linkId: link
                });
            }
            const pathToResults = `/code/${link}`
            console.log(pathToResults);
            this.setState({loading: false, url: `https://www.siacdn.com/${link}`, pathToResults})
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
        const link = document.createElement('a');
        link.addEventListener('click', function (ev) {
            const canvas = document.querySelector('.Qrcode > canvas');
            link.href = canvas.toDataURL();
            link.download = "code.png";
        }, false);

        if (this.state.pathToResults != null) return (
            <Redirect push to={this.state.pathToResults}/>
        )
        return (<>
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
        </>);
    }
}

export default CreateCodePage;