import WatchedMovieItem from "./WatchedMovieItem";

const WatchedMoviesList = ({watched, onDeleteWatchedMovie}) => {
    return (<ul className="list">
        {/*Can be a component*/}
        {watched.map((movie) => (
            <WatchedMovieItem movie={movie} key={movie.imdbID} onDeleteWatchedMovie={onDeleteWatchedMovie}/>))}
    </ul>)
}


export default WatchedMoviesList;
