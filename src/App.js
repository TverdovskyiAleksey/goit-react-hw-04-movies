import Container from './Components/Container';
import { Switch, Route } from 'react-router-dom';
import AppBar from './Components/AppBar/AppBar';
import MoviesPage from './views/MoviesPage';
import HomePage from './views/HomePage';
import NotFoundView from './views/NotFoundView';
import MovieDetails from './views/MovieDetails';

function App() {
  return (
    <Container>
      <AppBar />

      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/movies/:id" component={MovieDetails} />
        <Route path="/movies" exact component={MoviesPage} />
        <Route component={NotFoundView} />
      </Switch>
    </Container>
  );
}

export default App;
