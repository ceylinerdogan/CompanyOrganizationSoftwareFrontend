import { Label } from '@mui/icons-material';
import { Button, Input, TextField } from '@mui/material';
import React, {useState} from 'react';


const Login = () => {
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');

    const handleSubmit = (e) => {
    e.preventDefault();
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="email">Email:</label>
                <TextField 
                    type="text"
                    id="email"
                    value={email}
                    onChange={(e)=> setEmail(e.target.value)}
                    placeholder="Email"
                />
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <TextField
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="********"
                />
            </div>
            <Button className="signInbtn" onClick={handleSubmit} type="submit">Sign In</Button>
            <Button className="rstPass" onClick={handleSubmit} type="resetPass" TextLink to ="/resetpassword">Reset Password </Button>
            
        </form>
    );
};

export default Login;
    