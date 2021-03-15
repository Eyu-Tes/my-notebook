import {useContext, forwardRef} from 'react'
import {
    Dialog,
    DialogTitle,
    DialogContent,
    IconButton,
    Slide,
    TextField
} from '@material-ui/core'
import {Close as CloseIcon} from '@material-ui/icons'
import useStyles from '../../styles'
import {NoteContext} from '../../context/note/NoteContext'

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />
})

const NoteView = () => {
    const {
        current: {title, body}, 
        detailOpened: open,
        handleDetailClose: onClose
    } = useContext(NoteContext)

    const classes = useStyles()
    
    return (
        <Dialog
            onClose={onClose}
            aria-labelledby="customized-dialog-title"
            open={open}
            fullWidth
            classes={{ paperFullWidth: classes.dialogStyle }}
            TransitionComponent={Transition}
        >
            <DialogTitle id="customized-dialog-title">
                {title}
            </DialogTitle>
            <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                <CloseIcon />
            </IconButton>
            <DialogContent dividers>
                <TextField
                    fullWidth
                    id="noteDetails"
                    name="body"
                    multiline
                    readOnly
                    rows={1}
                    rowsMax={25}
                    value={body}
                    InputProps={{
                        disableUnderline: true
                    }}
                />
            </DialogContent>
        </Dialog>
    )
} 

export default NoteView
