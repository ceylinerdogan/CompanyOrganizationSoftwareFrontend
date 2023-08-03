import React from 'react';
import {Routes, Route} from 'react-router-dom';
import Login from './Login';
import ResetPassword from './ResetPassword';
import ActivateUser from './ActivateUser';
import SetNewPassword from './SetNewPassword';
import SetPassword from './SetPassword';
import "./App.css"

function App(){
  
  return (

      <div className="App">
          <Routes>
          <Route path="/" element={<Login/>} />
          <Route path="resetpassword" element={<ResetPassword/>} />
          <Route path="activateuser" element={<ActivateUser/>} />
          <Route path="setpassword" element={<SetPassword/>} />
          <Route path="setnewpassword" element={<SetNewPassword/>} />
        </Routes>   
      </div>
  );
}
export default App;
