import { Button, TextField } from '@mui/material';
import React,{useState} from 'react';
import "./ResetPassword.css"
import axios from "axios";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

const ResetPassword = () =>{
    const [email,setEmail] = useState('');
    const [successSnackbarOpen, setSuccessSnackbarOpen] = useState(false);
    const [errorSnackbarOpen, setErrorSnackbarOpen] = useState(false);

    const handleResetPassword =()=> {
        const resetData={
            email: email,
        }
        
        axios.post("https://delta-internship.eu-west-1.elasticbeanstalk.com/api/auth/reset-password",null,{params: {email}}).then(Response=>{
            console.log(Response.data);
            setSuccessSnackbarOpen(true);
        })
        .catch(Error=>{
            console.error("Error password reset:",Error);
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

    return(
        <div className='wrapperReset'>
            <div className='box-reset'>
                <form>
                    <h2 className='reset-pass'>Forgot Password </h2>
                    <div>
                        <div>
                        <label className="labelEmailReset" htmlFor="email"> Email Adress</label>
                            <TextField 
                                type ="text" 
                                id="email"
                                value={email} 
                                onChange= {(e)=>setEmail(e.target.value)} 
                                placeholder ="Email" 
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
                                >Send forgot password mail</Button>
                                <Snackbar open={successSnackbarOpen} 
                                    autoHideDuration={3000} 
                                    onClose={handleClose}
                                    anchorOrigin={{vertical: 'top', horizontal: 'center'}}>
                            <Alert onClose={handleClose} severity="success" sx={{ width: '200%' }}>
                                Reset password mail sent succesfully!
                            </Alert>
                        </Snackbar>
                        <Snackbar open={errorSnackbarOpen} 
                                    autoHideDuration={3000} 
                                    onClose={handleClose}
                                    anchorOrigin={{vertical: 'top', horizontal: 'center'}}>
                            <Alert onClose={handleClose} severity="error" sx={{ width: '200%' }}>
                                Error sending mail. Please try again.
                            </Alert>
                        </Snackbar>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ResetPassword