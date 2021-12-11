import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navigationbar from './components/NavigationBar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
<<<<<<< HEAD
import Calendar from './pages/Calendarpages/Calendar';
import Tasks from './pages/TaskPages/Tasks';
=======
import Calendar from './pages/Calendar/Calendar';
import Tasks from './pages/Tasks/Tasks';
>>>>>>> 5dbbd29ffb8ec845f36e7d40a70f65c6d22e94fe
import UploadFiles from './pages/Files/UploadFiles';
import ManageFiles from './pages/Files/ManageFiles';
import ViewFiles from './pages/Files/ViewFiles';
import Home from './pages/Home';
import Landing from './pages/Landing';
import Contacts from './pages/Contacts';
import Login from './pages/Login';
import Signup from './pages/Signup/Signup';
import PrivateRoute from './hocs/privateRoutes';
import PublicRoute from './hocs/publicRoutes';

const App = () => {
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
            <PrivateRoute exact path="/files/upload" component={UploadFiles} />
            <PrivateRoute exact path="/files/manage" component={ManageFiles} />
            <PrivateRoute exact path="/files/view" component={ViewFiles} />
            <PrivateRoute exact path="/contacts" component={Contacts} />
          </div>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
