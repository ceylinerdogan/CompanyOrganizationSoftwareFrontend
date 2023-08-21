import React from 'react';
import {Routes, Route} from 'react-router-dom';
import Login from './Login';
import ResetPassword from './ResetPassword';
import ActivateUser from './ActivateUser';
import SetNewPassword from './SetNewPassword';
import SetPassword from './SetPassword';
import "./App.css"
import i18n from './i18n';
import { I18nextProvider } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';

function App(){
  
  return (
    <I18nextProvider i18n={i18n}>
        <div className="App">
          <LanguageSwitcher/>
            <Routes>
              <Route path="/" element={<Login/>} />
              <Route path="resetpassword" element={<ResetPassword/>} />
              <Route path="activateuser" element={<ActivateUser/>} />
              <Route path="setpassword" element={<SetPassword/>} />
              <Route path="setnewpassword" element={<SetNewPassword/>} />
            </Routes>   
      </div>
    </I18nextProvider>
      
  );
}
export default App;
