import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import facade from '../util/apiFacade';
import './TripDetails.css';

const TripDetails = () => {
  const { id } = useParams();
  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTripDetails = async () => {
      try {
        const data = await facade.fetchData(`/trips/${id}`, true);
        setTrip(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTripDetails();
  }, [id]);

  if (loading) return <div>Loading trip details...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!trip) return <div>Trip not found</div>;

  return (
    <div className='trip-details-container'>
      <div className='trip-details-card'>
        <h1>{trip.name}</h1>

        <div className='trip-info'>
          <p>
            <strong>Category:</strong> {trip.category}
          </p>
          <p>
            <strong>Price:</strong> ${trip.price}
          </p>
          <p>
            <strong>Start Time:</strong>{' '}
            {new Date(trip.starttime).toLocaleString()}
          </p>
          <p>
            <strong>End Time:</strong> {new Date(trip.endtime).toLocaleString()}
          </p>
        </div>

        {trip.guide && (
          <div className='guide-info'>
            <h2>Guide Information</h2>
            <p>
              <strong>Name:</strong> {trip.guide.firstname}{' '}
              {trip.guide.lastname}
            </p>
            <p>
              <strong>Email:</strong> {trip.guide.email}
            </p>
            <p>
              <strong>Phone:</strong> {trip.guide.phone}
            </p>
          </div>
        )}

        {trip.packingItems && trip.packingItems.length > 0 && (
          <div className='packing-list'>
            <h2>Packing List</h2>
            <div className='packing-items'>
              {trip.packingItems.map((item, index) => (
                <div key={index} className='packing-item'>
                  <h3>{item.name}</h3>
                  <p>
                    <strong>Quantity:</strong> {item.quantity}
                  </p>
                  <p>
                    <strong>Weight:</strong> {item.weightInGrams}g
                  </p>
                  <p>
                    <strong>Category:</strong> {item.category}
                  </p>
                  <p>
                    <strong>Description:</strong> {item.description}
                  </p>
                  {item.buyingOptions && item.buyingOptions.length > 0 && (
                    <div className='buying-options'>
                      <h4>Where to Buy:</h4>
                      {item.buyingOptions.map((option, idx) => (
                        <a
                          key={idx}
                          href={option.shopUrl}
                          target='_blank'
                          rel='noopener noreferrer'
                          className='buy-link'
                        >
                          {option.shopName} - ${option.price}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TripDetails;
