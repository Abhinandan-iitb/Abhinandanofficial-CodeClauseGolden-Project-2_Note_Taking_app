import { useState } from 'react'
import './styles/notes.css'

export default function Notes({ notes, setNotes, searchValue }) {

    const [editedNote, setEditedNote] = useState({
        title: '',
        desc: '',
        index: 0
    });
    const [editActive, setEditActive] = useState(false);

    const deleteNote = (targetNote) => {
        let newNote = notes.filter((note) => (note !== targetNote));
        setNotes(newNote);
    }



    const clearNotes = () => {
        localStorage.removeItem('notes');
        setNotes([]);
    }


    const editNote = (e) => {
        e.preventDefault();
        let updatedNote = notes;
        updatedNote[editedNote.index] = { title: editedNote.title, desc: editedNote.desc };

        setNotes(updatedNote);
        setEditActive(false);

    }

    const handelChange = (e) => {
        setEditedNote({ ...editedNote, [e.target.name]: e.target.value })
    }


    return (
        <section className='notes'>
            <div className="section-heading">
                <h2>My Notes</h2>
                <div className="clear-notes">
                    <button onClick={clearNotes}>
                        <div className="icon">
                            <i className="fi fi-rr-apps-delete"></i>
                        </div>
                        <div className="text">Clear All</div>
                    </button>
                </div>
            </div>
            <div className="section-body">
                <div className="notes-container">
                    {
                        (notes && notes.length !== 0)
                            ?
                            notes
                                .filter((note) => {
                                    return (note.title.includes(searchValue) || note.desc.includes(searchValue));
                                })
                                .map((note, index) => {
                                    return <div className="note-card" key={index}>

                                        <div className="note-header">
                                            <b className='note-count'>{(index + 1) <= 9 ? `0${index + 1}` : index + 1}</b>
                                            <h3 className='note-title'>{note.title}</h3>
                                        </div>
                                        <div className="note-desc">
                                            {
                                                note.desc.split('\n').map((d, i) => <p key={i}>{d}</p>)
                                            }
                                        </div>
                                        <div className="note-action-btns">
                                            <button className="edit" onClick={() => { setEditActive(true); setEditedNote({ ...note, index }) }}>
                                                <i className="fi fi-rr-edit"></i>
                                            </button>
                                            <button className="delete" onClick={() => deleteNote(note)}>
                                                <i className="fi fi-rr-trash"></i>
                                            </button>
                                        </div>
                                    </div>
                                })
                            :
                            null
                    }
                </div>
                {
                    (notes && notes.length === 0) ? <h3 className='message warning'>Add a note to see here</h3> : ''
                }
                {
                    (notes && notes.length !== 0)
                        ?
                        notes
                            .filter((note) => {
                                return (note.title.includes(searchValue) || note.desc.includes(searchValue));
                            }).length === 0
                        &&
                        <h3 className='message danger'>No such note found</h3>
                        :
                        null
                }
                {
                    editActive && <div className="edit-form-container">
                        <form className="edit-note-form" onSubmit={editNote}>
                            <input type="text" className='note-title' name='title' onChange={handelChange} value={editedNote.title} placeholder="Note Title" />
                            <textarea className='note-desc' name='desc' onChange={handelChange} value={editedNote.desc} placeholder="Note Description" />
                            <button type='submit' >
                                <div className="icon">
                                    <i className="fi fi-rr-refresh"></i>
                                </div>
                                <div className="label">Update Note</div>
                            </button>
                        </form>
                    </div>
                }
            </div>
        </section >
    )
}
