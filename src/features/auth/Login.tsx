import React from 'react'
import {Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, TextField, Button, Grid} from '@material-ui/core'
import {FormikHelpers, useFormik} from "formik";
import { loginTC} from "./auth-reducer";
import {useDispatch, useSelector} from "react-redux";
import {Redirect} from "react-router-dom";
import {useAppDispatch} from "../../utils/redux-utils";
import {selectIsLoggedIn} from "./selectors";
import {authActions} from "./index";


type FormValuesType = {
    email: string
    password: string
    rememberMe: boolean
}
export const Login = () => {
    const dispatch = useAppDispatch()

    const isLoggedIn= useSelector(selectIsLoggedIn)

    const formik = useFormik({
        validate: (values) => {
            if (!values.email) {
                return {
                    email: 'Email is required'
                }
            }
            if(!values.password){
                return {
                    password: 'Password is required'
                }
            }
        },
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        },
        onSubmit: async (values: FormValuesType, formikHelpers: FormikHelpers<FormValuesType>) => {
            const resultAction = await dispatch(authActions.loginTC(values))
            if (loginTC.rejected.match(resultAction)){
                if (resultAction.payload?.fieldsErrors?.length){
                    const error = resultAction.payload?.fieldsErrors[0]
                    formikHelpers.setFieldError(error.field, error.error)
                }
            }
        },
    })

  if(isLoggedIn){
      return <Redirect to={'/'}/>
  }

    return <Grid container justify="center">
        <Grid item xs={4}>
            <form onSubmit={formik.handleSubmit}>
            <FormControl>
                <FormLabel>
                    <p>To log in get registered
                        <a href={'https://social-network.samuraijs.com/'}
                           target={'_blank'}>here
                        </a>
                    </p>
                    <p>or use common test account credentials:</p>
                    <p>Email: free@samuraijs.com</p>
                    <p>Password: free</p>
                </FormLabel>
                <FormGroup>
                    <TextField
                        label="Email"
                        margin="normal"

                        {...formik.getFieldProps('email')}

/*
                        onBlur={formik.handleBlur}
*/
                    />
                    {  formik.errors.email ? <div style={{color: 'red'}}>{formik.errors.email}</div>: null}
                    <TextField
                        type="password"
                        label="Password"
                        margin="normal"
                        {...formik.getFieldProps('password')}
                        // onBlur={formik.handleBlur}
                    />
                    {  formik.errors.password ? <div style={{color: 'red'}}>{formik.errors.password}</div>: null}
                    <FormControlLabel
                        label={'Remember me'}
                        control={<Checkbox />}
                        {...formik.getFieldProps('rememberMe')}
                        checked={formik.values.rememberMe}
                    />
                    <Button type={'submit'} variant={'contained'} color={'primary'}>Login</Button>
                </FormGroup>
            </FormControl>
            </form>
        </Grid>
    </Grid>
}

