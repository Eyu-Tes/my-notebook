import {useState} from 'react'
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
import {LockOutlined} from '@material-ui/icons'
import useStyles from '../../styles'

const Signin = () => {
    const classes = useStyles()

    const initialValues = {
        email: '', 
        password: '', 
        errors: {}, 
        loading: false
    }

    const [values, setValues] = useState(initialValues)

    const {email, password, errors, loading} = values

    const onChange = e => {
        setValues({...values, [e.target.name]: e.target.value})
    }

    const onSubmit = e => {
        e.preventDefault()
        // setValues(initialValues)
        const userData = {email, password}
        console.log(userData)
        console.log('sign in submitted')
    }

    return (
        <Container component="main" maxWidth="xs">
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlined/>
                </Avatar>
                <Typography component="h1" variant="h5" gutterBottom={true}>Sign in</Typography>
                <form className={classes.form} noValidate>
                    <TextField
                        variant="outlined"
                        margin="normal"
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
                        color="primary"
                        className={classes.submit}
                        onClick={onSubmit}
                        disabled={loading || !email || !password}
                    >
                        Sign In
                        {loading && <CircularProgress size={30} className={classes.progess} />}
                    </Button>
                    <Grid container>
                        <Grid item>
                            <Link to="/signup" component={RouterLink}>
                                {"Don't have an account? Sign Up"}
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
}

export default Signin
