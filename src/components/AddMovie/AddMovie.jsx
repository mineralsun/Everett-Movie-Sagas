import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';


function MovieDetail() {
    const genres = useSelector(store => store.genres);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [selectedOption, setSelectedOption] = useState('');
    const [poster, setPoster] = useState('');
    const dispatch = useDispatch();
    const history = useHistory();
    const { id } = useParams();

    useEffect(() => {
        if (id) { // Returns false if id is undefined
            axios.get(`/api/movie/${id}`).then((response) => {
                const movie = response.data;
                setTitle(movie.title);
                setDescription(movie.description);
                setPoster(movie.poster);
            }).catch((error) => {
                console.log(error)
                alert('Something went wrong');
            });
        } // else do nothing
    }, [id]);

    const submitForm = (e) => {
        e.preventDefault();
        if (id) {
            // Edit an existing movie
            dispatch({ type: 'EDIT_MOVIE', payload: { title, description, poster, id}, history});
        } else {
            // Add a movie
            dispatch({ type: 'ADD_MOVIE', payload: { title, description, poster }, history });
        }
    }

    return (
        <div>
            <h1>{id ? 'Edit Movie' : 'Add Movie'}</h1>
            <h3>{id}</h3>
            <form onSubmit={submitForm}>
                <p>Title: <input value={title} onChange={(e) => setTitle(e.target.value)} /></p> <br />
                <p>Description: <input value={description} onChange={(e) => setDescription(e.target.value)} /></p> <br />
                <p>Poster: <input value={poster} onChange={(e) => setPoster(e.target.value)} /></p> <br />
                <input type="submit" />
            </form>
        </div>
    )
}

export default MovieDetail;