import {useContext} from 'react'
import {Link as RouterLink} from 'react-router-dom'
import {
    Avatar, 
    Divider, 
    Drawer, 
    IconButton,
    Link,
    List, 
    ListItem, 
    ListItemIcon, 
    ListItemText, 
    Menu as MenuIcon 
} from '@material-ui/core'
import {
    AccountBox as AccountBoxIcon, 
    ChevronLeft as ChevronLeftIcon, 
    ChevronRight as ChevronRightIcon, 
    ExitToApp as ExitToAppIcon, 
    Notes as NotesIcon
} from '@material-ui/icons'
import {useTheme} from '@material-ui/core/styles'
import useStyles from '../../styles'
import {AuthContext} from '../../context/auth/AuthContext'
import {LayoutContext} from '../../context/layout/LayoutContext'

const Sidebar = () => {
    const {logoutUser} = useContext(AuthContext)
    const {open, toggleDrawer} = useContext(LayoutContext)

    const classes = useStyles()
    const theme = useTheme()
    const {firstName, lastName, profilePicture} = {firstName: 'Eyoab', lastName: 'Tesfaye'}
    
    const onLogout = () => {
        toggleDrawer()
        logoutUser()
    }

    return (
        <Drawer
            className={classes.drawer}
            variant="persistent"
            anchor="left"
            open={open}
            classes={{
            paper: classes.drawerPaper,
            }}
        >
            <div className={classes.drawerHeader}>
                <IconButton onClick={toggleDrawer}>
                    {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                </IconButton>
            </div>
            <div className={classes.toolbar} />
            <center>
                <Avatar src={profilePicture} className={classes.sidebarAvatar} />
                <h2 className={classes.title}> {' '} {firstName} {lastName} </h2>
            </center>
            <Divider />
            <List>
                <Link 
                    to="/" 
                    component={RouterLink} 
                    color="textPrimary" 
                    underline="none"
                >
                    <ListItem button key="Todo">
                        <ListItemIcon>
                            {' '} <NotesIcon /> {' '}
                        </ListItemIcon>
                        <ListItemText>Todo</ListItemText>
                    </ListItem>
                </Link>
                <Link 
                    to="/profile" 
                    component={RouterLink} 
                    color="textPrimary" 
                    underline="none"
                    >
                    <ListItem button key="Account">
                        <ListItemIcon>
                            {' '} <AccountBoxIcon /> {' '}
                        </ListItemIcon>
                        <ListItemText>Account</ListItemText>
                    </ListItem>
                </Link>
                <ListItem button key="Logout" onClick={onLogout}>
                    <ListItemIcon>
                        {' '} <ExitToAppIcon /> {' '}
                    </ListItemIcon>
                    <ListItemText primary="Logout" />
                </ListItem>
            </List>
        </Drawer>
    )
}

export default Sidebar
