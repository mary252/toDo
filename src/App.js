import React from 'react';
import logo from './logo.svg';
import './App.css';
import ToDo from "./contaners/ToDo"
import {
  Route,
  BrowserRouter as Router,
  Switch,
  withRouter,
  Redirect
} from "react-router-dom";

function App() {
  return (
    <Router basename={'/'}>
      <Route path={"/"} exact component={ToDo}/>
    </Router>
  );
}

export default App;
