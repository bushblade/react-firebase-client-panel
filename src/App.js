import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store'
import { UserIsAuthenticated, UserIsNotAuthenticated } from './helpers/auth'

import './App.css'

import AppNavbar from './components/layouts/AppNavbar'
import Dashboard from './components/layouts/Dashboard'
import AddClient from './components/clients/AddClient'
import EditClient from './components/clients/EditClient'
import ClientDetails from './components/clients/ClientDetails'
import Login from './components/auth/Login'
import Settings from './components/settings/Settings'

const routes = [
  {
    path: '/',
    component: UserIsAuthenticated(Dashboard)
  },
  {
    path: '/client/add',
    component: UserIsAuthenticated(AddClient)
  },
  {
    path: '/client/:id',
    component: UserIsAuthenticated(ClientDetails)
  },
  {
    path: '/client/edit/:id',
    component: UserIsAuthenticated(EditClient)
  },
  {
    path: '/login',
    component: UserIsNotAuthenticated(Login)
  },
  {
    path: '/settings',
    component: UserIsAuthenticated(Settings)
  }
]

const App = () => (
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

export default App
