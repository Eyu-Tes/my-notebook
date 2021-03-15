import {useContext, useState} from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import { CssBaseline } from '@material-ui/core'

import Navbar from './components/layout/Navbar'
import Home from './components/pages/Home'
import Signin from './components/auth/Signin'
import Signup from './components/auth/Signup'
import Profile from './components/auth/Profile'
import PrivateRoute from './components/routing/PrivateRoute'
import useStyles from './styles'

import AuthContextProvider from './context/auth/AuthContext'
import NoteContextProvider from './context/note/NoteContext'
import LayoutContextProvider from './context/layout/LayoutContext'

const App = () => {
  const classes = useStyles()

  return (
    <LayoutContextProvider>
      <AuthContextProvider>
        <NoteContextProvider>
          <CssBaseline/>
          <Router>
            <Navbar />
            <Switch>
              <PrivateRoute 
                exact 
                path="/" 
                component={Home} 
              />
              <Route exact path="/signup" component={Signup}/>
              <Route exact path="/signin" component={Signin}/>
              <PrivateRoute 
                exact 
                path="/profile" 
                component={Profile}
              />
            </Switch>
          </Router>
        </NoteContextProvider>
      </AuthContextProvider>
    </LayoutContextProvider>
  )
}

export default App
