import { Button, TextField } from '@mui/material';
import React,{useState} from 'react';
import "./ResetPassword.css"
import axios from "axios";


const ResetPassword = () =>{
    const [email,setEmail] = useState('');

    const handleResetPassword =()=> {
        const activateData={
            email: email,
        }
        
        axios.post("https://delta-internship.eu-west-1.elasticbeanstalk.com//api/auth/reset-password",null,{params: {email}}).then(Response=>{
            console.log(Response.data);
            alert("Reset password mail sent succesfully!");
        })
        .catch(Error=>{
            console.error("Error reset password:",Error);
            alert("Error sending mail. Please try again.");
        })
    };

    return(
        <div className='wrapperReset'>
            <div className='box-reset'>
                <form>
                    <h2 className='reset-pass'>Forgot Password </h2>
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