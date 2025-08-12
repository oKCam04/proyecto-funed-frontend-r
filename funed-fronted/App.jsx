import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CursosPage from './pages/CursosPage';
import './styles/app.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={CursosPage} />
      </Switch>
    </Router>
  );
}

export default App;