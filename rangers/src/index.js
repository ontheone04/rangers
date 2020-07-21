import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import BaseLayout from './components/BaseLayout';
import Figinfo from './components/Figinfo';
import Collection from './components/Collection';
import Login from './components/Login'
import 'bootstrap/dist/css/bootstrap.min.css';
import Registration from './components/Registration'
ReactDOM.render(
  
  <React.StrictMode>
   <BrowserRouter>
    <BaseLayout>
    <Switch>
      <Route exact path = '/' component = {App}/>
      <Route path = '/figinfo/:id' component = {Figinfo}/>
      <Route path = '/login' component = {Login}/>
      <Route path = '/collection' component = {Collection}/>
      <Route path = '/registration' component = {Registration}/>
      <Route path = '/search/:search' component = {App}/>
      </Switch>
      </BaseLayout>
   </BrowserRouter>
    
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
