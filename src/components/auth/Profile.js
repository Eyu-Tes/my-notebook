import {useContext, useEffect, useState} from 'react'
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

import {AuthContext} from '../../context/auth/AuthContext'
import {LayoutContext} from '../../context/layout/LayoutContext'

const Profile = () => {
    const {user, userInfo, updateAuthProfile, updateUserInfo} = useContext(AuthContext)
    const {open} = useContext(LayoutContext)
    
    const classes = useStyles()

    const [values, setValues] = useState({...user, ...userInfo})
    const [profilePicture, setProfilePicture] = useState('')
    const [imageError, setImageError] = useState(false)
    const [buttonLoading, setButtonLoading] = useState(false)

    const {uid, email, displayName, firstName, lastName, phone, country} = values
    
    useEffect(() => {
        setValues({...values, ...userInfo})
    }, [userInfo]) 

    const profilePictureHandler = () => {
        console.log('Photo Uploaded')
    }
    const handleImageChange = e => {
        setProfilePicture(e.target.files[0])
    }
    const updateFormValues = e => {
        e.preventDefault()
        if (user.displayName !== displayName) {
            updateAuthProfile(displayName)
        }
        if (
            (userInfo.firstName !== firstName) || 
            (userInfo.lastName !== lastName) || 
            (userInfo.phone !== phone) || 
            (userInfo.country !== country)
        ) {
            let data = {firstName, lastName, phone, country}
            Object.keys(data).forEach(i => data[i] === undefined && delete data[i])
            updateUserInfo(data)
        }
    }
    const handleChange = e => {
        setValues({...values, [e.target.name]: e.target.value})
    }
    
    return (
      userInfo && (
        <main className={clsx(classes.content, {[classes.contentShift]: open})}>
            <Container componenet="main" maxWidth="md" disableGutters={true}>
                <Card className={clsx(classes.root, classes)}>
                    <CardContent>
                        <Typography gutterBottom variant="h4">
                            {userInfo.firstName} {' '} {userInfo.lastName}
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
                <form onSubmit={updateFormValues} autoComplete="off" noValidate>
                    <Card className={clsx(classes.root, classes)}>
                        <Divider />
                        <CardContent>
                            <Grid container spacing={3}>
                                <Grid item sm={6} xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Email"
                                        margin="dense"
                                        name="email"
                                        variant="outlined"
                                        disabled={true}
                                        value={email}
                                        // onChange={handleChange}
                                    />
                                </Grid>
                                <Grid item sm={6} xs={12}>
                                    <TextField
                                        fullWidth
                                        label="User Name"
                                        margin="dense"
                                        name="displayName"
                                        variant="outlined"
                                        value={displayName}
                                        onChange={handleChange}
                                    />
                                </Grid>
                                <Grid item sm={6} xs={12}>
                                    <TextField
                                        fullWidth
                                        label="First name"
                                        margin="dense"
                                        name="firstName"
                                        variant="outlined"
                                        value={firstName || ''}
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
                                        value={lastName || ''}
                                        onChange={handleChange}
                                    />
                                </Grid>
                                <Grid item sm={6} xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Phone Number"
                                        margin="dense"
                                        name="phone"
                                        autoComplete="phone"
                                        variant="outlined"
                                        value={phone || ''}
                                        onChange={handleChange}
                                    />
                                </Grid>
                                <Grid item sm={6} xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Country"
                                        margin="dense"
                                        name="country"
                                        autoComplete="country"
                                        variant="outlined"
                                        value={country || ''}
                                        onChange={handleChange}
                                    />
                                </Grid>
                            </Grid>
                        </CardContent>
                        <Divider />
                        <CardActions />
                    </Card>
                    <br/>
                    <Button
                        color="primary"
                        variant="contained"
                        type="submit"
                        disabled={
                            buttonLoading || 
                            !displayName ||
                            !firstName ||
                            !lastName
                        }
                    >
                        Save details
                        {buttonLoading && 
                            <CircularProgress size={25} className={classes.progess} />
                        }
                    </Button>
                </form>
            </Container>
        </main>
      )
    )
}

export default Profile
