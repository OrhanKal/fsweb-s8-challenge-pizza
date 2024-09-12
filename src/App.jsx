import { useState } from 'react'
import reactLogo from './assets/react.svg'
import workintech from '/workintech.svg'
import './App.css'
import Form from "./components/Form.jsx"
import { Route, Switch } from 'react-router-dom'
import Home from './components/Home.jsx'
import Success from './components/Success.jsx'

function App() {

  return (
    <>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/form">
          <Form />
        </Route>
        <Route path="/success">
          <Success />
        </Route>
      </Switch>
    </>
  )
}

export default App
