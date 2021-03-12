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

const Signup = () => {
    const classes = useStyles()

    const initialValues = {
        firstName: '',
        lastName: '',
        phoneNumber: '',
        country: '',
        username: '',
        email: '',
        password: '',
        password2: '',
        errors: {},
        loading: false
    }

    const [values, setValues] = useState(initialValues)

    const {
        firstName, lastName, phoneNumber, country, username, email, password, password2, errors, loading
    } = values

    const onChange = e => {
        setValues({...values, [e.target.name]: e.target.value})
    }

    const onSubmit = e => {
        e.preventDefault()
        // setValues(initialValues)
        const newUserData = {
            firstName, lastName, phoneNumber, country, username, email, password, password2, errors, loading
        }
        console.log(newUserData)
        console.log('sign up submitted')
    }

    return (
        <Container component="main" maxWidth="xs" className={classes.content}>
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlined/>
                </Avatar>
                <Typography component="h1" variant="h5" gutterBottom={true}>Sign up</Typography>
                <form onSubmit={onSubmit} className={classes.form} noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="firstName"
                                label="First Name"
                                name="firstName"
                                autoComplete="firstName"
                                autoFocus
                                helperText={errors.firstName}
                                error={errors.firstName ? true : false}
                                value={firstName}
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
                                value={lastName}
                                onChange={onChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
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
                                id="username"
                                label="User Name"
                                name="username"
                                autoComplete="username"
                                helperText={errors.username}
                                error={errors.username ? true : false}
                                value={username}
                                onChange={onChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="phoneNumber"
                                label="Phone Number"
                                name="phoneNumber"
                                autoComplete="phoneNumber"
                                pattern="[7-9]{1}[0-9]{9}"
                                helperText={errors.phoneNumber}
                                error={errors.phoneNumber ? true : false}
                                value={phoneNumber}
                                onChange={onChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="country"
                                label="Country"
                                name="country"
                                autoComplete="country"
                                helperText={errors.country}
                                error={errors.country ? true : false}
                                value={country}
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
                                value={password2}
                                onChange={onChange}
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        disabled={loading || 
                            !firstName ||
                            !lastName ||
                            !username ||
                            !phoneNumber ||
                            !email || 
                            !country ||
                            !password ||
                            !password2}
                    >
                        Sign Up
                        {loading && <CircularProgress size={30} className={classes.progess} />}
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
}

export default Signup
