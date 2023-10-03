import {useState} from "react";

const Navbar = ({children}) => {

    return (
        <nav className="nav-bar">
            <Logo/>
            <SearchBar/>
            {children}
        </nav>
    )
}

const Logo = () => {
    return (
        <div className="logo">
            <span role="img">🍿</span>
            <h1>usePopcorn</h1>
        </div>
    )
}

const SearchBar = () => {
    const [query, setQuery] = useState("");

    return (
        <input
            className="search"
            type="text"
            placeholder="Search movies..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
        />
    )
}

const NumResults = ({movies}) => {
    return (
        <p className="num-results">
            Found <strong>{movies.length}</strong> results
        </p>
    )
}

export default Navbar;
export {Logo, SearchBar, NumResults};
