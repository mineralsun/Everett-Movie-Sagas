import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import './MovieList.css'

function MovieList() {

    const history = useHistory();
    const dispatch = useDispatch();
    const movies = useSelector(store => store.movies);

    // This function allows the user to navigate to a specific movie page which 
    // will show the more specific information on the DOM
    const navigateToMovie = (id) => {
        console.log(id);
        history.push(`/details/${id}`);
    }

    useEffect(() => {
        dispatch({ type: 'FETCH_MOVIES' });
    }, []);

    const displayMovie = (movieToDisplay) => {
        history.push(`/details/${movieToDisplay.id}`);
    }

    return (
        <main>
            <h1>MovieList</h1>
            <Grid
                margin={0}
                xs={2} md={2}
                padding={2.7}
                className="movies"
            >
                {movies.map(movie => {
                    return (
                        <Box
                            border={2}
                            padding={4}
                            margin={1}
                            borderColor={'black'}
                        >
                        <div key={movies.id} >
                            <h3>{movie.title}</h3>
                            <img onClick={(event) => displayMovie(movie)} src={movie.poster} alt={movie.title}/>
                        </div>
                        </Box>
                    );
                })}
            </Grid>
        </main>

    );
}

export default MovieList;