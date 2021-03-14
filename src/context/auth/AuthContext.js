import {createContext, useEffect, useState} from 'react'
import {auth, firestore} from '../../config/firebase'

export const AuthContext = createContext()

const usersRef = firestore.collection('users')

const AuthContextProvider = ({children}) => {
    const [loading, setLoading] = useState(true)
    const [authenticated, setAuthenticated] = useState(false)
    const [user, setUser] = useState(null)
    const [userInfo, setUserInfo] = useState(null)
    const [errMsg, setErrMsg] = useState(null)

    const loadUser = async () => {
        try {
            setLoading(true)
            await auth.onAuthStateChanged(user => {
                if (user) {
                    setUser(user)
                    setAuthenticated(true)
                }
                setLoading(false)
            })
        } catch (err) {
            console.log(err)
        }
    }

    const getUserInfo = async () => {
        try {
            const doc = await usersRef.doc(user.uid).get()
            setUserInfo(doc.data())
        } catch (err) {
            console.log(err)
        }
    }

    const signUp = async (credential) => {
        const {displayName, email, firstName, lastName, password} = credential
        try {
            const res = await auth.createUserWithEmailAndPassword(email, password)
            await auth.currentUser.updateProfile({displayName})
            // create a user in 'users' collection using the id from current auth user
            await usersRef.doc(res.user.uid).set({firstName, lastName})
            loadUser()
        } catch (err) {
            console.log(err)
            switch(err.code) {
                case 'auth/invalid-email':
                case 'auth/email-already-in-use':
                    setErrMsg({email: err.message})
                    break
                default:
                    break
            }
        }
    }

    const signIn = async (email, pwd) => {
        try {
            const res = await auth.signInWithEmailAndPassword(email, pwd)
            loadUser()
        } catch (err) {
            console.log(err)
            switch(err.code) {
                case 'auth/invalid-email':
                    setErrMsg({email: err.message})
                    break
                case 'auth/wrong-password':
                    setErrMsg({password: err.message})
                    break
                default: 
                    break
            }
        }
    } 

    const signOut = async () => {
        try {
            await auth.signOut()
            setAuthenticated(false)
            setUser(null)
            setUserInfo(null)
        } catch (err) {
            console.log(err)
        }
    }

    const updateAuthProfile = async (displayName) => {
        try {
            await auth.currentUser.updateProfile({displayName})
            loadUser()
        } catch (err) {
            console.log(err)
        }
    }

    const updateUserInfo = async (info) => {
        try {
            await usersRef.doc(user.uid).update(info)
            getUserInfo()
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        loadUser()

        if(user) {
            getUserInfo()
        }
    }, [user])

    return (
        <AuthContext.Provider value={{
            authenticated,
            user, 
            userInfo,
            errMsg,
            loading,
            loadUser,
            signUp,
            signIn,
            signOut, 
            updateAuthProfile,
            updateUserInfo
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider
