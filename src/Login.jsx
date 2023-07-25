import { Button, TextField } from '@mui/material';
import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';


const Login = () => {
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const navigate1 = useNavigate();
    const navigate2 = useNavigate();
    
    const handleSubmit = (e) => {
    e.preventDefault();
    };

    function handleClickResetPass(event){
        navigate1('/resetpassword');
    }
    function handleClickActivateUser(event){
        navigate2('/activateuser');
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2>SIGN IN</h2>
            <div>
                <label className="labelEmail" htmlFor="email">Email:</label>
                <TextField 
                    type="text"
                    id="email"
                    value={email}
                    onChange={(e)=> setEmail(e.target.value)}
                    placeholder="Email"
                />
            </div>
            <div>
                <label className="labelPass" htmlFor="password">Password</label>
                <TextField
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="********"
                />
            </div>
            <Button className="signInbtn" onSubmit={handleSubmit} type="submit">Sign In</Button>
            <Button type="rstPassbtn" onClick={handleClickResetPass}>Forgot Password?</Button>
            <Button type="activateUserbtn" onClick={handleClickActivateUser}>Activate User</Button>
        </form>
    );
};

export default Login;
    