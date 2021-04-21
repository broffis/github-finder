import { Fragment, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom'
import GithubContext from '../../context/github/githubContext';

import Spinner from '../layout/Spinner';
import Repos from '../repos/Repos';

const User = ({ match }) => {
  const githubContext = useContext(GithubContext);

  const { user, getUser, loading, getUserRepos, repos } = githubContext;

  useEffect(() => {
    getUser(match.params.login);
    getUserRepos(match.params.login);

    // eslint-disable-next-line
  }, [])

  const { 
    name,
    avatar_url,
    company,
    location,
    bio,
    blog,
    login,
    html_url,
    followers,
    following,
    public_repos,
    public_gists,
    hireable
  } = user

  if (loading) {
    return <Spinner />
  } else  {
    return (
      <Fragment>
        <Link to='/' className='btn btn-light'>
          Back to search
        </Link>
        Hireable: {''}
        { hireable ? 
          ( <i className="fas fa-check text-success" /> ) : 
          ( <i className="fas fa-times-circle text-danger" /> ) }

        <div className="card grid-2">
          <div className="all-center">
            <img className="round-img" src={avatar_url} alt="" style={{ width: '150px' }}/>
            <h1>{ name }</h1>
            <p>{ location }</p>
          </div>

          <div>
            { bio && (
              <Fragment>
                <h3>Bio</h3>
                <p>{ bio }</p>
              </Fragment>
            )}

            <a href={html_url} className="btn btn-dark my-1" target="_blank" rel="noreferrer">Visit Github Profile</a>

            <ul>
              <li>
                {
                  login && (
                    <Fragment>
                      <strong>Username:&nbsp;</strong>{login}
                    </Fragment>
                  )
                }
              </li>
              <li>
                {
                  company && (
                    <Fragment>
                      <strong>Company:&nbsp;</strong>{company}
                    </Fragment>
                  )
                }
              </li>
              <li>
                {
                  blog && (
                    <Fragment>
                      <strong>Website:&nbsp;</strong>{blog}
                    </Fragment>
                  )
                }
              </li>
            </ul>
          </div>
        </div>

        <div className="card text-center">
          <div className="badge badge-primary">Followers: { followers }</div>
          <div className="badge badge-success">Following: { following }</div>
          <div className="badge badge-light">Public Repos: { public_repos }</div>
          <div className="badge badge-dark">Public Gists: { public_gists }</div>
        </div>

        <Repos repos={repos} />
      </Fragment>
    )
  }
}

export default User
