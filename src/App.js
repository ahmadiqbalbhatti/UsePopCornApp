import Navbar, {NumResults, SearchBar} from "./Navbar";
import Main, {MovieDetails, MoviesList, WatchedMoviesList, WatchedMoviesSummary} from "./Main";
import {useEffect, useState} from "react";
import Box from "./Box";

//
// const tempMovieData = [
//     {
//         imdbID: "tt1375666",
//         Title: "Inception",
//         Year: "2010",
//         Poster: "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
//     }, {
//         imdbID: "tt0133093",
//         Title: "The Matrix",
//         Year: "1999",
//         Poster: "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
//     }, {
//         imdbID: "tt6751668",
//         Title: "Parasite",
//         Year: "2019",
//         Poster: "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
//     },
// ];
//
//
// const tempWatchedData = [
//     {
//         imdbID: "tt1375666",
//         Title: "Inception",
//         Year: "2010",
//         Poster: "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
//         runtime: 148,
//         imdbRating: 8.8,
//         userRating: 10,
//     }, {
//         imdbID: "tt0088763",
//         Title: "Back to the Future",
//         Year: "1985",
//         Poster: "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
//         runtime: 116,
//         imdbRating: 8.5,
//         userRating: 9,
//     },
// ];

const API_KEY = "acb25a3a";

export default function App() {
    const [movies, setMovies] = useState([]);
    const [watched, setWatched] = useState([]);
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("");
    const [query, setQuery] = useState("interstellar");
    const [selectedId, setSelectedId] = useState(null);


    // const tempQuery = "interstellar";

    /*useEffect(() => {
        console.log('During initial render');
    }, []);

    useEffect(() => {
        console.log('during every render');
    });

    useEffect(() => {
        console.log("D" )
    }, [query]);

    console.log('During render')*/

    function handleSelectMovie(id) {
        setSelectedId(selectedId => id === selectedId ? null : id);
    }

    function handleCloseMovie() {
        setSelectedId(null);
    }

    function handleAddWatchedMovie(movie) {
        setWatched(watched => [...watched, movie])

    }


    /*
        useEffect(() => {
             const fetchMoviesById = async () => {
                 console.log('Fetch by ID' );
                 const response = await fetch(`http://www.omdbapi.com/?apikey=${API_KEY}&i=${selectedId}`);
                 if (!response.ok) throw new Error("<span>🚩</span> Something Went wrong with fetching movies.");

                 const data = await response.json();
                 // if (data.Response === "False") throw new Error("☹ Movies Not Found ☹");
                 console.log(data)
             };

             fetchMoviesById();
        }, [selectedId]);

    */


    useEffect(function () {
        async function fetchMovies() {
            try {
                setIsLoading(true);
                setError("");
                const response = await fetch(`http://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`);
                if (!response.ok) throw new Error("<span>🚩</span> Something Went wrong with fetching movies.");

                const data = await response.json();
                if (data.Response === "False") throw new Error("☹ Movies Not Found ☹");

                setMovies(data.Search)
                console.log(data.Search)
            } catch (e) {
                console.error(e.message);
                setError(e.message);

            } finally {
                setIsLoading(false)
            }
        }

        if (query.length < 3) {
            setMovies([]);
            setError("");
            return;
        }

        fetchMovies();
    }, [query]);


    // console.log(movies)
    return (<>
        {/*Component Composition Way*/}
        <Navbar>
            <SearchBar query={query} setQuery={setQuery}/>
            <NumResults movies={movies}/>
        </Navbar>
        <Main>
            {/*                <Box element={
                    <MoviesList movies={movies}/>
                }/>

                <Box element={
                    <>
                        <WatchedMoviesSummary watched={watched}/>
                        <WatchedMoviesList watched={watched}/>
                    </>
                }/>*/}
            <Box>
                {isLoading && <Loader/>}
                {!isLoading && !error &&
                    <MoviesList movies={movies} onSelectMovie={handleSelectMovie} onCloseMovie={handleCloseMovie}/>}
                {error && <ErrorMessage message={error}/>}
            </Box>
            <Box>
                {selectedId ?
                    <MovieDetails
                        selectedId={selectedId}
                        onCloseMovie={handleCloseMovie}
                        onAddWatchedMovie={handleAddWatchedMovie}
                    /> : <>
                        <WatchedMoviesSummary watched={watched}/>
                        <WatchedMoviesList watched={watched}/>
                    </>}
            </Box>
            {/*<WatchedMoviesListBox/>*/}
        </Main>
    </>);
}


function Loader() {
    return <p className={"loader"}>Loading...</p>
}

function ErrorMessage({message}) {
    return (<p className={"error"}>
        {/*<span>🚩</span>*/}
        {message}
    </p>)

}


export {API_KEY, Loader}
