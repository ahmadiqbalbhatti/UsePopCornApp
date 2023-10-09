import {useEffect, useState} from "react";
export function useMovies(query, API_KEY, callback) {

    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("");

    useEffect(function () {

        const controller = new AbortController();

        callback?.();
        async function fetchMovies() {
            try {
                setIsLoading(true);
                setError("");
                const response = await fetch(`http://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`, {signal: controller.signal});
                if (!response.ok) throw new Error("<span>🚩</span> Something Went wrong with fetching movies.");

                const data = await response.json();
                if (data.Response === "False") throw new Error("☹ Movies Not Found ☹");

                setMovies(data.Search)
                // console.log(data.Search)
            } catch (e) {
                console.error(e.message);
                if (e.name !== 'AbortError') {

                    setError(e.message);
                }


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

        return () => {
            controller.abort();
        }
    },  [query]);

    return {movies, isLoading, error}
}
