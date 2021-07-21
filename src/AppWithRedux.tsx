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
import {AppRootType, store} from "./state/store";
import { TaskType} from "./api/todolist-api";
import {ErrorSnackbar} from "./ErrorSnackbar";
import {Redirect, Route, Switch} from 'react-router-dom';
import {Login} from "./Login";
import TodolistList from "./TodolistList";
import {fetchTodolistsThunk} from "./state/todolistsReducer";
import {useDispatch, useSelector} from "react-redux";
import { logoutTC} from "./state/auth-reducer";
import {initializeAppTC} from "./state/app-reducer";


export type tasksType = {
    [key: string]: TaskType[]
}

const AppWithRedux= React.memo(()=> {
    useEffect(()=>{
       dispatch(initializeAppTC())
    }, [])
    const dispatch = useDispatch()

    const isloaded= useSelector<AppRootType, boolean>((state)=>state.app.isLoaded)
    const status= useSelector<AppRootType>((state)=>state.app.status)
    const isLoggedIn= useSelector<AppRootType, boolean>((state)=>state.login.isLoggedIn)


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

export default AppWithRedux;