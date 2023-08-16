import { Button, TextField } from '@mui/material';
import React,{useState} from 'react';
import "./ActivateUser.css"
import axios from "axios";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';


const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });


const ActivateUser = () =>{
    const [email,setEmail] = useState('');
    const [successSnackbarOpen, setSuccessSnackbarOpen] = useState(false);
    const [errorSnackbarOpen, setErrorSnackbarOpen] = useState(false);

    const handleActivateUser =()=> {
        const activateData={
            email: email,
        }
        
        axios.post("https://delta-internship.eu-west-1.elasticbeanstalk.com/api/auth/activate-account",null,{params: {email}}).then(Response=>{
            console.log(Response.data);
            setSuccessSnackbarOpen(true);
        })
        .catch(Error=>{
            console.error("Error activating user:",Error);
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
        <div className='wrapper'>
            <div className='box-activate'>
                <form>
                    <h2 className='activate-user'>Activate User </h2>
                    <div>
                    <label className="label-Email" htmlFor="email"> Email Address</label>
                        <TextField 
                            type ="text" 
                            id="email"
                            value={email} 
                            onChange= {(e)=>setEmail(e.target.value)} 
                            placeholder ="Email" 
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
                        >Send Activation Mail</Button>
                        <Snackbar open={successSnackbarOpen} 
                                    autoHideDuration={3000} 
                                    onClose={handleClose}
                                    anchorOrigin={{vertical: 'top', horizontal: 'center'}}>
                            <Alert onClose={handleClose} severity="success" sx={{ width: '200%' }}>
                                Activation mail sent succesfully!
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
                </form>
            </div>
        </div>
            
        
    );
};

export default ActivateUser