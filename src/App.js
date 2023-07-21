import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Login from './Login';

function App(){
  return(
      <div className="App">
        <Route exact path="/login">
            <Login />

        </Route>

      </div>

  )
}
export default App;
