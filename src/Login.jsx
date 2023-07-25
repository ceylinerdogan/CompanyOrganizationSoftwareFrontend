import { Button, TextField } from '@mui/material';
import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';


const Login = () => {
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const navigate = useNavigate();
    
    const handleSubmit = (e) => {
    e.preventDefault();
    };

    function handleClick(event){
        navigate('/resetpassword');
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
            <Button className="signInbtn" onClick={handleSubmit} type="submit">Sign In</Button>
            <Button type="rstPassbtn" onSubmit={handleClick}>Forgot Password?</Button>
        </form>
    );
};

export default Login;
    