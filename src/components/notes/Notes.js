import {useContext} from 'react'
import {Grid, IconButton} from '@material-ui/core'
import {AddCircle as AddCircleIcon} from '@material-ui/icons'
import NoteFilter from './NoteFilter'
import NoteItem from './NoteItem'
import NoteView from './NoteView'
import NoteForm from './NoteForm'
import NoteDeleteConfirm from './NoteDeleteConfirm'
import useStyles from '../../styles'

import {NoteContext} from '../../context/note/NoteContext'  
import {LayoutContext} from '../../context/layout/LayoutContext'
import clsx from 'clsx'

const Notes = () => {
    const {open} = useContext(LayoutContext)

    const {
        notes, 
        filtered,
        formOpened, 
        detailOpened, 
        confirmOpened,
        handleFormOpen
    } = useContext(NoteContext)

    const classes = useStyles()

    return (
        <main className={clsx(classes.content, {[classes.contentShift]: open})}>   

            <NoteFilter />

            <Grid container spacing={2}>
                {
                    filtered ?
                    filtered.map(note => <NoteItem key={note.id} note={note} />) :
                    notes.map(note => <NoteItem key={note.id} note={note} />) 
                }
            </Grid>

            { formOpened && <NoteForm /> }

            { confirmOpened && <NoteDeleteConfirm /> }

            { detailOpened && <NoteView /> }

            <IconButton
                className={classes.floatingButton}
                color="primary"
                aria-label="New Note"
                onClick={() => handleFormOpen()}
            >
                <AddCircleIcon style={{ fontSize: 60 }} />
            </IconButton>
        </main>
    )
}

export default Notes
