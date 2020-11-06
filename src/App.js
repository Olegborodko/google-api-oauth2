import './index.css';
import Root from './pages/Root'
import Redirect from './pages/Redirect'
import Error404 from './pages/Error404'
import { 
  Route, BrowserRouter as Router, Switch 
} from 'react-router-dom'

function App() {
  return (
    <Router>
      <Switch>
        <Route path='/' exact component={Root} />
        <Route path='/redirect' component={Redirect} />
        <Route component={Error404} />
      </Switch>
    </Router>
  );
}

export default App;
