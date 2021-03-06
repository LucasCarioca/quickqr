import React, {useContext, useEffect, useState} from 'react';
import './App.css';
import {AppBar, Button, Container, LinearProgress, Menu, MenuItem, Toolbar, Typography} from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import HomeIcon from '@material-ui/icons/Home';
import {BrowserRouter as Router, Link, Route, Switch} from "react-router-dom";
import CodeResultsPage from "./pages/CodeResultsPage";
import CreateCodePage from "./pages/CreateCodePage";
import Landing from "./pages/Landing";
import {FirebaseContext} from "./firebase";

const App = () => {
    const firebase = useContext(FirebaseContext);
    const [user, setUser] = useState(firebase.user);
    const [loading, setLoading] = useState(true);
    const [anchorEl, setAnchorEl] = useState(null);

    useEffect(() => {
        if (user != null) {
            setLoading(false);
        } else {
            firebase.auth.getRedirectResult().then(res => {
                setLoading(false);
                firebase.user = res?.user || null;
                firebase.credential = res?.credential || null;
                localStorage.setItem(firebase.AUTH_LS_KEY, JSON.stringify({
                    user: firebase.user,
                    credential: firebase.credential
                }));
                setUser(firebase.user);
            }).catch(error => {
                console.error(error);
            });
        }
    }, [firebase, user])

    const signOut = () => {
        firebase.auth.signOut().then(() => {
            firebase.user = null;
            firebase.credential = null;
            localStorage.setItem(firebase.AUTH_LS_KEY, JSON.stringify({
                user: null,
                credential: null
            }));
            setUser(null);
        }).catch(error => {
            console.error(error);
        });
        closeMenu()
    }

    const signIn = () => {
        firebase.authenticateWithGoogle();
        closeMenu()
    }

    const showMenu = () => {
        const menuButton = document.querySelector('#accountMenuButton');
        setAnchorEl(menuButton)
    }

    const closeMenu = () => {
        setAnchorEl(null);
    }

    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{vertical: 'top', horizontal: 'right'}}
            keepMounted
            id="accountMenu"
            transformOrigin={{vertical: 'top', horizontal: 'right'}}
            open={Boolean(anchorEl)}
            onClose={closeMenu}
        >
            {user === null ? (
                <MenuItem onClick={signIn}>Sign in with Google</MenuItem>
            ) : (
                <MenuItem onClick={signOut}>Signout</MenuItem>
            )}
        </Menu>
    );

    if (loading) return (
        <LinearProgress/>
    )
    return (
        <Router>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" style={{flexGrow: 1}}>
                        QuickQrCode
                    </Typography>
                    <Button component={Link} to="/" color="inherit"><HomeIcon/></Button>
                    <Button component={Link} to="/code" color="inherit"><AddCircleIcon/></Button>
                    <Button onClick={showMenu} id="accountMenuButton">{user === null ? <AccountCircleIcon style={{color:'white'}}/> :
                        <img style={{width: '25px', borderRadius: '12px'}}
                             src={user.photoURL} alt={user.displayName}/>}</Button>
                </Toolbar>
                {renderMenu}
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
