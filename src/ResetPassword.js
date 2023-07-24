import { Button } from '@mui/material';
import React,{useState} from 'react';

const ResetPassword = () =>{
    const [email,setEmail] = useState('');

    const handleResetPassword =()=> {

    };

    return(
        <div>
            <h2>Reset Password </h2>
            <input type ="email" value={email} onChange= {(e)=>setEmail(e.target.value)} placeholder ="Email" />
            <Button onClick={handleResetPassword}>Reset Password</Button>
        </div>
    );
};

export default ResetPassword