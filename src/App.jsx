import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Navigate,
} from 'react-router-dom';
import MainLayout from './components/MainLayout';
import TripList from './components/TripList/TripList';
import Guides from './components/Guides';
import TripDetails from './components/TripDetails';
import CategoryFilter from './components/CategoryFilter/CategoryFilter';
import { useState, useEffect } from 'react';
import facade from './util/apiFacade';
import './App.css';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [trips, setTrips] = useState([]);
  const [filteredTrips, setFilteredTrips] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    if (loggedIn) {
      const roles = facade.getUserRoles();
      setUserRole(roles?.toLowerCase());
    }
  }, [loggedIn]);

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const response = await fetch(
          'https://tripapi.cphbusinessapps.dk/api/trips'
        );
        if (!response.ok) throw new Error(`Error: ${response.status}`);

        const data = await response.json();
        setTrips(data);
        setFilteredTrips(data);

        const uniqueCategories = [
          'All',
          ...new Set(data.map((trip) => trip.category)),
        ];
        setCategories(uniqueCategories);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTrips();
  }, []);

  const handleCategoryChange = (event) => {
    const category = event.target.value;
    setSelectedCategory(category);
    setFilteredTrips(
      category === 'All'
        ? trips
        : trips.filter((trip) => trip.category === category)
    );
  };

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route
        path='/'
        element={
          <MainLayout
            loggedIn={loggedIn}
            setLoggedIn={setLoggedIn}
            userRole={userRole}
          />
        }
      >
        <Route index element={<Navigate to='/trips' replace />} />
        <Route
          path='trips'
          element={
            <div className='trips'>
              <h1>Trips</h1>
              <CategoryFilter
                categories={categories}
                selectedCategory={selectedCategory}
                onCategoryChange={handleCategoryChange}
              />
              <TripList trips={filteredTrips} />
            </div>
          }
        />
        <Route
          path='guides'
          element={
            loggedIn && userRole === 'admin' ? (
              <Guides />
            ) : (
              <Navigate to='/trips' />
            )
          }
        />
        <Route
          path='trip/:id'
          element={
            loggedIn && userRole === 'user' ? (
              <TripDetails />
            ) : (
              <Navigate to='/trips' />
            )
          }
        />
      </Route>
    )
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return <RouterProvider router={router} />;
}

export default App;
