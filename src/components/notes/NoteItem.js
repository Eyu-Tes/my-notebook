import {useContext} from 'react'
import {
    Button,
    Card,
    CardActions,
    CardContent,
    Grid, 
    Typography
} from '@material-ui/core'
import ReactTimeAgo from 'react-time-ago'
import useStyles from '../../styles'
import {NoteContext} from '../../context/note/NoteContext'

const NoteItem = ({note: {id, title, body, createdAt}}) => {
    const {
        handleFormOpen: openForm, 
        handleDetailOpen: openDetail, 
        handleConfirmOpen: openDelete
    } = useContext(NoteContext)

    const classes = useStyles()
    
    return (
        <Grid item xs={12} sm={6} lg={4}>
            <Card variant="outlined">
                <CardContent>
                    <Typography variant="h5" component="h2">
                        {title}
                    </Typography>
                    <Typography className={classes.pos} color="textSecondary">
                        {/* toDate(): Convert a Timestamp to a JavaScript Date object */}
                        <ReactTimeAgo date={createdAt.toDate()} />
                    </Typography>
                    <Typography variant="body2" component="p">
                        {`${body.substring(0, 65)}`}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small" color="primary" onClick={() => openDetail(id)}>
                        View
                    </Button>
                    <Button size="small" color="primary" onClick={() => openForm(id)}>
                        Edit
                    </Button>
                    <Button size="small" color="primary" onClick={() => openDelete(id)}>
                        Delete
                    </Button>
                </CardActions>
            </Card>
        </Grid>
    )
}

export default NoteItem