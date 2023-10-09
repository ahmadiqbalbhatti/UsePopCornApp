import {useRef} from "react";
import {useKey} from "../DataLogic/useKey";

const SearchBar = ({query, setQuery}) => {
    // One way of accessing DOM Elements
    const inputSearch = useRef(null);

    useKey('Enter', ()=>{
        if (document.activeElement === inputSearch.current) return;
        inputSearch.current.focus();
        setQuery("")
    })

    return (<input
        className="search"
        ref={inputSearch}
        type="text"
        placeholder="Search movies..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
    />)
}

export default SearchBar;
