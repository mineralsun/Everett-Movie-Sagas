import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';


function DetailsPage() {
    const history = useHistory();
    const dispatch = useDispatch();
    const movies = useSelector(store => store.movies);
    const genres = useSelector(store => store.genres);
    let { id } = useParams();
    const movie = movies.find((movie) => movie.id === Number(id));
    console.log(id);

    // This takes user back to home page where the list of movies is
    const returnToMovieList = (event) => {
        history.push('/');
    }

    useEffect(() => {
        dispatch({ type: 'FETCH_MOVIES' });
        dispatch({ type: 'FETCH_GENRES' });
    }, []);

    return (
        <>
        {
            movies.length === 0 ? (

                <div>
                    Loading...
                </div>
            ) : (
                <div key={movie.id}>
                    <h2>{movie.title}</h2>
                    <img src={movie.poster}></img>
                    <h4>Genres:</h4>
                    <ul className="genres">
                        {
                            genres.map(genre => {
                                <li>{genre.name}</li>
                            })
                        }
                    </ul>
                    <p>{movie.description}</p>
                </div>
            )
        }
        <button onClick={returnToMovieList}>Home</button>
        </>
    ) ;
}

export default DetailsPage;