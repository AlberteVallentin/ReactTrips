import React, { useState, useEffect } from 'react';
import facade from '../util/apiFacade';
import './Guides.css';

const Guides = () => {
  const [guides, setGuides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGuides = async () => {
      try {
        const data = await facade.fetchData('/guides', true);
        setGuides(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchGuides();
  }, []);

  if (loading) return <div>Loading guides...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className='guides-container'>
      <h1>Our Guides</h1>
      <div className='guides-grid'>
        {guides.map((guide) => (
          <div key={guide.id} className='guide-card'>
            <h2>
              {guide.firstname} {guide.lastname}
            </h2>
            <div className='guide-details'>
              <p>
                <strong>Email:</strong> {guide.email}
              </p>
              <p>
                <strong>Phone:</strong> {guide.phone}
              </p>
              <p>
                <strong>Gender:</strong> {guide.gender}
              </p>
              <p>
                <strong>Birth Year:</strong> {guide.birthYear}
              </p>
              <p>
                <strong>Profile:</strong> {guide.profile}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Guides;
