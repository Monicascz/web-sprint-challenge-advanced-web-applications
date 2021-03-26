import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Login from "./components/Login";
import PrivateRoute from './components/PrivateRoute'
import BubblePage from './components/BubblePage'
import {axiosWithAuth} from './helpers/axiosWithAuth'

import "./styles.scss";

function App() {

  const logout = () => {
    localStorage.removeItem('token');
    window.location.href = '/';
  
  }

  return (
    <Router>
      <div className="App">
        <header>
          Color Picker Sprint Challenge
          <a data-testid="logoutButton" href="/" onClick={logout}>logout</a>
        </header> 
        <Switch>
          <Route path="/bubbles" component={BubblePage}/>
          <PrivateRoute path='/bubbles' component={BubblePage}></PrivateRoute>
          <Route exact path="/" component={Login} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;

//Task List:
//1. Render BubblePage as a PrivateRoute
//2. Build the logout button to remove the localStorage Item.