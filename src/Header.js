import './styles/header.css'

export default function Header({ searchValue, setSearchValue }) {


    const handelSubmit = (e) => {
        e.preventDefault();
        setSearchValue(searchValue)
    }

    return (
        <header className='header'>
            <div className="title">
                <img src="/favicon/apple-icon-60x60.png" alt="logo" />
                <h1><span>A</span>bhi <span>N</span>otes</h1>
            </div>
            <form className="search-form" onSubmit={handelSubmit}>
                <input
                    autoComplete='off'
                    type="text"
                    placeholder='Search your notes'
                    value={searchValue}
                    onChange={(e) => {
                        setSearchValue(e.target.value);
                    }} />
                <button type='submit'>
                    <i className="fi fi-rr-search"></i>
                </button>
            </form>
        </header>
    )
}
