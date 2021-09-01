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
import {AppRootType, store} from "./store";
import {ErrorSnackbar} from "../components/error-snack-bar/ErrorSnackbar";
import {Redirect, Route, Switch} from 'react-router-dom';
import {Login} from "../features/auth/Login";
import TodolistList from "../features/todolist-list/TodolistList";
import {fetchTodolistsThunk} from "../features/todolist-list/todolistsReducer";
import {useDispatch, useSelector} from "react-redux";
import { logoutTC} from "../features/auth/auth-reducer";
import {initializeAppTC} from "../features/application/app-reducer";
import {TaskType} from "../api/types";




const App= React.memo(()=> {
    const status= useSelector<AppRootType>((state)=>state.app.status)

    useEffect(()=>{
       dispatch(initializeAppTC())
    }, [])
    const dispatch = useDispatch()

    const isloaded= useSelector<AppRootType, boolean>((state)=>state.app.isLoaded)
    const isLoggedIn= useSelector<AppRootType, boolean>((state)=>state.auth.isLoggedIn)


    if (!isLoggedIn && !isloaded) {
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

export default App;