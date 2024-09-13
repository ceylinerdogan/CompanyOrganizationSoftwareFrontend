import { Button, TextField } from '@mui/material';
import React,{useState} from 'react';
import "./ResetPassword.css"
import axios from "axios";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useTranslation } from 'react-i18next';
import i18n from './i18n';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

const ResetPassword = () =>{
    const {t} = useTranslation();
    const [email,setEmail] = useState('');
    const [successSnackbarOpen, setSuccessSnackbarOpen] = useState(false);
    const [errorSnackbarOpen, setErrorSnackbarOpen] = useState(false);
    const [emailError,setEmailError] = useState(false);
    const [userNotFoundError,setUserNotFoundError] =useState(false);

    const emailCheck=(email)=>{
        const emailPattern =/^[a-z0-9]+@[a-z]+\.[a-z]{2,5}/;
        return emailPattern.test(email);
    }

    const handleResetPassword =()=> {
        if(!emailCheck(email)){
            console.log("Email is not valid. Please enter a valid email.");
            setEmailError(true);
            return;
        }

        const resetData={
            email: email,
        }
        
        axios.post("https://delta.eu-west-1.elasticbeanstalk.com/api/auth/reset-password",resetData)
        .then(Response=>{
            console.log(Response.data);
            if(Response.data.message ==='Reset password mail send'){
                setSuccessSnackbarOpen(true);
            }
        })
        .catch(Error=>{
            console.error("Error password reset:",Error);
            if(Error.response.data.message === 'User not found'){
                setUserNotFoundError(true);
            }
            setErrorSnackbarOpen(true);
        })
    };

    const handleClose=(event,reason)=>{
        if(reason==='clickaway'){
            return;
        }
        setSuccessSnackbarOpen(false);
        setErrorSnackbarOpen(false);
        setEmailError(false);
        setUserNotFoundError(false);
    };

    return(
        <div className='wrapperReset'>
            <div className='box-reset'>
                <form>
                    <h2 className='reset-pass'>{t('forgotPassword.title')} </h2>
                    <div>
                        <div>
                            <label className="labelEmailReset" htmlFor="email"> {t('forgotPassword.emailLabel')}</label>
                                <TextField 
                                type ="text" 
                                id="email"
                                value={email} 
                                onChange= {(e)=>setEmail(e.target.value)} 
                                placeholder ={t('forgotPassword.emailLabel')} 
                                className='emailInput'/>
                        </div>
                            <Button 
                                className='ResetPass-btn'
                                onClick={handleResetPassword}
                                style={{
                                padding:'10px 101px',
                                borderRadius: '5px',
                                top:'25px',
                                fontFamily: 'Arial, Helvetica, sans-serif',
                                }}
                                >{t('forgotPassword.sendActivationMailButton')}</Button>
                                <Snackbar open={successSnackbarOpen} 
                                    autoHideDuration={3000} 
                                    onClose={handleClose}
                                    anchorOrigin={{vertical: 'top', horizontal: 'center'}}>
                            <Alert onClose={handleClose} severity="success" sx={{ width: '200%' }}>
                            {t('forgotPassword.mailSendSuccessfulMessage')}
                                <a href="https://company-organization-software-coral.vercel.app">Click here to go to Login page.</a>
                            </Alert>
                        </Snackbar>
                        <Snackbar open={errorSnackbarOpen} 
                                    autoHideDuration={3000} 
                                    onClose={handleClose}
                                    anchorOrigin={{vertical: 'top', horizontal: 'center'}}>
                            <Alert onClose={handleClose} severity="error" sx={{ width: '200%' }}>
                            {t('forgotPassword.mailSendErrorMessage')}
                            </Alert>
                        </Snackbar>
                        <Snackbar open={emailError} 
                                    autoHideDuration={3000} 
                                    onClose={handleClose}
                                    anchorOrigin={{vertical: 'top', horizontal: 'center'}}>
                            <Alert onClose={handleClose} 
                                    severity="error" 
                                    sx={{ width: '200%' }}>
                                    {t('forgotPassword.emailError')}
                            </Alert> 
                        </Snackbar>
                        <Snackbar open={userNotFoundError} 
                                    autoHideDuration={3000} 
                                    onClose={handleClose}
                                    anchorOrigin={{vertical: 'top', horizontal: 'center'}}>
                            <Alert onClose={handleClose} 
                                    severity="error" 
                                    sx={{ width: '200%' }}>
                                    {t('forgotPassword.userNotFoundError')}
                            </Alert> 
                        </Snackbar>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ResetPassword