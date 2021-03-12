import {useContext, useState} from 'react'
import {
    Button, 
    Card, 
    CardActions, 
    CardContent,
    CircularProgress,
    Container,
    Divider,
    Grid,
    TextField,
    Typography
} from "@material-ui/core"
import { CloudUpload as CloudUploadIcon } from '@material-ui/icons'
import clsx from 'clsx'
import useStyles from '../../styles'

import {LayoutContext} from '../../context/layout/LayoutContext'

const Profile = () => {
    const {open} = useContext(LayoutContext)
    
    const classes = useStyles()
    const initialValues = {
        firstName: 'Eyoab', 
        lastName: 'Tesfaye', 
        email: 'eutesfaye10@gmail.com', 
        username: 'eyu', 
        phoneNumber: '+251932382766', 
        country: '', 
    }

    const [values, setValues] = useState(initialValues)
    const [profilePicture, setProfilePicture] = useState('')
    const [imageError, setImageError] = useState(false)
    const [buttonLoading, setButtonLoading] = useState(false)

    const {firstName, lastName, email, username, phoneNumber, country} = values
    
    const handleChange = e => {
        setValues({...values, [e.target.name]: e.target.value})
    }
    const profilePictureHandler = () => {
        console.log(profilePicture)
    }
    const handleImageChange = e => {
        setProfilePicture(e.target.files[0])
    }
    const updateFormValues = () => {
        console.log('Update Submitted')
    }
    
    return (
       <main className={clsx(classes.content, {[classes.contentShift]: open})}>
            <Container componenet="main" maxWidth="md" disableGutters={true}>
                <Card className={clsx(classes.root, classes)}>
                    <CardContent>
                        <Typography gutterBottom variant="h4">
                            {firstName} {lastName}
                        </Typography>
                        <Button
                            variant="outlined"
                            color="primary"
                            type="submit"
                            size="small"
                            startIcon={<CloudUploadIcon />}
                            className={classes.uploadButton}
                            onClick={profilePictureHandler}
                        >
                            Upload Photo
                        </Button>
                        <input type="file" onChange={handleImageChange} />

                        {imageError && (
                            <div className={classes.customError}>
                                {' '}
                                Wrong Image Format || Supported Format are PNG and JPG
                            </div>
                        )}
                    </CardContent>
                    <Divider />
                </Card>

                <br />
                <Card className={clsx(classes.root, classes)}>
                    <form autoComplete="off" noValidate>
                        <Divider />
                        <CardContent>
                            <Grid container spacing={3}>
                                <Grid item sm={6} xs={12}>
                                    <TextField
                                        fullWidth
                                        label="First name"
                                        margin="dense"
                                        name="firstName"
                                        variant="outlined"
                                        value={firstName}
                                        onChange={handleChange}
                                    />
                                </Grid>
                                <Grid item sm={6} xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Last name"
                                        margin="dense"
                                        name="lastName"
                                        variant="outlined"
                                        value={lastName}
                                        onChange={handleChange}
                                    />
                                </Grid>
                                <Grid item sm={6} xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Email"
                                        margin="dense"
                                        name="email"
                                        variant="outlined"
                                        disabled={true}
                                        value={email}
                                        onChange={handleChange}
                                    />
                                </Grid>
                                <Grid item sm={6} xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Phone Number"
                                        margin="dense"
                                        name="phone"
                                        variant="outlined"
                                        disabled={true}
                                        value={phoneNumber}
                                        onChange={handleChange}
                                    />
                                </Grid>
                                <Grid item sm={6} xs={12}>
                                    <TextField
                                        fullWidth
                                        label="User Name"
                                        margin="dense"
                                        name="userHandle"
                                        disabled={true}
                                        variant="outlined"
                                        value={username}
                                        onChange={handleChange}
                                    />
                                </Grid>
                                <Grid item sm={6} xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Country"
                                        margin="dense"
                                        name="country"
                                        variant="outlined"
                                        value={country}
                                        onChange={handleChange}
                                    />
                                </Grid>
                            </Grid>
                        </CardContent>
                        <Divider />
                        <CardActions />
                    </form>
                </Card>
                <br/>

                <Button
                    color="primary"
                    variant="contained"
                    type="submit"
                    onClick={updateFormValues}
                    disabled={
                        buttonLoading || 
                        !firstName || 
                        !lastName
                    }
                >
                    Save details
                    {buttonLoading && <CircularProgress size={25} className={classes.progess} />}
                </Button>
            </Container>
       </main>
    )
}

export default Profile
