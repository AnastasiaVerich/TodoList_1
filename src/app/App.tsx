import React, {useCallback, useEffect} from 'react';
import './App.css';
import {
    AppBar,
    Button,
    CircularProgress,
    Container,
    IconButton,
    LinearProgress,
    MenuItem,
    Toolbar,
    Typography
} from "@material-ui/core";
import {TodolistList} from "../features/todolist-list/";
import {ErrorSnackbar} from "../components/error-snack-bar/ErrorSnackbar";
import {useSelector} from "react-redux";
import {appActions} from "../features/application";

import {Redirect, Route, Switch} from 'react-router-dom';
import {authActions, authSelectors, Login} from "../features/auth";
import {selectIsInitialized, selectStatus} from "../features/application/selectors";
import {useActions} from "../utils/redux-utils";


const App = () => {
    const status = useSelector(selectStatus)
    const isLoggedIn = useSelector(authSelectors.selectIsLoggedIn)
    const isInitialized = useSelector(selectIsInitialized)

    const {logoutTC} = useActions(authActions)
    const {initializeAppTC} = useActions(appActions)

    useEffect(() => {
        initializeAppTC()
    }, [])

    const logoutHandler = useCallback(() => {
        logoutTC()
    }, [])
    if (isInitialized ) {
        return <div
            style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
        </div>
    }
    return (

        <div className="App">
            <ErrorSnackbar/>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <MenuItem/>
                    </IconButton>
                    <Typography variant="h6">
                        My App
                    </Typography>
                    {isLoggedIn && <Button color="inherit"
                                           onClick={logoutHandler}>Log out</Button>}
                </Toolbar>
                {status === 'loading' && <LinearProgress/>}
            </AppBar>
            <Container fixed>
                <Route exact path={'/'} render={() => <TodolistList/>}/>
                <Route path={'/auth'} render={() => <Login/>}/>
               {/* <Switch>
                    <Route exact path={'/'} render={() => <TodolistList/>}/>
                    <Route exact path={'/auth'} render={() => <Login/>}/>
                    <Route path={'/404'} render={() => <h1>404: PAGE NOT FOUND</h1>}/>
                    <Redirect from={'*'} to={'/404'}/>
                </Switch>*/}
            </Container>
        </div>
    );
}

export default App;