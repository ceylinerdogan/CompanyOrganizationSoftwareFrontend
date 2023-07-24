import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Login from './Login';
import ResetPassword from './ResetPassword';
import { Switch } from '@mui/material';

function App(){
  
  return(
      <Router>
        <Switch>
          <Route exact path = "/login" component={Login} />
          <Route exact path = "/reset-password" component={ResetPassword} />
        </Switch>
      </Router>

  )
}
export default App;
