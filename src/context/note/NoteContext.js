import {createContext, useContext, useEffect, useState} from 'react'
import {firestore} from '../../config/firebase'
import {AuthContext} from '../../context/auth/AuthContext'

export const NoteContext = createContext()

const notesRef = firestore.collection('notes')

const NoteContextProvider = (props) => {
    const {loading, user} = useContext(AuthContext)

    const [notes, setNotes] = useState([])
    const [filtered, setFiltered] = useState(null)
    const [current, setCurrent] = useState(null)
    const [formOpened, setFormOpened] = useState(false)
    const [detailOpened, setDetailOpened] = useState(false)
    const [confirmOpened, setConfirmOpened] = useState(false)
    
    const getNotes = async () => {
        try {
            await notesRef
            .where("author", "==", user.uid)
            .orderBy('createdAt', 'desc')
            .onSnapshot(querySnapshot => {
                const items = []
                querySnapshot.forEach(doc => {
                    items.push({id: doc.id, ... doc.data()})
                })
                setNotes(items)
            })
        } catch (err) {
            console.log(err)
        }
    }

    const clearNotes = () => {
        setNotes([])
    }

    const filterNotes = (text) => {
        setFiltered(notes.filter(note => note.title.match(new RegExp(text.trim(), 'gi'))))
    }

    const clearFilter = () => {
        setFiltered(null)
    }

    const setCurrentNote = (id) => {
        const note = notes.find(note => note.id === id)
        setCurrent(note)
    }

    const clearCurrentNote = () => {
        setCurrent(null)
    }

    const createNote = async (note) => {
        const newNote = {
            ...note, 
            createdAt: new Date(), 
            author: user.uid
        }
        try {
            await notesRef.add(newNote)
        } catch (err) {
            console.log(err)
        }
    }

    const updateNote = async (updatedNote) => {
        try {
            const docId = updatedNote.id
            await notesRef.doc(docId).update(updatedNote)
        } catch (err) {
            console.log(err)
        }
    }

    const deleteNote = async (id) => {
        try {
            await notesRef.doc(id).delete()
        } catch (err) {
            console.log(err)
        }
    }

    const handleFormOpen = (id) => {
        if (id) setCurrentNote(id)
        setFormOpened(true)
    }

    const handleFormClose = () => {
        setFormOpened(false)
        clearCurrentNote()
    }

    const handleDetailOpen = (id) => {
        setCurrentNote(id)
        setDetailOpened(true)
    }

    const handleDetailClose = () => {
        setDetailOpened(false)
        clearCurrentNote()
    }

    const handleConfirmOpen = (id) => {
        setCurrentNote(id)
        setConfirmOpened(true)
    }

    const handleConfirmClose = () => {
        setConfirmOpened(false)
        clearCurrentNote(true)
    }

    useEffect(() => {
        if (!loading && user) {
            getNotes()
        }
        // Removes the notes that belong to previoud loggedin user
        if(!user) {
            clearNotes()
        }
    }, [loading, user])

    return (
        <NoteContext.Provider value={{
            notes, 
            filtered,
            current, 
            formOpened, 
            detailOpened, 
            confirmOpened, 
            getNotes, 
            filterNotes, 
            clearFilter,
            setCurrentNote, 
            clearCurrentNote, 
            createNote, 
            updateNote, 
            deleteNote,
            handleFormOpen, 
            handleFormClose, 
            handleDetailOpen, 
            handleDetailClose, 
            handleConfirmOpen, 
            handleConfirmClose
        }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteContextProvider
