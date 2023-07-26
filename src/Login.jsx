import { Button, TextField } from '@mui/material';
import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';


const Login = () => {
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const navigate1 = useNavigate();
    const navigate2 = useNavigate();
    const navigate3 = useNavigate();
    const navigate4 = useNavigate();
    
    const handleSubmit = (e) => {
    e.preventDefault();
    };

    function handleClickResetPass(event){
        navigate1('/resetpassword');
    }

    function handleClickActivateUser(event){
        navigate2('/activateuser');
    }

    function handleClicksSetPass(event){
        navigate3('/setpassword');
    }

    function handleClickSetNewPass(event){
        navigate4('/setnewpassword');
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
                <label className="labelPass" htmlFor="password">Password:</label>
                <TextField
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="********"
                />
            </div>
            
            <div>
                <Button className="signInbtn" onSubmit={handleSubmit} type="submit">Sign In</Button>
            </div>
            <div>
                <Button type="forgotPassbtn" onClick={handleClickResetPass}>Forgot Password?</Button>
            </div>
            <div>
                <Button type="activateAccbtn" onClick={handleClickActivateUser}>Activate Account</Button>
            </div>
            <div>
                <Button type="rstPassbtn" onClick={handleClicksSetPass}>setpassdeneme</Button>
            </div>
            <div>
                <Button type="activatebtn" onClick={handleClickSetNewPass}>setnewpass</Button>
            </div>
            
        </form>
    );
};

export default Login;
    