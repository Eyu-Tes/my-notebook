import {useContext, useEffect, useState} from 'react'
import {Link as RouterLink} from 'react-router-dom'
import { 
    Avatar, 
    Button,
    CircularProgress,
    Container,
    Grid,
    Link,
    TextField,
    Typography
} from '@material-ui/core'
import {Alert} from '@material-ui/lab'
import {LockOutlined} from '@material-ui/icons'
import useStyles from '../../styles'
import {AuthContext} from '../../context/auth/AuthContext'

const Signup = ({history}) => {
    const {loading, authenticated, errMsg, signUp, processing} = useContext(AuthContext)

    const classes = useStyles()
    const initialValues = {
        displayName: '',
        email: '',
        firstName: '', 
        lastName: '',
        password: '',
        password2: '',
    }

    const [values, setValues] = useState(initialValues)
    const [errors, setErrors] = useState({})
    // To prevent displaying the err msgs that come from other form pages (e.g. Signin)
    const [submitted, setSubmitted] = useState(false)
    const {displayName, email, firstName, lastName, password, password2} = values

    useEffect(() => {
        if (authenticated)
            history.push('/')

        if (errMsg && submitted)
            setErrors(errMsg)

        // eslint-disable-next-line
    }, [errMsg, authenticated, history])

    const validate = () => {
        let valid = true
        const err = {}
        if (password !== password2) {
            valid = false
            err.password2 = "Passwords do not match"
        }
        if (password.length < 6) {
            valid = false
            err.password = "Password should be at least 6 characters"
            delete err.password2
        }
        setErrors(err)
        return valid
    }

    const onSubmit = e => {
        e.preventDefault()
        if (validate()) {
            const data = {displayName, email, firstName, lastName, password}
            setSubmitted(true)
            signUp(data)
        }
    }

    const onChange = e => {
        setValues({...values, [e.target.name]: e.target.value})
    }

    return (
        !loading && (
        <Container component="main" maxWidth="xs" className={classes.content}>
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlined/>
                </Avatar>
                <Typography component="h1" variant="h5" gutterBottom={true}>Sign up</Typography>
                {errors.nonField}
                <form onSubmit={onSubmit} className={classes.form} noValidate>
                    {errors.nonField && (
                        <Alert severity="error" className={classes.alert}>{errors.nonField}</Alert>
                    )}
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus
                                helperText={errors.email}
                                error={errors.email ? true : false}
                                value={email}
                                onChange={onChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="displayName"
                                label="User Name"
                                name="displayName"
                                autoComplete="displayName"
                                helperText={errors.displayName}
                                error={errors.displayName ? true : false}
                                value={displayName}
                                onChange={onChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="firstName"
                                label="First Name"
                                name="firstName"
                                autoComplete="firstName"
                                helperText={errors.firstName}
                                error={errors.firstName ? true : false}
                                onChange={onChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="lastName"
                                label="Last Name"
                                name="lastName"
                                autoComplete="lastName"
                                helperText={errors.lastName}
                                error={errors.lastName ? true : false}
                                onChange={onChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                helperText={errors.password}
                                error={errors.password ? true : false}
                                value={password}
                                onChange={onChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="password2"
                                label="Confirm Password"
                                type="password"
                                id="password2"
                                autoComplete="current-password"
                                helperText={errors.password2}
                                error={errors.password2 ? true : false}
                                value={password2}
                                onChange={onChange}
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        size="large"
                        color="primary"
                        className={classes.submit}
                        disabled={processing || 
                            !email || 
                            !displayName ||
                            !firstName ||
                            !lastName ||
                            !password ||
                            !password2}
                    >
                        Sign Up
                        {processing && <CircularProgress size={30} className={classes.progess} />}
                    </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link to="/signin" component={RouterLink}>
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
        )
        
    )
}

export default Signup
