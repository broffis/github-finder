import { Fragment, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import axios from 'axios';

import './App.css';

// Pages
import About from './components/pages/About';

// Layout
import Alert from './components/layout/Alert';
import Navbar from './components/layout/Navbar';

// Users
import Search from './components/users/Search';
import User from './components/users/User';
import Users from './components/users/Users';


const App= () => {
  // state = {
  //   users: [],
  //   user: {},
  //   repos: [],
  //   loading: false,
  //   alert: null
  // };


  const [ users, setUsers ] = useState([]);
  const [ user, setUser ] = useState({});
  const [ repos, setRepos ] = useState([]);
  const [ loading, setLoading ] = useState(false);
  const [ alert, setAlert ] = useState(null);

  const clearUsers = () => {
    this.setState({ users: [] })
  }

  // Search GH Users
  const searchUsers = async (text) => {
    setLoading(true);

    const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

    setUsers(res.data.items);
    setLoading(false);
  }

  // Get Single GH User
  const getUser = async (username) => {
    setLoading(true);

    const res = await axios.get(`https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

    setUser(res.data);
    setLoading(false);
  }

  // Get user repos
  const getUserRepos = async username => {
    setLoading(true);

    const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

    setRepos(res.data);
    setLoading(false);
  }

  const showAlert = (msg, type) =>  {
    setAlert({ msg, type });
    setTimeout(() => {setAlert(null)}, 5000);
  }

  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="container">
          <Alert alert={alert} />
          <Switch>
            <Route exact path="/" render={props => (
              <Fragment>
                <Search
                  clearUsers={clearUsers}
                  searchUsers={searchUsers}
                  showClear={ users.length > 0 ? true : false }
                  setAlert={showAlert}
                />
                <Users
                  loading={loading}
                  users={users}
                />
              </Fragment>
            )} />
            
            <Route exact path="/about" component={ About }/>
            <Route exact path="/user/:login" render={props => (
              <User { ...props } getUser={getUser} user={user} loading={loading} repos={repos} getUserRepos={getUserRepos}/>
            )} />
          </Switch>
          
        </div>
      </div>
    </Router>
  );
}

export default App;
