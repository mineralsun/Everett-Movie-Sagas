import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';


function DetailsPage() {
    const history = useHistory();
    const dispatch = useDispatch();
    const movies = useSelector(store => store.movies);
    let { id } = useParams();
    const movie = movies.find((movie) => movie.id === Number(id));
    console.log(id);

    // This takes user back to home page where the list of movies is
    const returnToMovieList = (event) => {
        history.push('/');
    }

    useEffect(() => {
        dispatch({ type: 'FETCH_MOVIES' });
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
                    <h1>{movie.title}</h1>
                </div>
            )
        }
        <button onClick={returnToMovieList}>Home</button>
        </>
    ) ;
}

export default DetailsPage;