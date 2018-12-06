import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import './App.css'

import AppNavbar from './components/layouts/AppNavbar'
import Dashboard from './components/layouts/Dashboard'

const routes = [
  {
    path: '/',
    component: Dashboard
  }
]

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <AppNavbar />
          <div className="container">
            <Switch>
              {routes.map(({ path, component }) => (
                <Route exact path={path} component={component} key={`link-key-${path}`} />
              ))}
            </Switch>
          </div>
        </div>
      </Router>
    )
  }
}

export default App
