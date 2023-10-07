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
        </main>);
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



export default Main;
export {average}
