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

const Signin = (props) => {
    const {loading, authenticated, errMsg, signIn, processing} = useContext(AuthContext)

    const classes = useStyles()
    const initialValues = {
        email: '', 
        password: '', 
    }

    const [values, setValues] = useState(initialValues)
    const [errors, setErrors] = useState({})
    // To prevent displaying the err msgs that come from other form pages (e.g. Signup)
    const [submitted, setSubmitted] = useState(false)
    const {email, password} = values

    useEffect(() => {
        if (authenticated) props.history.push('/')

        if (errMsg && submitted) setErrors(errMsg)

        // eslint-disable-next-line
    }, [errMsg, authenticated, props.history])

    const onSubmit = e => {
        e.preventDefault()
        setSubmitted(true)
        signIn(email, password)
    }

    const onChange = e => {
        setValues({...values, [e.target.name]: e.target.value})
    }

    return (
        loading ? null : (
        <Container component="main" maxWidth="xs" className={classes.content}>
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlined/>
                </Avatar>
                <Typography component="h1" variant="h5" gutterBottom={true}>Sign in</Typography>
                <form onSubmit={onSubmit} className={classes.form} noValidate>
                    {errors.nonField && (
                        <Alert severity="error" className={classes.alert}>{errors.nonField}</Alert>
                    )}
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
                    <TextField
                        variant="outlined"
                        margin="normal"
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
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        size="large"
                        color="primary"
                        className={classes.submit}
                        disabled={processing || !email || !password}
                    >
                        Sign In
                        {processing && <CircularProgress size={30} className={classes.progess} />}
                    </Button>
                    <Grid container>
                        <Grid item>
                            <Link to="/signup" component={RouterLink}>
                                {"Don't have an account? Sign up"}
                            </Link>
                        </Grid>
                    </Grid>
                    {errors.general && (
                        <Typography variant="body2" className={classes.customError}>
                            {errors.general}
                        </Typography>
                    )}
                </form>
            </div>
        </Container>
        )
    )
}

export default Signin
