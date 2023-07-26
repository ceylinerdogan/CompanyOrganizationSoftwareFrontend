import { Button, TextField } from '@mui/material';
import React,{useState} from 'react';

const ActivateUser = () =>{
    const [email,setEmail] = useState('');

    const handleActivateUser =()=> {

    };

    return(
        <form>
            <div>
            <h2>ACTIVATE USER </h2>
            <label className="labelEmail" htmlFor="email"> Email:</label>
                <TextField 
                    type ="text" 
                    id="email"
                    value={email} 
                    onChange= {(e)=>setEmail(e.target.value)} 
                    placeholder ="Email" />
            </div>
            <Button onClick={handleActivateUser}>Send Activation Mail</Button>
        </form>
    );
};

export default ActivateUser