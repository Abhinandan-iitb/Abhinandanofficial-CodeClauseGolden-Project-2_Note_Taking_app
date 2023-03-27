import { useState } from 'react'
import './styles/addNotes.css'

export default function AddNotes({ setNotes }) {
    const [note, setNote] = useState({
        title: '',
        desc: ''
    })
    const [message, setMessage] = useState('')

    const handelChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    }

    const addNote = (e) => {
        e.preventDefault();
        if (note.title !== '' && note.desc !== '') {
            setNotes((prev) => { return [...prev, note] });
            setNote({
                title: '',
                desc: ''
            })
            setMessage('Note Added Successfully')
        }
        else setMessage('Please fill all the fields to create a note');

        setTimeout(() => {
            setMessage('')
        }, 2000)
    }

    return (
        <section className='add-notes'>
            <div className="section-heading">
                <h2>Add a Note</h2>
            </div>
            <div className="section-body">
                {message !== '' && <div className="message-box">{message}</div>}
                <form className='add-notes-form' onSubmit={addNote}>
                    <input type="text" className='note-title' name='title' onChange={handelChange} value={note.title} placeholder="Note Title" />
                    <textarea className='note-desc' name='desc' onChange={handelChange} value={note.desc} placeholder="Note Description" />
                    <button type='submit'>
                        <div className="icon">
                            <i className="fi fi-rr-plus"></i>
                        </div>
                        <div className="label">Add Note</div>
                    </button>
                </form>
            </div>
        </section>
    )
}
