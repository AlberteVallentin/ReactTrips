import { Outlet } from 'react-router-dom';
import Header from './Header';

function MainLayout({ loggedIn, setLoggedIn, userRole }) {
  return (
    <div>
      <Header
        loggedIn={loggedIn}
        setLoggedIn={setLoggedIn}
        userRole={userRole}
      />
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default MainLayout;
