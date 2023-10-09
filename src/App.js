import Navbar from "./components/ui/Navbar";
import Main from "./components/ui/Main";
import {useState} from "react";
import Box from "./components/ui/Box";
import Loader from "./components/ui/Loader";
import ErrorMessage from "./components/ui/ErrorMessage";
import MoviesList from "./components/MoviesList";
import MovieDetails from "./components/MovieDetails";
import WatchedMoviesList from "./components/WatchedMoviesList";
import WatchedMoviesSummary from "./components/WatchedMoviesSummary";
import NumResults from "./components/ui/NumResults";
import SearchBar from "./components/ui/SearchBar";
import {useMovies} from "./components/DataLogic/useMovies";
import {useLocalStorageState} from "./components/DataLogic/useLocalStorageState";

const API_KEY = "acb25a3a";

export default function App() {
    const [query, setQuery] = useState("");
    const [selectedId, setSelectedId] = useState(null);

    const {movies, isLoading, error} = useMovies(query, API_KEY, handleCloseMovie)

    const [watched, setWatched] = useLocalStorageState([], "watched");

    function handleSelectMovie(id) {
        setSelectedId(selectedId => id === selectedId ? null : id);
    }

    function handleCloseMovie() {
        setSelectedId(null);
    }

    function handleAddWatchedMovie(movie) {
        if (!watched.some((watchedMovie) => watchedMovie.imdbID === movie.imdbID)) {
            setWatched(watched => [...watched, movie]);
            // localStorage.setItem("watched", JSON.stringify([...watched, movie]));
        }
    }

    function handleDeleteWatchedMovie(id) {
        setWatched(watched => watched.filter(movie => movie.imdbID !== id))
    }

    // console.log(movies)
    return (<>
        {/*Component Composition Way*/}
        <Navbar>
            <SearchBar query={query} setQuery={setQuery}/>
            <NumResults movies={movies}/>
        </Navbar>
        <Main>
            <Box>
                {isLoading && <Loader/>}
                {!isLoading && !error &&
                    <MoviesList movies={movies} onSelectMovie={handleSelectMovie} onCloseMovie={handleCloseMovie}/>}
                {error && <ErrorMessage message={error}/>}
            </Box>
            <Box>
                {selectedId ? <MovieDetails
                    selectedId={selectedId}
                    onCloseMovie={handleCloseMovie}
                    onAddWatchedMovie={handleAddWatchedMovie}
                    watched={watched}
                /> : <>
                    <WatchedMoviesSummary watched={watched}/>
                    <WatchedMoviesList watched={watched} onDeleteWatchedMovie={handleDeleteWatchedMovie}/>
                </>}
            </Box>
        </Main>
    </>);
}


export {API_KEY}
