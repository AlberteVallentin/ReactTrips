import { useState } from 'react';
import { Link } from 'react-router-dom';
import facade from '../util/apiFacade';

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
      setLoginCredentials({ username: '', password: '' });
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

  return (
    <header className='p-4 bg-gray-100'>
      <div className='flex justify-between items-center'>
        <nav>
          <Link to='/trips' className='mr-4'>
            Trips
          </Link>
          {facade.hasUserAccess('ADMIN', loggedIn) && (
            <Link to='/guides' className='mr-4'>
              Guides
            </Link>
          )}
          {facade.hasUserAccess('USER', loggedIn) && (
            <Link to='/trip/1' className='mr-4'>
              Trip Details
            </Link>
          )}
        </nav>

        <div>
          {!loggedIn ? (
            <form onSubmit={performLogin} className='flex gap-2'>
              <input
                type='text'
                id='username'
                placeholder='Username'
                value={loginCredentials.username}
                onChange={onChange}
                className='px-2 py-1 border rounded'
              />
              <input
                type='password'
                id='password'
                placeholder='Password'
                value={loginCredentials.password}
                onChange={onChange}
                className='px-2 py-1 border rounded'
              />
              <button
                type='submit'
                className='px-4 py-1 bg-blue-500 text-white rounded'
              >
                Login
              </button>
            </form>
          ) : (
            <div className='flex items-center gap-4'>
              <span>Welcome, {loginCredentials.username}</span>
              <button
                onClick={logout}
                className='px-4 py-1 bg-red-500 text-white rounded'
              >
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
