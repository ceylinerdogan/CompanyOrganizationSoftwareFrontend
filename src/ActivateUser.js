import { Button, TextField } from '@mui/material';
import React,{useState} from 'react';
import "./ActivateUser.css"
import axios from "axios";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useTranslation } from 'react-i18next';
import i18n from './i18n';


const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });



const ActivateUser = () =>{
    const {t} = useTranslation();
    const [email,setEmail] = useState('');
    const [successSnackbarOpen, setSuccessSnackbarOpen] = useState(false);
    const [errorSnackbarOpen, setErrorSnackbarOpen] = useState(false);
    const [emailError,setEmailError] = useState(false);
    const [emailUsedBeforeError,setEmailUsedBeforeError] =useState(false);

    const emailCheck=(email)=>{
        const emailPattern =/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailPattern.test(email);
    }

    const handleActivateUser =()=> {
        if(!emailCheck(email)){
            console.log("Email is not valid. Please enter a valid email.");
            setEmailError(true);
            return;
        }
        
        const activateData={
            email: email
        }
        
        axios.post("https://delta.eu-west-1.elasticbeanstalk.com/auth/activateAccount",activateData)
        .then(response=>{
            console.log(response.data);
            if(response.data.message ==='Activation mail send'){
                setSuccessSnackbarOpen(true);
            }
        })
        .catch(Error=>{
            console.error("Error activating user:",Error);
            if(Error.response.data.message === 'User already activated'){
                setEmailUsedBeforeError(true);
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
        setEmailUsedBeforeError(false);
    };

    return(
        <div className='wrapper'>
            <div className='box-activate'>
                <form>
                    <h2 className='activate-user'>{t('activate.title')} </h2>
                    <div>
                    <label className="label-Email" htmlFor="email"> {t('activate.emailLabel')}</label>
                        <TextField 
                            type ="text" 
                            id="email"
                            value={email} 
                            onChange= {(e)=>setEmail(e.target.value)} 
                            placeholder ={t('activate.emailLabel')}
                            className='email-input'/>
                    </div>
                    <Button 
                        className='activation-btn' 
                        onClick={handleActivateUser}
                        style={{
                        padding:'10px 100px',
                        borderRadius: '5px',
                        fontFamily: 'Arial, Helvetica, sans-serif',
                        }}
                        >{t('activate.sendActivationMailButton')}</Button>
                        <Snackbar open={successSnackbarOpen} 
                                    autoHideDuration={3000} 
                                    onClose={handleClose}
                                    anchorOrigin={{vertical: 'top', horizontal: 'center'}}>
                            <Alert onClose={handleClose} severity="success" sx={{ width: '200%' }}>
                            {t('activate.mailSendSuccessfulMessage')}
                                <a href="https://company-organization-software-coral.vercel.app">  Click here to go to Login page.</a>
                            </Alert>
                        </Snackbar>
                        <Snackbar open={errorSnackbarOpen} 
                                    autoHideDuration={3000} 
                                    onClose={handleClose}
                                    anchorOrigin={{vertical: 'top', horizontal: 'center'}}>
                            <Alert onClose={handleClose} severity="error" sx={{ width: '200%' }}>
                            {t('activate.mailSendErrorMessage')}
                            </Alert>
                        </Snackbar>
                        <Snackbar open={emailError} 
                                    autoHideDuration={3000} 
                                    onClose={handleClose}
                                    anchorOrigin={{vertical: 'top', horizontal: 'center'}}>
                            <Alert onClose={handleClose} 
                                    severity="error" 
                                    sx={{ width: '200%' }}>
                                    {t('activate.emailError')}
                            </Alert> 
                        </Snackbar>
                        <Snackbar open={emailUsedBeforeError} 
                                    autoHideDuration={3000} 
                                    onClose={handleClose}
                                    anchorOrigin={{vertical: 'top', horizontal: 'center'}}>
                            <Alert onClose={handleClose} 
                                    severity="error" 
                                    sx={{ width: '200%' }}>
                                    {t('activate.emailUsedBeforeError')}
                            </Alert> 
                        </Snackbar>
                </form>
            </div>
        </div>
            
        
    );
};

export default ActivateUser