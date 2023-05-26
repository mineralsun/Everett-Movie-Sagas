import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams, Link } from 'react-router-dom';


function DetailsPage() {
    const history = useHistory();
    const dispatch = useDispatch();
    const movies = useSelector(store => store.movies);
    const genres = useSelector(store => store.genres);
    const  { movieId } = useParams();
    // ?? const movie = movies.find((movie) => movie.id === Number(id));
    const movie = useSelector(store => store.selectedMovie);
    // console.log(id);

    // This takes user back to home page where the list of movies is
    const returnToMovieList = (event) => {
        history.push('/');
    }

    useEffect(() => {
        dispatch({ type: 'FETCH_MOVIE_DETAILS', payload: movieId });
    }, [movieId]);


    console.log(movieId);

    return (
        <div>
            <h1>{movieId}</h1>
            <h2>{movie.title}</h2>
            <img src={movie.poster}></img>
            <br />
            <Link to={`/edit/${movie.id}`}>Edit</Link>
            <p>{movie.description}</p>
            <ul>
                <h3>Genres:</h3>
                {
                    genres.map(genreToDisplay =>
                        <li>{genreToDisplay.name}</li>
                    )
                }
            </ul>
            <button onClick={returnToMovieList}>Home</button>
        </div>

    );
}

export default DetailsPage;