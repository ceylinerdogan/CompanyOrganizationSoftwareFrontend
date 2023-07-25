import { Button, TextField } from '@mui/material';
import React,{useState} from 'react';

const ActivateUser = () =>{
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');

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
            <div>
                <label className="labelPassword" htmlFor="password"> Password:</label>
                <TextField 
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e)=>setEmail(e.target.value)}
                    placeholder='********' />

            </div>
            <div>
                <label className="labelPassword" htmlFor="password"> Password again:</label>
                <TextField 
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e)=>setEmail(e.target.value)}
                    placeholder='********' />
            </div>
                <Button onClick={handleActivateUser}>Activate User</Button>
            </div>
        </form>
        
    );
};

export default ActivateUser