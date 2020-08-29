import React from 'react';
import './App.css';
import {AppBar, Container, Toolbar, Typography} from '@material-ui/core';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import CodeResultsPage from "./pages/CodeResultsPage";
import CreateCodePage from "./pages/CreateCodePage";
import Home from "./pages/Home";

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
                        <Home/>
                    </Route>
                </Switch>
            </Container>
        </Router>
    );
}




export default App;
