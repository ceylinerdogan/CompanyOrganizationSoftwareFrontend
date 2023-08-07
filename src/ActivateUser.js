import { Button, TextField } from '@mui/material';
import React,{useState} from 'react';
import "./ActivateUser.css"
import axios from "axios";

const ActivateUser = () =>{
    const [email,setEmail] = useState('');

    const handleActivateUser =()=> {
        const activateData={
            email: email,
        }
        
        axios.post("https://delta-internship.eu-west-1.elasticbeanstalk.com/api/auth/activate-account",null,{params: {email}}).then(Response=>{
            console.log(Response.data);
            alert("Activation mail sent succesfully!");
        })
        .catch(Error=>{
            console.error("Error activating user:",Error);
            alert("Error sending mail. Please try again.");
        })
    };

    return(
        <div className='wrapper'>
            <div className='box-activate'>
                <form>
                    <h2 className='activate-user'>Activate User </h2>
                    <div>
                    <label className="label-Email" htmlFor="email"> Email Address</label>
                        <TextField 
                            type ="text" 
                            id="email"
                            value={email} 
                            onChange= {(e)=>setEmail(e.target.value)} 
                            placeholder ="Email" 
                            className='email-input'/>
                    </div>
                    <Button 
                        className='activation-btn' 
                        onClick={handleActivateUser}
                        style={{
                        padding:'10px 100px',
                        borderRadius: '5px',
                        fontFamily: 'Arial, Helvetica, sans-serif',
                        }}
                        >Send Activation Mail</Button>
                </form>
            </div>
        </div>
            
        
    );
};

export default ActivateUser