import { Button, TextField } from '@mui/material';
import React,{useState} from 'react';
import {basic_eye} from 'react-icons-kit/linea/basic_eye'
import {basic_eye_closed} from 'react-icons-kit/linea/basic_eye_closed'
import Icon from 'react-icons-kit';
import "./SetPassword.css"
import axios from "axios";
import { useLocation } from 'react-router-dom';

const SetPassword = () =>{
    const [password,setPassword] = useState("password");
    const[uppercase,setUpperCase]=useState(false);
    const[lowercase,setLowerCase]=useState(false);
    const[numeric,setNumeric]=useState(false);
    const[specialsymbol,setSpecialSymbol]=useState(false);
    const[length,setLength]=useState(false);

    const location=useLocation();
    const code= new URLSearchParams(location.search).get('code')
    const handleSetPassword=()=>{
        const setpass={
            password:password,
            code: code,
        }
        console.log(setpass);
        axios.post("https://delta-internship.eu-west-1.elasticbeanstalk.com/api/auth/confirm-activate-account",null,{params:{code,password}}).then(Response=>{
            console.log(Response.data);
            alert("Password set!");
        })
        .catch(Error=>{
            console.error("Error setting password:",Error);
            alert("Error setting password. Please try again.");
        })
    };
    

    const handleChange=(value)=>{
        const Length=new RegExp('^(?=.{8,32}$)');

        const upperCase= new RegExp('(?=.*[A-Z])');

        const lowerCase=new RegExp('(?=.*[a-z])');

        const specialSymbol=new RegExp('(?=.*[@$.!+-])');

        const Numeric=new RegExp('(?=.*[0-9])');

        if(lowerCase.test(value)){

            setLowerCase(true);
        }
        else{
            setLowerCase(false);
        }

        if(upperCase.test(value)){

            setUpperCase(true);
        }
        else{
            setUpperCase(false);
        }

        if(Numeric.test(value)){

            setNumeric(true);
        }
        else{
            setNumeric(false);
        }
        
        if(specialSymbol.test(value)){

            setSpecialSymbol(true);
        }
        else{
            setSpecialSymbol(false);
        }

        if(Length.test(value)){

            setLength(true);
        }
        else{
            setLength(false);
        }
        

        
    }

    return(
        <div className="outer-box">
            <div className='box'>
                <label className='label'>Activate Account </label>
                <div className='input-box'>
                    <TextField 
                        type={password}
                        id="password"
                        placeholder='********'
                        className="password-input" 
                        onChange={(e)=>handleChange(e.target.value)} />
                        {password==="password"?(
                            <span className="icon" onClick={()=>setPassword("text")}>
                                <Icon icon={basic_eye_closed} size={25}/>
                            </span>
                        ):(
                            <span className="icon" onClick={()=>setPassword("password")}>
                                <Icon icon={basic_eye} size={25}/>
                            </span>
                        )}
                </div>
                <main className="validation-tracker">
                    <div className={uppercase?'validated':'not-validated'}>
                        At least one uppercase character
                    </div>
                    <div className={lowercase?'validated':'not-validated'}>
                        At least one lowercase character
                    </div>
                    <div className={numeric?'validated':'not-validated'}>
                        At least one numeric character
                    </div>
                    <div className={specialsymbol?'validated':'not-validated'}>
                        At least one special symbol among @$.!-+
                    </div>
                    <div className={length?'validated':'not-validated'}>
                        Length should be between 8 and 32
                    </div>
                    <Button 
                        onClick={handleSetPassword}
                        style={{ 
                        padding:'10px 60px',
                        borderRadius: '5px',
                        fontFamily: 'Arial, Helvetica, sans-serif',
                        fontSize:'16px'}}
                        className="activate-btn" 
                        >Activate Account</Button>
                </main>
            </div> 
        </div>
    );
};

export default SetPassword