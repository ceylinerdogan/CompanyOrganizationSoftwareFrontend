import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Login from './Login';
import ResetPassword from './ResetPassword';
import { Switch } from '@mui/material';

function App(){
  
  return (
      <div className="App">
          <h2>SIGN UP</h2>
          <Login>
            
          </Login>
          
      </div>
  );
      

 
}
export default App;
