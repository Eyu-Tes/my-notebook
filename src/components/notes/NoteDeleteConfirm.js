import {useContext, forwardRef} from 'react'
import {
    Button,
    Dialog,
    DialogActions,
    DialogTitle,
    DialogContent,
    IconButton,
    Slide,
    Typography
} from '@material-ui/core'
import {Close as CloseIcon, Warning as WarningIcon} from '@material-ui/icons'
import useStyles from '../../styles'
import {NoteContext} from '../../context/note/NoteContext'

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />
})

const NoteDeleteConfirm = () => {
    const {
        current: {id, title}, 
        deleteNote, 
        clearCurrentNote, 
        confirmOpened: open, 
        handleConfirmClose: onClose
    } = useContext(NoteContext)
    
    const classes = useStyles()

    const handleOk = () => {
        deleteNote(id)
        clearCurrentNote()
        onClose()
    }

    return (
        <Dialog
            disableBackdropClick
            disableEscapeKeyDown
            maxWidth="xs"
            onClose={onClose}
            open={open}
            aria-labelledby="customized-dialog-title"
            TransitionComponent={Transition}
        >
            <DialogTitle id="customized-dialog-title">
                <span className={classes.deleteTitle}>
                    <WarningIcon style={{marginRight: '10px'}}/>
                    <span>Confirm note delete</span>
                </span>
            </DialogTitle>
            <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                <CloseIcon className={classes.warningIcon}/>
            </IconButton>
            <DialogContent>
                <Typography variant="h6"> Are you sure you want to delete <b>{title}</b></Typography>
            </DialogContent>
            <br/>
            <DialogActions>
                <Button color="primary" onClick={onClose}>Cancel</Button>
                <Button onClick={handleOk} variant="contained" color="secondary">Ok</Button>
            </DialogActions>
        </Dialog>
    )
} 

export default NoteDeleteConfirm
