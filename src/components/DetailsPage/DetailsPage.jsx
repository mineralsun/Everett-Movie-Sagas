import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

function DetailsPage() {
    const history = useHistory();
    const dispatch = useDispatch();
    const movies = useSelector(store => store.movies);

    const getFilm = () => {
        dispatch({ type: 'GET_FILM' });
    }

    // This takes user back to home page where the list of movies is
    const returnToMovieList = (event) => {
        history.push('/');
    }

    useEffect(() => {
        getFilm();
    }, []);

    return (
        <>
        {
            movies.map(film => (
                <div key={film.id}>
                    <h4>{film.name}</h4>

                </div>
            ))
        }
        <button onClick={returnToMovieList}>Home</button>
        </>
    ) ;
}

export default DetailsPage;