import {createContext, useState} from 'react'

export const NoteContext = createContext()

const noteList = [
    {id: 1, title: 'eyu', body: 'eyoab tesfaye', createdAt: new Date('2021-03-10 12:34:16')}, 
    {id: 2, title: 'blen', body: 'blen tesfaye', createdAt: new Date('2018-08-08')}, 
    {id: 3, title: 'tt', body: 'mam tiruneh', createdAt: new Date('2018-08-08')}, 
    {id: 4, title: 'paps', body: 'tesfaye aregay', createdAt: new Date('2018-08-08')}, 
    {id: 5, title: 'dico', body: 'dd @gmail.com', createdAt: new Date('2018-08-08')}, 
    {id: 6, title: 'pop', body: 'pipoye pipoye', createdAt: new Date('2018-08-08')}
]

const NoteContextProvider = (props) => {
    const [notes, setNotes] = useState(noteList)
    const [current, setCurrent] = useState(null)
    const [formOpened, setFormOpened] = useState(false)
    const [detailOpened, setDetailOpened] = useState(false)
    const [confirmOpened, setConfirmOpened] = useState(false)
    
    const setCurrentNote = (id) => {
        const note = notes.find(note => note.id === id)
        setCurrent(note)
    }

    const clearCurrentNote = () => {
        setCurrent(null)
    }

    const getLastId = () => {
        const lastNote = notes[notes.length - 1]
        const id = lastNote ? lastNote.id : 0
        return id
    }

    const createNote = (note) => {
        note.id = getLastId() + 1
        note.createdAt = new Date()
        setNotes([...notes, note])
    }

    const updateNote = (updatedNote) => {
        setNotes(notes.map(note => note.id === updatedNote.id ? updatedNote : note))
    }

    const deleteNote = (id) => {
        setNotes(notes.filter(note => note.id !== id))
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

    return (
        <NoteContext.Provider value={{
            notes, 
            current, 
            formOpened, 
            detailOpened, 
            confirmOpened, 
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
