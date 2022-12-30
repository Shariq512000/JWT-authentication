import { useContext } from "react";
import { GlobalContext } from '../context/Context';

import axios from "axios";
import { Formik, Form, Field, useFormik } from 'formik';
import * as yup from 'yup';
import {
    BooleanSchema,
    DateSchema,
    MixedSchema,
    NumberSchema,
    ArraySchema,
    ObjectSchema,
    StringSchema,
} from 'yup';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { useState } from "react";
import "./signup.css";




function Login() {

  let { state, dispatch } = useContext(GlobalContext);



    const [successOpen, setSuccessOpen] = useState(false);
    const [errorOpen, setErrorOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");





    let handleClose = () => {
        setSuccessOpen(false);
        setErrorOpen(false);
    }

    const validationSchema = yup.object({
        email: yup
            .string('Enter a Valid Name')
            .email('enter a valid email')
            // .isValid('enter a valid email')
            .required('email is Required'),
        password: yup
            .string('Enter Password')
            .required('Password is Required'),
    });

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            console.log("values: ", values);
            axios.post(`${state.baseUrl}/login`, {
                email: formik.values.email,
                password: formik.values.password,


            },{
              withCredentials: true
            })
                .then(response => {
                    let message = response.data.message;
                    console.log("message: ", message)
                    console.log("response: ", response.data);
                    setSuccessOpen(true);
                    setSuccessMessage(message);
                    dispatch({type: 'USER_LOGIN', payload: null})

                })
                .catch(err => {
                    console.log("error: ", err);
                    setErrorMessage(err.response.data.message);
                    setErrorOpen(true);
                })
        },
    });

    return (
        <div>

            <form className="form" onSubmit={formik.handleSubmit}>
                
                <TextField
                    id="email"
                    name="email"
                    label="Email: "
                    type="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                />
                <br />
                <br />

                <TextField
                    id="password"
                    name="password"
                    label="Password: "
                    type="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    error={formik.touched.password && Boolean(formik.errors.password)}
                    helperText={formik.touched.password && formik.errors.password}
                />
                <br />
                <br />

                <Button color="primary" variant="contained" type="submit">
                    Login
                </Button>

                {/* Successfully Alert */}

                <Snackbar open={successOpen} autoHideDuration={3000} onClose={handleClose} anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center'
                }}>
                    <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                        {successMessage}
                    </Alert>
                </Snackbar>

                {/* Error Alert */}

                <Snackbar open={errorOpen} autoHideDuration={3000} onClose={handleClose} anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center'
                }}>
                    <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                        {errorMessage};
                    </Alert>
                </Snackbar>
            </form>





        </div>
    )
}
export default Login;