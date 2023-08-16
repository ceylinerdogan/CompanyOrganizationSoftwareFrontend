import { Button, TextField } from '@mui/material';
import React,{useState} from 'react';
import {basic_eye} from 'react-icons-kit/linea/basic_eye'
import {basic_eye_closed} from 'react-icons-kit/linea/basic_eye_closed'
import Icon from 'react-icons-kit';
import "./SetNewPassword.css"
import axios from "axios";
import { useLocation } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useNavigate } from 'react-router-dom';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

const SetNewPassword = () =>{
    const [newPassword,setNewPassword] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const[uppercase,setUpperCase]=useState(false);
    const[lowercase,setLowerCase]=useState(false);
    const[numeric,setNumeric]=useState(false);
    const[specialsymbol,setSpecialSymbol]=useState(false);
    const[length,setLength]=useState(false);
    const [successSnackbarOpen, setSuccessSnackbarOpen] = useState(false);
    const [errorSnackbarOpen, setErrorSnackbarOpen] = useState(false);
    const navigate1 = useNavigate();
    const navigate2 = useNavigate();

    const location1=useLocation();
    const code= new URLSearchParams(location1.search).get('code')
    const handleSetNewPassword=()=>{
        const setpass={
            password:newPassword,
            code: code,
        }
        axios.post("https://delta-internship.eu-west-1.elasticbeanstalk.com/api/auth/confirm-reset-password",null,{params:{code,newPassword}})
        .then(Response=>{
            console.log(Response.data);
            setSuccessSnackbarOpen(true);
        })
        .catch(Error=>{
            console.error("Error setting password:",Error);
            setErrorSnackbarOpen(true);

        })
        
    };

    const handleSnackbarButtonClickSet=()=>{
        navigate1('/');
    }
    const handleSnackbarButtonClickError=()=>{
        navigate2('/resetpassword');
    }
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
        <div className='outerBox'>
            <div className='box-newPass'>
                <h2 className='resetPass'>Reset Password </h2>
                <div className='inputBox'>
                    <TextField 
                        type={passwordVisible ?"text": "password"}
                        id="password"
                        placeholder='********'
                        className="password-input-reset" 
                        value={newPassword}
                        onChange={(e)=>{
                            handleChange(e.target.value);
                            setNewPassword(e.target.value);
                        }}/>
                         {passwordVisible?(
                            <span className="iconSetNew" onClick={()=>setPasswordVisible(false)}>
                                <Icon icon={basic_eye} size={25}/>
                            </span>
                        ):(
                            <span className="iconSetNew" onClick={()=>setPasswordVisible(true)}>
                                <Icon icon={basic_eye_closed} size={25}/>
                            </span>
                        )}  
                
                </div>
                <main className="validation-tracker">
                    <div className={uppercase?'validated':'not-validated'}>
                        At least one uppercase character
                    </div>
                    <div className={lowercase?'validated':'not-validated'}>
                        At least one lowercase character
                    </div>
                    <div className={numeric?'validated':'not-validated'}>
                        At least one numeric character
                    </div>
                    <div className={specialsymbol?'validated':'not-validated'}>
                        At least one special symbol among @$.!-+
                    </div>
                    <div className={length?'validated':'not-validated'}>
                        Length should be between 8 and 32
                    </div>
                    <Button
                        onClick={handleSetNewPassword}
                        style={{
                        padding:'10px 60px',
                        borderRadius: '5px',
                        fontFamily: 'Arial, Helvetica, sans-serif',
                        fontSize:'16px'}} 
                        className="reset-pass-btn"
                        >Reset Password</Button>
                        <Snackbar open={successSnackbarOpen} 
                                    autoHideDuration={3000} 
                                    onClose={handleClose}
                                    anchorOrigin={{vertical: 'top', horizontal: 'center'}}>
                            <Alert onClose={handleClose} 
                                    severity="success" 
                                    sx={{ width: '200%' }}>
                                    Password set!                                    
                                    <Button color='inherit' size='small' onClick={handleSnackbarButtonClickSet}>
                                        Click here to go to Login page!
                                    </Button>
                            </Alert>
                        </Snackbar>
                        <Snackbar open={errorSnackbarOpen} 
                                    autoHideDuration={3000} 
                                    onClose={handleClose}
                                    anchorOrigin={{vertical: 'top', horizontal: 'center'}}>
                            <Alert onClose={handleClose} severity="error" sx={{ width: '200%' }}>
                                Error setting password. Please try again. 
                                <Button color='inherit' size='small' onClick={handleSnackbarButtonClickError}>
                                        Click here to try again!
                                </Button>
                                {/* <a href="https://company-organization-software-coral.vercel.app/resetpassword">Click here to try again.</a> */}
                            </Alert>
                        </Snackbar>
                </main>
            </div>
        </div>
    );
};

export default SetNewPassword