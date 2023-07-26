import { Button, TextField } from '@mui/material';
import React,{useState} from 'react';

const SetNewPassword = () =>{
    const [password,setPassword] = useState('');
    const [error,setError]=useState('');

    const handleSetNewPassword=()=>{
        const minLength=8;
        const maxLength=32;
        const upperCase=/[A-Z]/;
        const lowerCase=/[a-z]/;
        const specialSymbol=/[@$.!-+]/;
        const numeric=/\d/;

        if(password.length<minLength){
            setError('Password must be at least 8 characters long.');
        }
        else if(password.length>maxLength){
            setError('Password must be maximum 32 characters long.');
        }
        else if(!upperCase.test(password)||!lowerCase.test(password)){
            setError('Password must contain at least one upper case and one lowercase letter.');
        }
        else if(!specialSymbol.test(password)){
            setError('Password must contain at least one special character.');
        }
        else if(!numeric.test(password)){
            setError('Password must contain at least one number.');
        }
        else{
            setError('');
            console.log('Password is valid.');
        }
    }

    return(
        <form>
            <div>
            <h2>SET NEW PASSWORD </h2>
            <div>
                <label className="labelPassword" htmlFor="password"> Password:</label>
                <TextField 
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                    placeholder='********' />
            </div>
                <Button onClick={handleSetNewPassword}>Reset Password</Button>
                 {error && <p style={{color:'red'}}>{error}</p>}
            </div>
        </form>
        
    );
};

export default SetNewPassword