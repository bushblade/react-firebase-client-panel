import React, { Component } from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import AppNavbar from './components/layouts/AppNavbar'

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <AppNavbar />
          <h1>Hello</h1>
        </div>
      </Router>
    )
  }
}

export default App
