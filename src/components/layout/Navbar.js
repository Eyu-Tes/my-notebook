import {useState} from 'react'
import {Link} from 'react-router-dom'
import { 
    AppBar, 
    IconButton,
    Toolbar, 
    Typography
} from '@material-ui/core'
import {Menu as MenuIcon} from '@material-ui/icons'
import clsx from 'clsx'
import Sidebar from '../layout/Sidebar'
import useStyles from '../../styles'


const Navbar = (props) => {
    const classes = useStyles()
    const {isAuthenticated, logoutUser, open, toggleDrawer} = props

    return (
      <>
        <AppBar
          position="fixed"
          className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
          })}
        >
          <Toolbar>
            <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={toggleDrawer}
                edge="start"
                className={clsx(classes.menuButton, open && classes.hide, !isAuthenticated && classes.hide)}
            >
                <MenuIcon />
            </IconButton>
            <Typography variant="h5" noWrap>
                <Link to="/" className={classes.navLink}>my notebook</Link>
            </Typography>
          </Toolbar>
        </AppBar>
        <div className={classes.offset} />
        <Sidebar 
            open={open} 
            logoutUser={logoutUser}
            toggleDrawer={toggleDrawer}
        />  
      </>
    )
}

export default Navbar
