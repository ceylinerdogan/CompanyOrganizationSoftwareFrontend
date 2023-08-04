import { Button, TextField } from '@mui/material';
import React,{useState} from 'react';
import "./ResetPassword.css"

const ResetPassword = () =>{
    const [email,setEmail] = useState('');

    const handleResetPassword =()=> {

    };

    return(
        <div className='wrapperReset'>
            <div className='box-reset'>
                <form>
                    <h2 className='reset-pass'>Reset </h2>
                    <div>
                        <div>
                        <label className="labelEmailReset" htmlFor="email"> Email Adress</label>
                            <TextField 
                                type ="text" 
                                id="email"
                                value={email} 
                                onChange= {(e)=>setEmail(e.target.value)} 
                                placeholder ="Email" 
                                className='emailInput'/>
                        </div>
                            <Button 
                                className='ResetPass-btn'
                                onClick={handleResetPassword}
                                style={{
                                padding:'10px 101px',
                                borderRadius: '5px',
                                top:'25px',
                                fontFamily: 'Arial, Helvetica, sans-serif',
                                }}
                                >Send forgot password mail</Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ResetPassword