import {createContext, useState} from 'react'

export const AuthContext = createContext()

const AuthContextProvider = ({children}) => {
    const [authenticated, setAuthenticated] = useState(true)

    const logoutUser = () => setAuthenticated(false)

    return (
        <AuthContext.Provider value={{
            authenticated,
            logoutUser
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider
