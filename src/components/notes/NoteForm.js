import { useState, useContext, forwardRef } from 'react'
import {
    AppBar,
    Button,
    Container,
    Dialog,
    IconButton,
    Grid, 
    List,
    Slide,
    TextField,
    Toolbar,
    Typography
} from '@material-ui/core'
import {Close as CloseIcon} from '@material-ui/icons'
import useStyles from '../../styles'
import {NoteContext} from '../../context/note/NoteContext'

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />
})

const NoteForm = () => {
    const {
        current, 
        formOpened: open, 
        handleFormClose: onClose, 
        clearCurrentNote, 
        createNote, 
        updateNote, 
    } = useContext(NoteContext)

    const classes = useStyles()
    const initialNote = {
        title: '', 
        body: ''
    }
    const [note, setNote] = useState(current || initialNote)
    const [errors, setErrors] = useState({})
    const {title, body} = note

    const validate = () => {
        let valid = true
        const err = {}
        if (title === '') {
            valid = false
            err.title = "Title cannot be empty"
        }     
        if (body === '') {
            valid = false
            err.body = "Body cannot be empty"
        }
        setErrors(err)
        return valid
    }

    const handleSubmit = e => {
        e.preventDefault()
        if (validate()) {
            !current ? createNote(note) : updateNote(note)
            clearCurrentNote()
            onClose()
        }
    }

    const handleChange = e => {
        setNote({...note, [e.target.name]: e.target.value})
    }

    return (
        <Dialog fullScreen open={open} onClose={onClose} TransitionComponent={Transition}>
            <AppBar className={classes.modalAppBar}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" onClick={onClose} aria-label="close">
                        <CloseIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.modalTitle}>
                        {current ? 'Edit your note' : 'Create a new note'}
                    </Typography>
                    <Button
                        autoFocus
                        color="inherit"
                        onClick={handleSubmit}
                    >
                        {current ? 'Save' : 'Submit'}
                    </Button>
                </Toolbar>
            </AppBar>
            <List>
                <Container component="main">
                    <form onSubmit={handleSubmit} className={classes.form} noValidate>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="noteTitle"
                                    label="Note Title"
                                    name="title"
                                    autoComplete="noteTitle"
                                    autoFocus
                                    helperText={errors.title}
                                    error={errors.title ? true : false}
                                    value={title}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="noteDetails"
                                    label="Note Details"
                                    name="body"
                                    autoComplete="noteDetails"
                                    multiline
                                    rows={20}
                                    rowsMax={25}
                                    helperText={errors.body}
                                    error={errors.body ? true : false}
                                    value={body}
                                    onChange={handleChange}
                                />
                            </Grid>
                        </Grid>
                    </form>
                </Container>
            </List>
      </Dialog>
    )
}

export default NoteForm
