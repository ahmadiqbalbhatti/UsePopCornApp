import {useEffect, useState} from "react";
import {API_KEY} from "../App";
import Loader from "./ui/Loader";
import StarRating from "./StarRating";

const MovieDetails = ({selectedId, onCloseMovie, onAddWatchedMovie, watched}) => {
    const [movie, setMovie] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [userRating, setUserRating] = useState('');

    const isWatched = watched.map(movie => movie.imdbID).includes(selectedId);

    console.log(isWatched)

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
            imdbID, title, poster, runtime: Number(runtime.split(" ").at(0)), imdbRating: Number(imdbRating), userRating
        }
        onAddWatchedMovie(newMovie);
        onCloseMovie();
    }


    useEffect(() => {
        function callbackFun(e) {
            if (e.code === "Escape") {
                onCloseMovie();
                // console.log("CLoosing")
            }
        }

        document.addEventListener("keydown", callbackFun)
        return function () {
            document.removeEventListener('keydown', callbackFun);
        }
    }, [onCloseMovie]);

    useEffect(() => {

        const controller = new AbortController();

        async function getMovieDetails() {
            try {
                setIsLoading(true);
                const response = await fetch(`http://www.omdbapi.com/?apikey=${API_KEY}&i=${selectedId}`, {signal: controller.signal});
                if (!response.ok) throw new Error("<span>🚩</span> Something Went wrong with fetching movies.");

                const data = await response.json();
                if (data.Response === "False") throw new Error("☹ Movies Not Found ☹");

                setMovie(data)

                // console.log(data)
                setIsLoading(false);
            } catch (e) {
                if (e.name !== 'AbortError') return;
            }

        }

        getMovieDetails();
        return () => {
            controller.abort();
        }

    }, [selectedId]);

    useEffect(() => {
        if (!title) return;
        document.title = `Movie: ${title}`
        return () => {
            document.title = "usePopCorn";
        }
    }, [title]);


    return (<div className={"details"}>
        {isLoading ? <Loader/> : <>
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
                    {!isWatched ? <><StarRating maxRating={10} size={24}
                        // defaultRating={userRating ? Number(userRating) : 0}
                                                onRatingChange={setUserRating}/>
                        {userRating > 0 && <button className="btn-add" onClick={handleAddWatchedMovie}>Add to
                            List</button>} </> : <p>You Have already Rated this Movie!</p>}
                </div>
                <p>
                    <em>{plot}</em>
                </p>

                <p>Starring By {actors}</p>
                <p>Directed By {director}</p>

            </section>

        </>}

        {/*{selectedId}*/}
    </div>)


}

export default MovieDetails;
