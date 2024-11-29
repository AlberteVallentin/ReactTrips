import { useState, useEffect } from 'react';
import './App.css';
import './reset.css';
import CategoryFilter from './components/CategoryFilter/CategoryFilter';
import TripList from './components/TripList/TripList';
import TripModal from './components/TripModal/TripModal';

function App() {
  const [trips, setTrips] = useState([]);
  const [filteredTrips, setFilteredTrips] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tripDetails, setTripDetails] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Fetch trips and populate categories
  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const response = await fetch(
          'https://tripapi.cphbusinessapps.dk/api/trips'
        );
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
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

  // Handle category selection
  const handleCategoryChange = (event) => {
    const category = event.target.value;
    setSelectedCategory(category);

    if (category === 'All') {
      setFilteredTrips(trips);
    } else {
      const filtered = trips.filter((trip) => trip.category === category);
      setFilteredTrips(filtered);
    }
  };

  // Fetch trip details
  const handleTripClick = async (tripId) => {
    console.log(`Trip clicked: ${tripId}`);
    try {
      const response = await fetch(
        `https://tripapi.cphbusinessapps.dk/api/trips/${tripId}`
      );
      console.log('Response:', response);
      if (!response.ok) {
        throw new Error(`Failed to fetch trip details for ID: ${tripId}`);
      }
      const trip = await response.json();
      console.log('Trip details:', trip);
      setTripDetails(trip);
      setShowModal(true);
    } catch (error) {
      console.error('Error fetching trip details:', error);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setTripDetails(null);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className='trips'>
      <h1>Trips</h1>
      {/* Category filter */}
      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />

      {/* Trip list */}
      <TripList trips={filteredTrips} onTripClick={handleTripClick} />

      {/* Modal for trip details */}
      {showModal && (
        <TripModal tripDetails={tripDetails} onClose={closeModal} />
      )}
    </div>
  );
}

export default App;
