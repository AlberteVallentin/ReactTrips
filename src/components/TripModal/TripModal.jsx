import React from 'react';
import './TripModal.css';

const TripModal = ({ tripDetails, onClose }) => {
  if (!tripDetails) return null;

  const { id, name, category, price, starttime, endtime, packingItems, guide } =
    tripDetails;

  return (
    <div className='modal'>
      <div className='modal-content'>
        <button className='close' onClick={onClose}>
          &times;
        </button>
        <h2>{name}</h2>
        <p>
          <strong>Trip ID:</strong> {id}
        </p>
        <p>
          <strong>Category:</strong> {category}
        </p>
        <p>
          <strong>Price:</strong> ${price}
        </p>
        <p>
          <strong>Start Date:</strong> {new Date(starttime).toLocaleString()}
        </p>
        <p>
          <strong>End Date:</strong> {new Date(endtime).toLocaleString()}
        </p>

        {guide && (
          <div>
            <h3>Guide Details</h3>
            <p>
              <strong>Name:</strong> {guide.firstname} {guide.lastname}
            </p>
            <p>
              <strong>Email:</strong> {guide.email}
            </p>
            <p>
              <strong>Phone:</strong> {guide.phone}
            </p>
          </div>
        )}

        <h3>Packing Items</h3>
        {packingItems?.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Item Name</th>
                <th>Weight (grams)</th>
                <th>Quantity</th>
                <th>Description</th>
                <th>Category</th>
                <th>Available Buying Options</th>
              </tr>
            </thead>
            <tbody>
              {packingItems.map((item, index) => (
                <tr key={index}>
                  <td>{item.name}</td>
                  <td>{item.weightInGrams}</td>
                  <td>{item.quantity}</td>
                  <td>{item.description}</td>
                  <td>{item.category}</td>
                  <td>
                    {item.buyingOptions?.map((option, idx) => (
                      <div key={idx}>
                        <a
                          href={option.shopUrl}
                          target='_blank'
                          rel='noopener noreferrer'
                        >
                          {option.shopName} (${option.price})
                        </a>
                      </div>
                    ))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No packing items available.</p>
        )}
      </div>
    </div>
  );
};

export default TripModal;
