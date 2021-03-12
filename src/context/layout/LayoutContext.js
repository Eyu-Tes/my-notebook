import {createContext, useState} from 'react'

export const LayoutContext = createContext()

const LayoutContextProvider = ({children}) => {
    const [open, setOpen] = useState(false)
    const [uiLoading, setUiLoading] = useState(false)

    const toggleDrawer = () => setOpen(!open)

    return (
        <LayoutContext.Provider value={{
            open, 
            uiLoading, 
            toggleDrawer
        }}>
            {children}
        </LayoutContext.Provider>
    )
}

export default LayoutContextProvider
