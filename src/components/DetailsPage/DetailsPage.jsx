import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

function DetailsPage() {
    const history = useHistory();
    const dispatch = useDispatch();
    const film = useSelector(store => store.film);


    // This takes user back to home page where the list of movies is
    const returnToMovieList = (event) => {
        history.push('/');
    }

    return (
        <>
        
        <button onClick={returnToMovieList}>Home</button>
        </>
    ) ;
}

export default DetailsPage;