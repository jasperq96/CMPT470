import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navigationbar from './components/NavigationBar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Calendar from './pages/Calendar';
import Tasks from './pages/Tasks';
import Files from './pages/Files';
import Home from './pages/Home';
import Landing from './pages/Landing';
import Contacts from './pages/Contacts';
import Inprogress from './pages/Inprogress';
import Login from './pages/Login';
import Signup from './pages/Signup';

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/inprogress" component={Inprogress} />
          <div>
            <Navigationbar />
            <Route exact path="/home" component={Home} />
            <Route exact path="/calendar" component={Calendar} />
            <Route exact path="/tasks" component={Tasks} />
            <Route exact path="/files" component={Files} />
            <Route exact path="/contacts" component={Contacts} />
          </div>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
