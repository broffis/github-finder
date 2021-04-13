import { Component, Fragment } from 'react';
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


class App extends Component {
  state = {
    users: [],
    user: {},
    loading: false,
    alert: null
  };

  async componentDidMount() {
    this.setState({ loading: true });

    const res = await axios.get(`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

    this.setState({
      loading: false,
      users: res.data
    });
  }

  clearUsers = () => {
    this.setState({ users: [] })
  }

  // Search GH Users
  searchUsers = async (text) => {
    this.setState({ loading: true });

    const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

    this.setState({
      loading: false,
      users: res.data.items
    })
  }

  // Get Single GH User
  getUser = async (username) => {
    this.setState({ loading: true });

    const res = await axios.get(`https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

    this.setState({
      loading: false,
      user: res.data
    })
  }

  setAlert = (msg, type) =>  {
    this.setState({ alert: { msg, type } });
    setTimeout(() => { this.setState({ alert: null })}, 5000)
  }

  render() {
    const { users, loading, alert, user } = this.state

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
                    clearUsers={this.clearUsers}
                    searchUsers={this.searchUsers}
                    showClear={ users.length > 0 ? true : false }
                    setAlert={this.setAlert}
                  />
                  <Users
                    loading={loading}
                    users={users}
                  />
                </Fragment>
              )} />
              
              <Route exact path="/about" component={ About }/>
              <Route exact path="/user/:login" render={props => (
                <User { ...props } getUser={this.getUser} user={user} loading={loading} />
              )} />
            </Switch>
            
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
