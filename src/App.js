import React from 'react';
import './App.css';
import {AppBar, Container, Toolbar, Typography, Button} from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import HomeIcon from '@material-ui/icons/Home';
import {BrowserRouter as Router, Route, Switch, Link} from "react-router-dom";
import CodeResultsPage from "./pages/CodeResultsPage";
import CreateCodePage from "./pages/CreateCodePage";
import Landing from "./pages/Landing";

const App = () => {
    return (
        <Router>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" style={{flexGrow: 1}}>
                        QuickQrCode
                    </Typography>
                    <Button component={Link} to="/" color="inherit"><HomeIcon/></Button>
                    <Button component={Link} to="/code"color="inherit"><AddCircleIcon/></Button>
                    <Button component={Link} to="/login"color="inherit"><AccountCircleIcon/></Button>
                </Toolbar>
            </AppBar>
            <br/>
            <Container>
                <Switch>
                    <Route path="/code/:id">
                        <CodeResultsPage/>
                    </Route>
                    <Route path="/code">
                        <CreateCodePage/>
                    </Route>
                    <Route path="/">
                        <Landing/>
                    </Route>
                </Switch>
            </Container>
        </Router>
    );
}




export default App;
