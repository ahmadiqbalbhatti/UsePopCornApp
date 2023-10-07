import MovieItem from "./MovieItem";

const MoviesList = ({movies, onSelectMovie}) => {

    return (<ul className="list list-movies">
        {movies?.map((movie) => (//   may be required to create a component
            <MovieItem movie={movie} key={movie.imdbID} onSelectMovie={onSelectMovie}/>))}
    </ul>)
}

export default MoviesList;
