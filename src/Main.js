import {useEffect, useState} from "react";
import {API_KEY, Loader} from "./App";
import StarRating from "./StarRating";

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


const average = (array) => {
    return array.reduce((acc, cur, i, array) => acc + cur / array.length, 0);
}

const Main = ({children}) => {
    return (

        <main className="main">
            {children}
        </main>
    );
}


// const MoviesListBox = ({children}) => {
//     // const [isOpen1, setIsOpen1] = useState(true);
//
//     const [isMoviesListOpen, setIsMoviesListOpen] = useState(true)
//     return (
//         <div className="box">
//             <button
//                 className="btn-toggle"
//                 onClick={() => setIsMoviesListOpen((open) => !open)}
//             >
//                 {isMoviesListOpen ? "–" : "+"}
//             </button>
//             {isMoviesListOpen && children}
//         </div>
//     )
// }

const MoviesList = ({movies, onSelectMovie}) => {

    return (
        <ul className="list list-movies">
            {movies?.map((movie) => (
                //   may be required to create a component
                <MovieItem movie={movie} key={movie.imdbID} onSelectMovie={onSelectMovie}/>
            ))}
        </ul>
    )
}

const MovieItem = ({movie, onSelectMovie}) => {
    return (
        <li key={movie.imdbID} onClick={() => onSelectMovie(movie.imdbID)}>
            <img src={movie.Poster} alt={`${movie.Title} poster`}/>
            <h3>{movie.Title}</h3>
            <div>
                <p>
                    <span>🗓</span>
                    <span>{movie.Year}</span>
                </p>
            </div>
        </li>
    )
}


// const WatchedMoviesListBox = () => {
//     const [watched, setWatched] = useState(tempWatchedData);
//
//     const [isWatchedMoviesListOpen, setIsWatchedMoviesListOpen] = useState(true);
//
//
//     return (
//         <div className="box">
//             <button
//                 className="btn-toggle"
//                 onClick={() => setIsWatchedMoviesListOpen((open) => !open)}
//             >
//                 {isWatchedMoviesListOpen ? "–" : "+"}
//             </button>
//             {isWatchedMoviesListOpen && (
//                 <>
//                     <WatchedMoviesSummary watched={watched}/>
//                     <WatchedMoviesList watched={watched}/>
//
//                 </>
//             )}
//         </div>
//     )
// }


const MovieDetails = ({selectedId, onCloseMovie, onAddWatchedMovie}) => {
    const [movie, setMovie] = useState({});
    const [isLoading, setIsLoading] = useState(false);


    const {
        imdbID,
        Title: title,
        Poster: poster,
        Runtime: runtime,
        imdbRating,
        Plot: plot,
        Released: released,
        Actors: actors,
        Director: director,
        Genre: genre
    } = movie;

    // console.log(title, year, poster, runtime, imdbRating ,plot, released, actors, director, genre )


    function handleAddWatchedMovie() {
        const newMovie = {
            imdbID,
            title,
            poster,
            runtime: Number(runtime.split(" ").at(0)),
            imdbRating: Number(imdbRating),
        }

        onAddWatchedMovie(newMovie);
        onCloseMovie();
    }



    useEffect(() => {
        async function getMovieDetails() {
            setIsLoading(true);
            const response = await fetch(`http://www.omdbapi.com/?apikey=${API_KEY}&i=${selectedId}`);
            if (!response.ok) return;

            const data = await response.json();
            setMovie(data)

            console.log(data)
            setIsLoading(false);

        }

        getMovieDetails();

    }, [selectedId]);

    return (
        <div className={"details"}>
            {
                isLoading ? <Loader/> :
                    <>
                        <header>
                            <button className="btn-back" onClick={onCloseMovie}>
                                &larr;
                            </button>

                            <img src={poster} alt={`Poster of ${movie} movie`}/>

                            <div className="details-overview">
                                <h2>{title}</h2>
                                <p>{released} &bull; {runtime}</p>
                                <p>{genre}</p>
                                <p><span>⭐</span>{imdbRating} IMDB Rating</p>
                            </div>

                        </header>

                        <section>
                            <div className="rating">
                                <StarRating maxRating={10} size={24}/>
                                <button className="btn-add" onClick={handleAddWatchedMovie}>Add to List</button>
                            </div>
                            <p>
                                <em>{plot}</em>
                            </p>

                            <p>Starring By {actors}</p>
                            <p>Directed By {director}</p>

                        </section>

                    </>
            }

            {/*{selectedId}*/}
        </div>
    )


}
const WatchedMoviesSummary = ({watched}) => {
    const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
    const avgUserRating = average(watched.map((movie) => movie.userRating));
    const avgRuntime = average(watched.map((movie) => movie.runtime));

    return (
        <div className="summary">
            {/*May Be require to create a separate component*/}
            <h2>Movies you watched</h2>
            <div>
                <p>
                    <span>#️⃣</span>
                    <span>{watched.length} movies</span>
                </p>
                <p>
                    <span>⭐️</span>
                    <span>{avgImdbRating}</span>
                </p>
                <p>
                    <span>🌟</span>
                    <span>{avgUserRating}</span>
                </p>
                <p>
                    <span>⏳</span>
                    <span>{Math.round(avgRuntime)} min</span>
                </p>
            </div>
        </div>
    );
}

const WatchedMoviesList = ({watched}) => {
    return (
        <ul className="list">
            {/*Can be a component*/}
            {watched.map((movie) => (
                <WatchedMovieItem movie={movie} key={movie.imdbID}/>
            ))}
        </ul>
    )
}

const WatchedMovieItem = ({movie}) => {
    return (
        <li key={movie.imdbID}>
            <img src={movie.poster} alt={`${movie.title} poster`}/>
            <h3>{movie.title}</h3>
            <div>
                <p>
                    <span>⭐️</span>
                    <span>{movie.imdbRating}</span>
                </p>
                <p>
                    <span>🌟</span>
                    <span>{movie.userRating}</span>
                </p>
                <p>
                    <span>⏳</span>
                    <span>{movie.runtime} min</span>
                </p>
            </div>
        </li>
    );
}


export default Main;
export {
    Main,
    MoviesList,
    MovieItem,
    WatchedMoviesSummary,
    WatchedMoviesList,
    WatchedMovieItem,
    MovieDetails
}
