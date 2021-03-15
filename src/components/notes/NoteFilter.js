import {useContext, useEffect, useState} from 'react'
import { Card, CardContent, Grid, TextField } from '@material-ui/core'
import useStyles from '../../styles'
import {NoteContext} from '../../context/note/NoteContext'

const NoteFilter = () => {
    const {filterNotes, clearFilter} = useContext(NoteContext)
    const [text, setText] = useState('')

    const classes = useStyles()

    const handleChange = e => {
        setText(e.target.value)
    }
    useEffect(() => {
        if (text.trim() !== '') filterNotes(text)
        else clearFilter()
    }, [text]) 
    
    return (
        <Grid container spacing={2} justify="flex-end">
            <Grid item xs={12} sm={6} lg={4}>
                <Card>
                    <CardContent className={classes.filterContainer}>
                        <TextField 
                            variant="outlined"
                            fullWidth
                            margin="dense"
                            placeholder="Filter Notes ..."
                            autoFocus 
                            value={text}
                            onChange={handleChange}
                            className={classes.textFieldNoBorder}
                        />
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    )
}

export default NoteFilter
