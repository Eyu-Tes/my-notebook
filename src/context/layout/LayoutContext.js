import {createContext, useState} from 'react'
import { createMuiTheme, ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles'

export const LayoutContext = createContext()

const theme = createMuiTheme({
	palette: {
		primary: {
			main: '#33c9dc',
		}, 
        secondary: {
			main: '#33c9dc',
		}
	}
})

const LayoutContextProvider = ({children}) => {
    const [open, setOpen] = useState(false)
    const [uiLoading, setUiLoading] = useState(false)

    const toggleDrawer = () => setOpen(!open)

    return (
        <MuiThemeProvider theme={theme}>
            <LayoutContext.Provider value={{
                open, 
                uiLoading, 
                toggleDrawer
            }}>
                {children}
            </LayoutContext.Provider>
        </MuiThemeProvider>
    )
}

export default LayoutContextProvider
