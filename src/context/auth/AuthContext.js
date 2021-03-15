import {createContext, useEffect, useState} from 'react'
import {auth, firestore, storage} from '../../config/firebase'

export const AuthContext = createContext()

const usersRef = firestore.collection('users')

const AuthContextProvider = ({children}) => {
    const [loading, setLoading] = useState(true)
    const [authenticated, setAuthenticated] = useState(false)
    const [user, setUser] = useState(null)
    const [userInfo, setUserInfo] = useState(null)
    const [profilePic, setProfilePic] = useState('')
    const [errMsg, setErrMsg] = useState(null)
    const [processing, setProcessing] = useState(false)

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

    const getProfilePicture = async () => {
        try {
            const storageRef = storage.ref(`${user.photoURL}`)
            const imgUrl = await storageRef.getDownloadURL()
            setProfilePic(imgUrl)
        } catch (err) {
            console.log(err)
        }
    }

    const signUp = async (credential) => {
        setProcessing(true)
        const {displayName, email, firstName, lastName, password} = credential
        try {
            const res = await auth.createUserWithEmailAndPassword(email, password)
            await auth.currentUser.updateProfile({displayName})
            // create a user in 'users' collection using the id from current auth user
            await usersRef.doc(res.user.uid).set({firstName, lastName})
            loadUser()
            setProcessing(false)
        } catch (err) {
            console.log(err)
            switch(err.code) {
                case 'auth/invalid-email':
                case 'auth/email-already-in-use':
                    setErrMsg({email: err.message})
                    break
                case 'auth/network-request-failed':
                    setErrMsg({nonField: 'Unable to connect'})
                    break
                default:
                    break
            }
            setProcessing(false)
        }
    }

    const signIn = async (email, pwd) => {
        setProcessing(true)
        try {
            const res = await auth.signInWithEmailAndPassword(email, pwd)
            loadUser()
            setProcessing(false)
        } catch (err) {
            console.log(err)
            switch(err.code) {
                case 'auth/invalid-email':
                    setErrMsg({email: err.message})
                    break
                case 'auth/wrong-password':
                    setErrMsg({password: err.message})
                    break
                case 'auth/user-not-found':
                    setErrMsg({nonField: 'User not found'})
                    break
                case 'auth/network-request-failed':
                    setErrMsg({nonField: 'Unable to connect'})
                    break
                default: 
                    break
            }
            setProcessing(false)
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

    const updateEmail = async (email) => {
        setProcessing(true)
        try {
            await auth.currentUser.updateEmail(email)
            loadUser()
            setProcessing(false)
            setErrMsg(null)
        } catch (err) {
            console.log(err)
            switch(err.code) {
                case 'auth/invalid-email':
                    setErrMsg({email: err.message})
                    break
                case 'auth/requires-recent-login':
                    setErrMsg({nonField: err.message})
                    break
                case 'auth/email-already-in-use':
                    setErrMsg({email: err.message})
                    break
                default: 
                    break
            }
            setProcessing(false)
        }
    }

    const updateAuthProfile = async (displayName) => {
        setProcessing(true)
        try {
            await auth.currentUser.updateProfile({displayName})
            loadUser()
            setProcessing(false)
        } catch (err) {
            console.log(err)
            setProcessing(false)
        }
    }

    const updateUserInfo = async (info) => {
        setProcessing(true)
        try {
            await usersRef.doc(user.uid).update(info)
            getUserInfo()
            setProcessing(false)
        } catch (err) {
            console.log(err)
            setProcessing(false)
        }
    }

    const uploadImage = async (img) => {
        setProcessing(true)
        try {
            const patt = /[^.]+$/
            const ext = img.name.match(patt)[0].toLowerCase()
            const imgName = `profile.${ext}`
            const path = `users/${user.uid}/${imgName}`
            const storageRef = storage.ref(path)
            await storageRef.put(img)
            await auth.currentUser.updateProfile({photoURL: path})
            loadUser()
            getProfilePicture()
            setProcessing(false)
        } catch (err) {
            console.log(err)
            setProcessing(false)
        }
    }

    useEffect(() => {
        loadUser()

        if (user) {
            getUserInfo()
            getProfilePicture()
        }

    }, [user])

    return (
        <AuthContext.Provider value={{
            authenticated,
            user, 
            userInfo,
            profilePic,
            errMsg,
            loading,
            processing,
            loadUser,
            signUp,
            signIn,
            signOut, 
            updateEmail,
            updateAuthProfile,
            updateUserInfo, 
            uploadImage
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider
