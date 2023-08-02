import { Button, TextField } from '@mui/material';
import React,{useState} from 'react';
import "./ActivateUser.css"

const ActivateUser = () =>{
    const [email,setEmail] = useState('');

    const handleActivateUser =()=> {

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
                        style={{ backgroundColor: '#034900',
                        color:'WhiteSmoke',
                        padding:'5px 100px',
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