import React, { useEffect, useState } from "react";
import {axiosWithAuth} from '../helpers/axiosWithAuth'
import {useHistory} from 'react-router-dom'

const Login = () => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const [formVal, setFormVal] = useState({
    username: '',
    password: ''
  })
  const [error, setError] = useState("Username or Password not valid.")
  const history = useHistory();

  const handleChanges = (e) => {
    setFormVal({...formVal, [e.target.name]:e.target.value})
  }

  const handleSubmit = (e) =>{
    e.preventDefault();

    axiosWithAuth()
    .post('/login', formVal)
    .then((resp)=>{
      // console.log(resp.data.payload)
      localStorage.setItem("token", resp.data.payload)
      history.push('/bubbles')
    })
    .catch((err)=>{
      console.log("Error:", err.response)
    })

  }

  useEffect(()=>{
    // make a post request to retrieve a token from the api
    // when you have handled the token, navigate to the BubblePage route
  });
  

  //I chose to put error in as state above. 
  // const error = "Username or Password not valid.";
  // //replace with error state

  return (
    <div>
      <h1>Welcome to the Bubble App!</h1>
      <div data-testid="loginForm" className="login-form">
        <form onSubmit={handleSubmit}>
          
          
          <input
          data-testid="username"
          placeholder="username"
          type="text"
          name="username"
          value={formVal.username}
          onChange={handleChanges}></input>

          <input
          data-testid="password"
          placeholder="password"
          type="text"
          name="password"
          value={formVal.password}
          onChange={handleChanges}></input>
          <button > Login </button>
          {formVal.username === "Lambda School" && formVal.password === "i<3Lambd4" ? null : <p data-testid="errorMessage" className="error">{error} </p>}
          
        </form>
      </div>
    </div>
  );
};

export default Login;

//Task List:
//1. Build a form containing a username and password field.
//2. Add whatever state nessiary for form functioning.
//3. MAKE SURE YOUR USERNAME AND PASSWORD INPUTS INCLUDE data-testid="username" and data-testid="password"
//4. If either the username or password is not entered, display the following words with the p tag provided: Username or Password not valid.
//5. If the username / password is equal to Lambda School / i<3Lambd4, save that token to localStorage.