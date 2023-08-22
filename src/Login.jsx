import { Button, Stack, TextField } from '@mui/material';
import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import "./Login.css"
import axios from 'axios';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useTranslation } from 'react-i18next';
import i18n from './i18n';


const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });


const Login = () => {
    const {t} = useTranslation();
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [successSnackbarOpen, setSuccessSnackbarOpen] = useState(false);
    const [errorSnackbarOpen, setErrorSnackbarOpen] = useState(false);
    const [emailError,setEmailError] = useState(false);
    const navigate1 = useNavigate();
    const navigate2 = useNavigate();
    const navigate3 = useNavigate();
    const navigate4 = useNavigate();

    const emailCheck=(email)=>{
        const emailPattern =/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailPattern.test(email);
    }

    Notification.requestPermission((result) => {
        //console.log(result);
      });
      
    
    const handleSubmit = (e) => {
        e.preventDefault();
        if(!emailCheck(email)){
            console.log("Email is not valid. Please enter a valid email.");
            setEmailError(true);
            return;
        }
        if (password.length === 0) {
            console.log("Password is empty. Please enter a valid password.");
            setErrorSnackbarOpen(true);
            return;
        }

        const loginData={
            email: email,
            password: password,
        };
        axios.post("https://delta.eu-west-1.elasticbeanstalk.com/auth/login",loginData)
            .then((Response)=>{
                console.log(Response.data);
                setSuccessSnackbarOpen(true);
            })
            .catch((Error)=>{
                console.error("Error login:",Error);
                setErrorSnackbarOpen(true);
                });
    };

    const handleClose=(event,reason)=>{
        if(reason==='clickaway'){
            return;
        }
        setSuccessSnackbarOpen(false);
        setErrorSnackbarOpen(false);
        setEmailError(false);
    };

    function handleClickResetPass(event){
        navigate1('/resetpassword');
    }

    function handleClickActivateUser(event){
        navigate2('/activateuser');
    }

    function handleClicksSetPass(event){
         navigate3('/setpassword');
    }

    function handleClickSetNewPass(event){
          navigate4('/setnewpassword');
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
                            onChange={(e)=> setEmail(e.target.value)}
                            placeholder={t('login.emailLabel')}
                            className='emailinput'
                            error={emailError}
                        />
                    </div>
                    <div>
                        <label className="labelPass" htmlFor="password">{t('login.passwordLabel')}</label>
                        <TextField
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="********"
                            className='passwordinput'
                        />
                    </div>
                    
                    <div>
                        <Button 
                        className="signInbtn" 
                        onSubmit={handleSubmit} 
                        type="submit"
                        style={{
                        padding:'10px 200px',
                        borderRadius: '5px',
                        fontFamily: 'Arial, Helvetica, sans-serif',
                        }}
                        >{t('login.loginButton')}</Button>
                        <Snackbar open={successSnackbarOpen} 
                                    autoHideDuration={3000} 
                                    onClose={handleClose}
                                    anchorOrigin={{vertical: 'top', horizontal: 'center'}}>
                            <Alert onClose={handleClose} severity="success" sx={{ width: '200%' }}>
                            {t('login.loginSuccessMessage')}
                            </Alert>
                        </Snackbar>
                        <Snackbar open={errorSnackbarOpen} 
                                    autoHideDuration={3000} 
                                    onClose={handleClose}
                                    anchorOrigin={{vertical: 'top', horizontal: 'center'}}>
                            <Alert onClose={handleClose} severity="error" sx={{ width: '200%' }}>
                            {t('login.loginErrorMessage')}
                            </Alert>
                        </Snackbar>
                        <Snackbar open={emailError} 
                                    autoHideDuration={3000} 
                                    onClose={handleClose}
                                    anchorOrigin={{vertical: 'top', horizontal: 'center'}}>
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
                            padding:'10px 30px',
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
                            padding:'10px 30px',
                            borderRadius: '5px',
                            fontFamily: 'Arial, Helvetica, sans-serif',
                            }}
                            >{t('login.activateAccountButton')}</Button>
                    </div>
                        <div>
                        <Button className='setpass' onClick={handleClicksSetPass}>setpass</Button>
                        <Button  className='setnewpass'onClick={handleClickSetNewPass}>setnewpass</Button>
                    </div>  
                </form>
            </div>
        </div>
        
    );
};

export default Login;
    