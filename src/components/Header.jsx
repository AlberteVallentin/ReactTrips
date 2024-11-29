import { useState } from 'react';
import { Link } from 'react-router-dom';
import facade from '../util/apiFacade';
import './Header.css';

const Header = ({ loggedIn, setLoggedIn }) => {
  const [loginCredentials, setLoginCredentials] = useState({
    username: '',
    password: '',
  });

  const performLogin = async (evt) => {
    evt.preventDefault();
    try {
      await facade.login(loginCredentials.username, loginCredentials.password);
      setLoggedIn(true);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const logout = () => {
    facade.logout();
    setLoggedIn(false);
  };

  const onChange = (evt) => {
    setLoginCredentials({
      ...loginCredentials,
      [evt.target.id]: evt.target.value,
    });
  };

  const userRoles = facade.getUserRoles().toLowerCase();

  return (
    <header className='header'>
      <div className='header-container'>
        <nav className='nav-links'>
          <Link to='/trips' className='nav-link'>
            Trips
          </Link>
          {loggedIn && userRoles.includes('admin') && (
            <Link to='/guides' className='nav-link'>
              Guides
            </Link>
          )}
        </nav>

        <div>
          {!loggedIn ? (
            <form onSubmit={performLogin} className='login-form'>
              <input
                type='text'
                id='username'
                placeholder='Username'
                value={loginCredentials.username}
                onChange={onChange}
                className='login-input'
              />
              <input
                type='password'
                id='password'
                placeholder='Password'
                value={loginCredentials.password}
                onChange={onChange}
                className='login-input'
              />
              <button type='submit' className='button login-button'>
                Login
              </button>
            </form>
          ) : (
            <div className='user-section'>
              <span className='welcome-text'>Welcome, {userRoles}</span>
              <button onClick={logout} className='button logout-button'>
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
