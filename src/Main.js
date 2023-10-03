import {useState} from "react";

const tempWatchedData = [
    {
        imdbID: "tt1375666",
        Title: "Inception",
        Year: "2010",
        Poster: "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
        runtime: 148,
        imdbRating: 8.8,
        userRating: 10,
    }, {
        imdbID: "tt0088763",
        Title: "Back to the Future",
        Year: "1985",
        Poster: "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
        runtime: 116,
        imdbRating: 8.5,
        userRating: 9,
    },
];


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


const MoviesListBox = ({children}) => {
    // const [isOpen1, setIsOpen1] = useState(true);

    const [isMoviesListOpen, setIsMoviesListOpen] = useState(true)
    return (
        <div className="box">
            <button
                className="btn-toggle"
                onClick={() => setIsMoviesListOpen((open) => !open)}
            >
                {isMoviesListOpen ? "–" : "+"}
            </button>
            {isMoviesListOpen && children}
        </div>
    )
}

const MoviesList = ({movies}) => {

    return (
        <ul className="list">
            {movies?.map((movie) => (
                //   may be required to create a component
                <MovieItem movie={movie} key={movie.imdbID}/>
            ))}
        </ul>
    )
}

const MovieItem = ({movie}) => {
    return (
        <li key={movie.imdbID}>
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


const WatchedMoviesListBox = () => {
    const [watched, setWatched] = useState(tempWatchedData);

    const [isWatchedMoviesListOpen, setIsWatchedMoviesListOpen] = useState(true);


    return (
        <div className="box">
            <button
                className="btn-toggle"
                onClick={() => setIsWatchedMoviesListOpen((open) => !open)}
            >
                {isWatchedMoviesListOpen ? "–" : "+"}
            </button>
            {isWatchedMoviesListOpen && (
                <>
                    <WatchedMoviesSummary watched={watched}/>
                    <WatchedMoviesList watched={watched}/>

                </>
            )}
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
                    <span>{avgRuntime} min</span>
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
            <img src={movie.Poster} alt={`${movie.Title} poster`}/>
            <h3>{movie.Title}</h3>
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
    MoviesListBox,
    WatchedMoviesListBox,
    MoviesList,
    MovieItem,
    WatchedMoviesSummary,
    WatchedMoviesList,
    WatchedMovieItem
}
