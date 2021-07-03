import React, {useEffect} from 'react';
import './App.css';
import {
    AppBar,
    Button, CircularProgress,
    Container,
    Grid,
    IconButton,
    LinearProgress,
    MenuItem,
    Toolbar,
    Typography
} from "@material-ui/core";
import {store} from "./state/store";
import { TaskType} from "./api/todolist-api";
import {ErrorSnackbar} from "./ErrorSnackbar";
import {Redirect, Route, Switch} from 'react-router-dom';
import {Login} from "./Login";
import TodolistList from "./TodolistList";
import {fetchTodolistsThunk} from "./state/todolistsReducer";
import {useDispatch} from "react-redux";
import {initializeAppTC, logoutTC} from "./state/auth-reducer";


export type tasksType = {
    [key: string]: TaskType[]
}

const AppWithRedux= React.memo(()=> {
    useEffect(()=>{
       dispatch(initializeAppTC())
    }, [])
    const dispatch = useDispatch()

    let status = store.getState().app.status
    let isInitialized = store.getState().login.isInitialized

   /* if (!isInitialized) {

        return <div
            style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
        </div>
    }*/

    return (

        <div className="App">
            <ErrorSnackbar/>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <MenuItem/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                    {  <Button color="inherit" onClick={()=>{dispatch(logoutTC())}}>Log out</Button>}
                </Toolbar>
                {status === 'loading' && <LinearProgress/>}
            </AppBar>
            <Container fixed>
                <Switch>
                    <Route exact path={'/'} render={() => <TodolistList/>}/>
                    <Route exact path={'/login'} render={() => <Login/>}/>
                    <Route path={'/404'} render={() => <h1>404: PAGE NOT FOUND</h1>}/>
                    <Redirect from={'*'} to={'/404'}/>
                </Switch>
            </Container>
        </div>
    );
})

export default AppWithRedux;