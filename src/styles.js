import {fade, makeStyles} from '@material-ui/core/styles'

const drawerWidth = 240

const useStyles = makeStyles((theme) => ({
    // App
    content: {
        flexGrow: 1,
        padding: theme.spacing(1.5),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        [theme.breakpoints.up('md')]: {
            marginLeft: drawerWidth,
        }
    },
    uiProgress: {
        position: 'fixed',
        zIndex: '1000',
        left: '45%',
        top: '35%'
    },
    // Notes
    pos: {
		marginBottom: 12
	},
    floatingButton: {
		position: 'fixed',
		bottom: 0,
		right: 0
	},
    dialogStyle: {
        [theme.breakpoints.up('md')]: {
            maxWidth: '50%'
        }
	},
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
    modalAppBar: {
        position: 'relative',
    },
    modalTitle: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
    deleteTitle: {
        color: theme.palette.error.main, 
        display: 'flex',
        alignItems: 'center'
    },
    // Notes Filter
    filterContainer: {
        "&:last-child": {
          paddingBottom: theme.spacing(2)
        }
    },
    textFieldNoBorder: {
        [`& fieldset`]: {
          borderRadius: 0,
        },
    },
    // Sign In, Sign Up, Profile
    paper: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center', 
        margin: theme.spacing(3, 0),
	}, 
    avatar: {
		backgroundColor: theme.palette.secondary.main, 
        marginBottom: theme.spacing(1.5)
	},
    form: {
		width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(2.5)
	},
	submit: {
		margin: theme.spacing(3, 0, 2)
	},
    customError: {
		color: theme.palette.error.main,
		fontSize: '0.8rem',
		marginTop: 10
	},
	progess: {
		position: 'absolute'
	},
    uploadButton: {
		marginLeft: '0',
		margin: theme.spacing(1)
	},
    // Navbar
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
      },
    appBarShift: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        [theme.breakpoints.up('md')]: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth,
        }
    },
    navLink: {
        color: '#fff',
        textDecoration: 'none'
    }, 
    menuButton: {
        marginRight: theme.spacing(2)
    },
    hide: {
        display: 'none',
    },
    offset: theme.mixins.toolbar,
    // Sidebar
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    }, 
    sidebarAvatar: {
        height: 110,
        width: 110,
        flexShrink: 0,
        flexGrow: 0,
        margin: (0)
    },
    title: {
        margin: theme.spacing(3, 1)
    },
    // alert
    alert: {
        margin: theme.spacing(0, 0, 2.5)
    }
}))

export default useStyles
