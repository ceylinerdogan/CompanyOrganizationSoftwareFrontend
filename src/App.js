import React from 'react';
import {Routes, Route} from 'react-router-dom';
import Login from './Login';
import ResetPassword from './ResetPassword';
import ActivateUser from './ActivateUser';


function App(){
  
  return (
      <div className="App">
        <Routes>
          <Route path="/" element={<Login/>} />
          <Route path="resetpassword" element={<ResetPassword/>} />
          <Route path="activateuser" element={<ActivateUser/>} />
        </Routes>  
      </div>
  );
}
export default App;
