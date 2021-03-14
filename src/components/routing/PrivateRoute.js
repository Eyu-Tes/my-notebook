import {useContext} from 'react'
import {Route, Redirect} from 'react-router-dom' 
import AuthContextProvider, {AuthContext} from '../../context/auth/AuthContext'

const PrivateRoute = ({component: Component, ...rest}) => {
    const {authenticated, loading} = useContext(AuthContext)

    return (
        loading ? null : (
            <Route {...rest} render={props => (
                authenticated ? <Component {...props} {...rest} /> : <Redirect to="/signin"/>
            )} />
        )
    )
}

export default PrivateRoute
