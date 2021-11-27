import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navigationbar from './components/NavigationBar';
import Calendar from './Pages/Calendar';
import Tasks from './Pages/Tasks';
import Files from './Pages/Files';
import Account from './Pages/Account';
import Home from './Pages/Home';
import Landing from './Pages/Landing';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Contacts from './Pages/Contacts';

function App() {
  return (
    <div>
      <Router>
      <Switch>
      <Route exact path="/" component= {Landing}/>
        <div>
        <Navigationbar/>
          <Route exact path="/home" component= {Home} />
          <Route exact path="/calendar" component= {Calendar} />
          <Route exact path="/tasks" component= {Tasks}/>
          <Route exact path="/files" component= {Files}/>
          <Route exact path="/account" component= {Account}/>
          <Route exact path="/Contacts" component= {Contacts}/>
        </div>
      </Switch>
    </Router>
    </div>
  );
}

export default App;
