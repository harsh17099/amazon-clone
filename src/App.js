
import React,{ useEffect } from 'react';
import './App.css';
import './Header.js';
import Header from './Header.js';
import Home from './Home.js';
    // to add another webpage we have to run npm install reaact-router-dom and then import the following
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Checkout from './Checkout';
import Orders from './Orders';
import Login from './Login';
import { auth } from './firebase';
import { useStateValue } from "./StateProvider";
import Payment from './Payment.js';
    // imports to add stripe functions
import {loadStripe} from "@stripe/stripe-js";
import {Elements} from "@stripe/react-stripe-js";


const promise = loadStripe('pk_test_51IeDiXSCjIwtZNt0ugZE5dI3JTy8DR3iJrt7mFct4QX08F5uw6bkCmSliCfTX0Hqoy6HgWpVh0qQEfYWCXHDjxul00uEEmoPRN');


function App() {

  

  const [{}, dispatch] = useStateValue();

  useEffect(() => {
    //will only run once when the app component loads
    auth.onAuthStateChanged(authUser =>{
      console.log('THE USER IS>>>', authUser);

      if (authUser){
        //the user just logged in or the user was logged in
        dispatch({
          type: 'SET_USER',
          user: authUser
        })
      }
      else{
        // the user was logged out
        dispatch({
          type: 'SET_USER',
          user: null
        })
      }
    })
  }, [])

  return (
    //BEM
    <Router>
    <div className="App">
      
      <Switch>
      <Route path="/login"> 
          
          <Login/>
       </Route>
       <Route path="/orders"> 
          <Header/>
           <Orders/>
        </Route>
        <Route path="/checkout"> 
          <Header/>
           <Checkout/>
        </Route>
        <Route path="/payment"> 
          <Header/>
          <Elements stripe={promise}>
            <Payment/>
          </Elements>
       </Route>
        <Route path="/"> {/*this is the deafault path, we will be redirected here if not found other page */}
          <Header/>
          <Home/>
        </Route>
      </Switch>
     
    </div>
    </Router>
  );
}

export default App;
