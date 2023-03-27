import { useEffect, useState } from 'react';
import AddNotes from './AddNotes';
import Footer from './Footer';
import Header from './Header';
import Notes from './Notes';
import './styles/app.css';

function App() {

  const [searchValue, setSearchValue] = useState('')
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    let localNotes = JSON.parse(localStorage.getItem('notes'));
    if (localNotes)
      setNotes(localNotes);
  }, []);


  useEffect(() => {
    if (notes && notes.length)
      localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);



  return (
    <div className="app">
      <Header searchValue={searchValue} setSearchValue={setSearchValue} />
      <main>
        <AddNotes setNotes={setNotes} />
        <Notes notes={notes} setNotes={setNotes} searchValue={searchValue} />
      </main>
      <Footer />
    </div>
  );
}

export default App;
