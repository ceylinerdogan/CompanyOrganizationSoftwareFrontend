import { Button, OutlinedInput, TextField } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Login.css"
import axios from 'axios';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useTranslation } from 'react-i18next';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';


const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


const Login = () => {
    const { t } = useTranslation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [successSnackbarOpen, setSuccessSnackbarOpen] = useState(false);
    const [errorSnackbarOpen, setErrorSnackbarOpen] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [loggedIn, setLoggedIn] = useState(true);
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const emailCheck = (email) => {
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailPattern.test(email);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!emailCheck(email)) {
            console.log("Email is not valid. Please enter a valid email.");
            setEmailError(true);
            setLoggedIn(true);
            return;
        }
        if (password.length === 0) {
            console.log("Password is empty. Please enter a valid password.");
            setErrorSnackbarOpen(true);
            return;
        }

        const loginData = {
            email: email,
            password: password,
        };

        axios.post("https://delta1.eu-west-1.elasticbeanstalk.com/api/auth/login", loginData)
            .then((response) => {
                console.log(response.data);
                setSuccessSnackbarOpen(true);
                navigate('/homepage');

                localStorage.setItem('token', response.data.token);

                // Remove or adjust these if your backend does not return role or ID
                // localStorage.setItem('role', response.data.role);
                // localStorage.setItem('id', response.data.id);
            })
            .catch((error) => {
                console.error("Error during login:", error);
                setErrorSnackbarOpen(true);
            });
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSuccessSnackbarOpen(false);
        setErrorSnackbarOpen(false);
        setEmailError(false);
    };

    function handleClickResetPass(event) {
        navigate('/resetpassword');
    }

    function handleClickActivateUser(event) {
        navigate('/activateuser');
    }

    return (
        <div className='container'>
            <div className='box-login'>
                <form onSubmit={handleSubmit}>
                    <h2 className='login'>{t('login.title')}</h2>
                    <div>
                        <label className="labelEmail" htmlFor="email">{t('login.emailLabel')}</label>
                        <TextField
                            type="text"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder={t('login.emailLabel')}
                            className='emailinput'
                            error={emailError}
                        />
                    </div>
                    <div>
                        <label className="labelPass" htmlFor="password">{t('login.passwordLabel')}</label>
                        <TextField
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="********"
                            className='passwordinput'
                            type={showPassword ? 'text' : 'password'}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </div>

                    <div>
                        <Button
                            className="signInbtn"
                            type="submit"
                            style={{
                                padding: '10px 180px',
                                borderRadius: '5px',
                                fontFamily: 'Arial, Helvetica, sans-serif',
                            }}
                        >{t('login.loginButton')}</Button>
                        <Snackbar open={successSnackbarOpen}
                            autoHideDuration={3000}
                            onClose={handleClose}
                            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                            <Alert onClose={handleClose} severity="success" sx={{ width: '200%' }}>
                                {t('login.loginSuccessMessage')}
                            </Alert>
                        </Snackbar>
                        <Snackbar open={errorSnackbarOpen}
                            autoHideDuration={3000}
                            onClose={handleClose}
                            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                            <Alert onClose={handleClose} severity="error" sx={{ width: '200%' }}>
                                {t('login.loginErrorMessage')}
                            </Alert>
                        </Snackbar>
                        <Snackbar open={emailError}
                            autoHideDuration={3000}
                            onClose={handleClose}
                            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                            <Alert onClose={handleClose}
                                severity="error"
                                sx={{ width: '200%' }}>
                                {t('login.emailError')}
                            </Alert>
                        </Snackbar>
                    </div>
                    <div>
                        <Button
                            className="forgotpassbtn"
                            type="click"
                            onClick={handleClickResetPass}
                            style={{
                                padding: '10px 30px',
                                borderRadius: '5px',
                                fontFamily: 'Arial, Helvetica, sans-serif',
                            }}
                        >{t('login.forgotPasswordButton')}</Button>
                    </div>
                    <div>
                        <Button
                            className="activateaccbtn"
                            type="click" onClick={handleClickActivateUser}
                            style={{
                                padding: '10px 30px',
                                borderRadius: '5px',
                                fontFamily: 'Arial, Helvetica, sans-serif',
                            }}
                        >{t('login.activateAccountButton')}</Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
