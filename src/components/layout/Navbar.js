import {useContext, useState} from 'react'
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
import {AuthContext} from '../../context/auth/AuthContext'
import {LayoutContext} from '../../context/layout/LayoutContext'

const Navbar = () => {
    const {authenticated} = useContext(AuthContext)
    const {open, toggleDrawer} = useContext(LayoutContext)

    const classes = useStyles()

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
                className={clsx(classes.menuButton, open && classes.hide, !authenticated && classes.hide)}
            >
                <MenuIcon />
            </IconButton>
            <Typography variant="h5" noWrap>
                <Link to="/" className={classes.navLink}>my notebook</Link>
            </Typography>
          </Toolbar>
        </AppBar>

        <div className={classes.offset} />

        <Sidebar />  
      </>
    )
}

export default Navbar
