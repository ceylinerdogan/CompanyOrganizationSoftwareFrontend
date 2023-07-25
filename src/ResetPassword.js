import { Button, TextField } from '@mui/material';
import React,{useState} from 'react';

const ResetPassword = () =>{
    const [email,setEmail] = useState('');

    const handleResetPassword =()=> {

    };

    return(
        <form>
            <div>
            <h2>RESET PASSWORD </h2>
            <div>
                <label className="labelEmail" htmlFor="email"> Email:</label>
                <TextField 
                    type ="text" 
                    id="email"
                    value={email} 
                    onChange= {(e)=>setEmail(e.target.value)} 
                    placeholder ="Email" />
            </div>
                
                <Button onClick={handleResetPassword}>Reset Password</Button>
            </div>
        </form>
        
    );
};

export default ResetPassword