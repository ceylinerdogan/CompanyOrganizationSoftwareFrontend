import { Button, TextField } from '@mui/material';
import React,{useState} from 'react';
import {basic_eye} from 'react-icons-kit/linea/basic_eye'
import {basic_eye_closed} from 'react-icons-kit/linea/basic_eye_closed'
import Icon from 'react-icons-kit';
import "./SetPassword.css"
import axios from "axios";
import { useLocation } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useTranslation } from 'react-i18next';
import i18n from './i18n';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

const SetPassword = () =>{
    const {t} = useTranslation();
    const [password,setPassword] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const[uppercase,setUpperCase]=useState(false);
    const[lowercase,setLowerCase]=useState(false);
    const[numeric,setNumeric]=useState(false);
    const[specialsymbol,setSpecialSymbol]=useState(false);
    const[length,setLength]=useState(false);
    const [successSnackbarOpen, setSuccessSnackbarOpen] = useState(false);
    const [errorSnackbarOpen, setErrorSnackbarOpen] = useState(false);
    

    const location=useLocation();
    const token= new URLSearchParams(location.search).get('token')
    
    const handleSetPassword=()=>{
        if (password.length === 0) {
            console.log("Password is empty. Please enter a valid password.");
            setErrorSnackbarOpen(true);
            return;
        }

        const Length = new RegExp('^(?=.{8,32}$)');
        const upperCase = new RegExp('(?=.*[A-Z])');
        const lowerCase = new RegExp('(?=.*[a-z])');
        const specialSymbol = new RegExp('(?=.*[@$.!+-])');
        const Numeric = new RegExp('(?=.*[0-9])');

        if (!lowerCase.test(password) || !upperCase.test(password) || !Numeric.test(password) || !specialSymbol.test(password) || !Length.test(password)) {
            console.log("Password does not meet the criteria. Please make sure all criteria are satisfied.");
            setErrorSnackbarOpen(true);
            return;
        }

        const setpass={
            password:password,
        }
        console.log(password);
        console.log(token);
        axios.post("https://delta1.eu-west-1.elasticbeanstalk.com/api/auth/set-password/${token}",setpass)
        .then(Response=>{
            console.log(Response.data);
            setSuccessSnackbarOpen(true);
        })
        .catch(Error=>{
            console.error("Error setting password:",Error);
            setErrorSnackbarOpen(true);
        })
    };

    const handleClose=(event,reason)=>{
        if(reason==='clickaway'){
            return;
        }
        setSuccessSnackbarOpen(false);
        setErrorSnackbarOpen(false);
    };

    const handleChange=(value)=>{
        const Length=new RegExp('^(?=.{8,32}$)');

        const upperCase= new RegExp('(?=.*[A-Z])');

        const lowerCase=new RegExp('(?=.*[a-z])');

        const specialSymbol=new RegExp('(?=.*[@$.!+-])');

        const Numeric=new RegExp('(?=.*[0-9])');

        if (value.length === 0) {
            setLowerCase(false);
            setUpperCase(false);
            setNumeric(false);
            setSpecialSymbol(false);
            setLength(false);
            return;
        }
        if(lowerCase.test(value)){

            setLowerCase(true);
        }
        else{
            setLowerCase(false);
        }

        if(upperCase.test(value)){

            setUpperCase(true);
        }
        else{
            setUpperCase(false);
        }

        if(Numeric.test(value)){

            setNumeric(true);
        }
        else{
            setNumeric(false);
        }
        
        if(specialSymbol.test(value)){

            setSpecialSymbol(true);
        }
        else{
            setSpecialSymbol(false);
        }

        if(Length.test(value)){

            setLength(true);
        }
        else{
            setLength(false);
        }
        

        
    }

    return(
        <div className="outer-box">
            <div className='box'>
                <label className='label'>{t('activatePass.title')} </label>
                <div className='input-box'>
                    <TextField 
                        type={passwordVisible ?"text": "password"}
                        id="password"
                        placeholder='********'
                        value={password}
                        className="password-input" 
                        onChange={(e)=>{
                            handleChange(e.target.value)
                            setPassword(e.target.value);
                            }} />
                        {passwordVisible?(
                            <span className="icon" onClick={()=>setPasswordVisible(false)}>
                                <Icon icon={basic_eye} size={25}/>
                            </span>
                        ):(
                            <span className="icon" onClick={()=>setPasswordVisible(true)}>
                                <Icon icon={basic_eye_closed} size={25}/>
                            </span>
                        )}
                </div>
                <main className="validation-tracker">
                    <div className={uppercase?'validated':'not-validated'}>
                    {t('activatePass.uppercase')}
                    </div>
                    <div className={lowercase?'validated':'not-validated'}>
                    {t('activatePass.lowercase')}
                    </div>
                    <div className={numeric?'validated':'not-validated'}>
                    {t('activatePass.numeric')}
                    </div>
                    <div className={specialsymbol?'validated':'not-validated'}>
                    {t('activatePass.symbol')}
                    </div>
                    <div className={length?'validated':'not-validated'}>
                    {t('activatePass.length')}
                    </div>
                    <Button 
                        onClick={handleSetPassword}
                        style={{ 
                        padding:'10px 60px',
                        borderRadius: '5px',
                        fontFamily: 'Arial, Helvetica, sans-serif',
                        fontSize:'16px'}}
                        className="activate-btn" 
                        >{t('activatePass.activateUserButton')}</Button>
                        <Snackbar open={successSnackbarOpen} 
                                    autoHideDuration={3000} 
                                    onClose={handleClose}
                                    anchorOrigin={{vertical: 'top', horizontal: 'center'}}>
                            <Alert onClose={handleClose} 
                                    severity="success" 
                                    sx={{ width: '200%' }}>
                                    {t('activatePass.successfulMessage')}                                  
                                    <a href="https://company-organization-software-coral.vercel.app">Click here to go to Login page.</a>
                            </Alert> 
                        </Snackbar>
                        <Snackbar open={errorSnackbarOpen} 
                                    autoHideDuration={3000} 
                                    onClose={handleClose}
                                    anchorOrigin={{vertical: 'top', horizontal: 'center'}}>
                            <Alert onClose={handleClose} severity="error" sx={{ width: '200%' }}>
                            {password.length === 0 ? t('snackbarErrors.emptyPassword') : t('snackbarErrors.criteriaNotMet')}
                            <span dangerouslySetInnerHTML={{ __html: t('snackbarErrors.tryAgainLink1') }} />
                            </Alert>
                        </Snackbar>
                </main>
            </div> 
        </div>
    );
};

export default SetPassword