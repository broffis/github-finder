import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import GithubState from './context/github/GithubState';
import AlertState from './context/alert/AlertState';

import './App.css';

// Pages
import About from './components/pages/About';
import Home from './components/pages/Home';
import NotFound from './components/pages/NotFound'

// Layout
import Alert from './components/layout/Alert';
import Navbar from './components/layout/Navbar';

// User
import User from './components/users/User';



const App= () => {

  return (
    <GithubState>
      <AlertState>
        <Router>
          <div className="App">
            <Navbar />
            <div className="container">
              <Alert />
              <Switch>
                <Route exact path="/" component={ Home }/>
                <Route exact path="/about" component={ About }/>
                <Route exact path="/user/:login" component={ User } />
                <Route component={ NotFound } />
              </Switch>
              
            </div>
          </div>
        </Router>
      </AlertState>
      </GithubState>
  );
}

export default App;
