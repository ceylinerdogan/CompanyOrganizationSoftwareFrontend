import { Button, TextField } from '@mui/material';
import React,{useState} from 'react';
import {basic_eye} from 'react-icons-kit/linea/basic_eye'
import {basic_eye_closed} from 'react-icons-kit/linea/basic_eye_closed'
import Icon from 'react-icons-kit';
import "./index.css"


const SetPassword = () =>{
    const [type,setType] = useState("password");
    const[uppercase,setUpperCase]=useState(false);
    const[lowercase,setLowerCase]=useState(false);
    const[numeric,setNumeric]=useState(false);
    const[specialsymbol,setSpecialSymbol]=useState(false);
    const[length,setLength]=useState(false);
    

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
        <form>
            <h2>SET PASSWORD </h2>
            <div>
                <TextField 
                    type={type}
                    id="password"
                    placeholder='********'
                    className="password-input" 
                    onChange={(e)=>handleChange(e.target.value)} />
                    {type==="password"?(
                        <span className="icon-span" onClick={()=>setType("text")}>
                            <Icon icon={basic_eye_closed} size={25}/>
                        </span>
                    ):(
                        <span className="icon-span" onClick={()=>setType("password")}>
                            <Icon icon={basic_eye} size={25}/>
                        </span>
                    )}
            </div>
            <main className="validation-tracker">
                <div className={uppercase?'validated':'not-validated'}>
                    Must have at least one uppercase character
                </div>
                <div className={lowercase?'validated':'not-validated'}>
                    Must have at least one lowercase character
                </div>
                <div className={numeric?'validated':'not-validated'}>
                    Must have at least one numeric character
                </div>
                <div className={specialsymbol?'validated':'not-validated'}>
                    Must have at least one special symbol among @$.!-+
                </div>
                <div className={length?'validated':'not-validated'}>
                    Password length should be between 8 and 32
                </div>
            </main>

                <Button >Activate Account</Button>
        </form>
        
    );
};

export default SetPassword