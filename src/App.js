import {useState} from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import { CircularProgress, CssBaseline } from '@material-ui/core'
import clsx from 'clsx'
import Navbar from './components/layout/Navbar'
import Home from './components/pages/Home'
import Signin from './components/auth/Signin'
import Signup from './components/auth/Signup'
import Profile from './components/auth/Profile'
import PrivateRoute from './components/routing/PrivateRoute'
import useStyles from './styles'

const App = () => {
  const classes = useStyles()
  const [open, setOpen] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(true)
  const [uiLoading, setUiLoading] = useState(false)

  const logoutUser = () => setIsAuthenticated(false)
  const toggleDrawer = () => setOpen(!open)

  return (
    uiLoading ? (
    <CircularProgress size={100} className={classes.uiProgess} />
    ):(
    <main
      className={clsx(classes.content, {[classes.contentShift]: open})}
    >
      <CssBaseline/>
      <Router>
        <Navbar 
          open={open} 
          isAuthenticated={isAuthenticated}
          logoutUser={logoutUser}
          toggleDrawer={toggleDrawer}
        />
        <Switch>
          <PrivateRoute 
            exact 
            path="/" 
            component={Home} 
            open={open} 
            isAuthenticated={isAuthenticated}
          />
          <Route exact path="/signup" component={Signup}/>
          <Route exact path="/signin" component={Signin}/>
          <PrivateRoute 
            exact 
            path="/profile" 
            component={Profile}
            isAuthenticated={isAuthenticated}
          />
        </Switch>
      </Router>
    </main>
    )
  )
}

export default App
