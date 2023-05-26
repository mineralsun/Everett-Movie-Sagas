import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App/App.js';
import { createStore, combineReducers, applyMiddleware } from 'redux';
// Provider allows us to use redux within our react app
import { Provider } from 'react-redux';
import logger from 'redux-logger';
// Import saga middleware
import createSagaMiddleware from 'redux-saga';
import { takeEvery, put } from 'redux-saga/effects';
import axios from 'axios';

// Create the rootSaga generator function
function* rootSaga() {
    yield takeEvery('FETCH_MOVIES', fetchAllMovies);
    yield takeEvery('FETCH_GENRES', fetchAllGenres);
    yield takeEvery('FETCH_MOVIE_DETAILS', fetchMovieDetails);
    yield takeEvery('ADD_MOVIE', addMovie);
    yield takeEvery('EDIT_MOVIE', editMovie);
}

function* editMovie(action) {
    try {
        yield axios.put(`/api/movie/${action.payload.id}`, action.payload);
        if (action.history) {
            action.history.goBack();
        }
    } catch (e) {
        console.log(e);
    }
}

function* addMovie(action) {
    try {
        yield axios.post('/api/movie', action.payload);
        if (action.history) {
            // Redirect back to the movie list
            action.history.push('/');
        }
    } catch (e) {
        console.log(e);
    }
}

function* fetchMovieDetails(action) {
    try {
        const movie = yield axios.get(`/api/movie/${action.payload}`);
        yield put({ type: 'SET_MOVIE_DETAILS', payload: movie.data });
        const genres = yield axios.get(`api/genre/${action.payload}`);
        yield put({ type: 'SET_GENRES', payload: genres.data })
    } catch (error) {
        console.log(error);
    }

}

function* fetchAllMovies() {
    // get all movies from the DB
    try {
        const movies = yield axios.get('/api/movie');
        console.log('get all:', movies.data);
        yield put({ type: 'SET_MOVIES', payload: movies.data });
    } catch {
        console.log('get all error');
    }

}

function* fetchAllGenres(action) {
    try {
        const genres = yield axios.get(`/api/genre/:id`);
        console.log('get genres:', genres.data);
        yield put({ type: 'SET_GENRES', payload: genres.data[0] });
    } catch (error) {
        console.log('get genres error', error)
    }
}



// Create sagaMiddleware
const sagaMiddleware = createSagaMiddleware();

// Used to store movies returned from the server
const movies = (state = [], action) => {
    switch (action.type) {
        case 'SET_MOVIES':
            return action.payload;
        default:
            return state;
    }
}

// Used to store the movie genres
const genres = (state = [], action) => {
    switch (action.type) {
        case 'SET_GENRES':
            return action.payload;
        default:
            return state;
    }
}

const selectedMovie = (state = {}, action) => {
    switch (action.type) {
        case 'SET_MOVIE_DETAILS':
            return action.payload;
        default:
            return state;
    }
}

// Create one store that all components can use
const storeInstance = createStore(
    combineReducers({
        movies,
        genres,
        selectedMovie,
        addMovie,
        editMovie,
    }),
    // Add sagaMiddleware to our store
    applyMiddleware(sagaMiddleware, logger),
);

// Pass rootSaga into our sagaMiddleware
sagaMiddleware.run(rootSaga);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Provider store={storeInstance}>
            <App />
        </Provider>
    </React.StrictMode>
);
