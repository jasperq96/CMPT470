import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navigationbar from './components/NavigationBar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import Calendar from './pages/Calendar';
import Tasks from './pages/Tasks';
import ViewFiles from './pages/Files/ViewFiles';
import Files from './pages/Files/Files';
import Home from './pages/Home';
import Landing from './pages/Landing';
import Contacts from './pages/Contacts';
import Login from './pages/Login';
import Signup from './pages/Signup/Signup';
import PrivateRoute from './hocs/privateRoutes';
import PublicRoute from './hocs/publicRoutes';

function App() {
  return (
    <div>
      <Router>
        <ToastContainer />
        <Switch>
          <PublicRoute exact path="/" component={Landing} />
          <PublicRoute exact path="/login" component={Login} />
          <PublicRoute exact path="/signup" component={Signup} />
          <div>
            <Navigationbar />
            <PrivateRoute exact path="/home" component={Home} />
            <PrivateRoute exact path="/calendar" component={Calendar} />
            <PrivateRoute exact path="/tasks" component={Tasks} />
            <PrivateRoute exact path="/files/upload" component={Files} />
            <PrivateRoute exact path="/files/manage" component={Files} />
            <PrivateRoute exact path="/files/view" component={ViewFiles} />
            <PrivateRoute exact path="/contacts" component={Contacts} />
          </div>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
