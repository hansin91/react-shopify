import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.scss';
import { Navbar } from './components'
import { HomePage, Collection } from './pages'

function App() {
  return (
    <Router>
      <Navbar/>
      <div style={{ paddingTop: '55px'}}>
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route path="/collections/:title">
            <Collection />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
