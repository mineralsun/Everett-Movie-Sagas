import { HashRouter as Router, Route } from 'react-router-dom';
import './App.css';
import MovieList from '../MovieList/MovieList'
import DetailsPage from '../DetailsPage/DetailsPage.jsx';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

function App() {
  return (
    <div className="App">
      <h1>The Movies Saga!</h1>
      <Router>
        <Container fixed>
          <Route path="/" exact>
            <MovieList />
          </Route>

          <Route exact path="/details/:movieId">
            <DetailsPage />
          </Route>

          {/* Add Movie page */}
        </Container>
      </Router>
    </div>
  );
}


export default App;
