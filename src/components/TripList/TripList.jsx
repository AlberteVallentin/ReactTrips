import React from 'react';
import { useNavigate } from 'react-router-dom';
import './TripList.css';

const TripList = ({ trips }) => {
  const navigate = useNavigate();

  const handleTripClick = (tripId) => {
    navigate(`/trip/${tripId}`);
  };

  return (
    <div className='trip-container'>
      {trips.map((trip) => {
        const start = new Date(trip.starttime);
        const end = new Date(trip.endtime);

        return (
          <div
            className='trip-box'
            key={trip.id}
            onClick={() => handleTripClick(trip.id)}
          >
            <div className='trip-title'>{trip.name}</div>
            <div className='trip-details'>
              <p>
                <strong>Category:</strong> {trip.category}
              </p>
              <p>
                <strong>Price:</strong> ${trip.price}
              </p>
              <p>
                <strong>Start Date:</strong> {start.toLocaleString()}
              </p>
              <p>
                <strong>End Date:</strong> {end.toLocaleString()}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TripList;
