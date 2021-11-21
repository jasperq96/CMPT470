import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navigationbar from './components/NavigationBar';
import Calendar from './Pages/Calendar';
import Tasks from './Pages/Tasks';
import Files from './Pages/Files';
import Account from './Pages/Account';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <Router>
      <Navigationbar/>
      <Switch>
        <Route path="/Calendar" component= {Calendar} />
        <Route path="/Tasks" component= {Tasks}/>
        <Route path="/Files" component= {Files}/>
        <Route path="/Account" component= {Account}/>
      </Switch>
    </Router>
    </div>
  );
}

export default App;
