import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store'

import './App.css'

import AppNavbar from './components/layouts/AppNavbar'
import Dashboard from './components/layouts/Dashboard'
import AddClient from './components/clients/AddClient'
import ClientDetails from './components/clients/ClientDetails'

const routes = [
  {
    path: '/',
    component: Dashboard
  },
  {
    path: '/client/add',
    component: AddClient
  },
  {
    path: '/client/:id',
    component: ClientDetails
  }
]

class App extends Component {
  render() {
    return (
      <Provider store={store}>
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
      </Provider>
    )
  }
}

export default App
