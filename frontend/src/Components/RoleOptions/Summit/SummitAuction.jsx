import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import useDebounce from '../../Hooks/useDebounce.jsx';
import { createSession } from '../../../Redux/Actions/AuctionSessionActions.js';
import './SummitAuction.css';

export default function SummitAuction() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [aboutProduct, setAboutProduct] = useState('');
  const [location, setLocation] = useState('');
  const [country, setCountry] = useState('');
  const [imageURL, setImageURL] = useState('');
  const [price, setPrice] = useState('');
  const [time, setTime] = useState(0);
  const [successAlert, setSuccessAlert] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const lastCreatedProduct = useSelector((state) => state.auctionSession.lastCreatedProduct);
 
  useEffect(() => {
    if (lastCreatedProduct && lastCreatedProduct._id) {
      navigate(`/summit-auction-product/${lastCreatedProduct._id}`);
    }
  }, [lastCreatedProduct, navigate]);

  const formatString = (str) => {
    return str.match(/.{1,30}/g).join('\n');
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return minutes > 0
      ? `${minutes} минут${minutes > 1 ? 'ы' : 'а'} ${remainingSeconds} секунд${remainingSeconds > 1 ? 'ы' : 'а'}`
      : `${seconds} секунд${seconds > 1 ? 'ы' : 'а'}`;
  };

  const publishNewProduct = useCallback(() => {
    let formattedDescription = formatString(description);
    let formattedAboutProduct = formatString(aboutProduct);

    const data = { title, description: formattedDescription, aboutProduct: formattedAboutProduct, imageURL, location, country, price, time };

    if (data) {
      dispatch(createSession(data));
      setSuccessAlert(true);
      setTimeout(() => {
        setTitle('');
        setDescription('');
        setAboutProduct('');
        setLocation('');
        setCountry('');
        setImageURL('');
        setPrice('');
        setTime(0);
        setSuccessAlert(false);
      }, 2500);
    }
  }, [title, description, aboutProduct, imageURL, location, country, price, time, dispatch]);

  const debounced = useDebounce(publishNewProduct, 2500);

  return (
    <div className='product-create-set'>
      <h2>Publish your product!</h2>
      <div className="form-group">
        <label className="product-title">Product title:</label>
        <input
          type="text"
          id="product-title"
          placeholder='Input product title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <span className="tooltip">Enter the title of your product</span>
      </div>
      <div className="form-group">
        <label className="product-description">Short description:</label>
        <input
          id="product-description"
          placeholder='Input short description'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <span className="tooltip">Provide a brief description</span>
      </div>
      <div className="form-group">
        <label className="product-about">About Product:</label>
        <textarea
          type="text"
          id="product-about"
          placeholder='Input info about product'
          value={aboutProduct}
          onChange={(e) => setAboutProduct(e.target.value)}
        />
        <span className="tooltip">Describe your product in detail</span>
      </div>
      <div className="form-group">
        <label className="product-image">Image:</label>
        <input
          type="file"
          id="product-image"
          onChange={(e) => {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
              const base64String = reader.result;
              setImageURL(base64String);
            };
            reader.readAsDataURL(file);
          }}
        />
        <span className="tooltip">Upload an image of the product</span>
      </div>
      <div className="form-group">
        <label className="product-country">Country:</label>
        <input
          type="text"
          id="product-country"
          placeholder='Input product country'
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        />
        <span className="tooltip">Enter the country of origin</span>
      </div>
      <div className="form-group">
        <label className="product-location">Location:</label>
        <input
          type="text"
          id="product-location"
          placeholder='Input product location'
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <span className="tooltip">Specify the location of the product</span>
      </div>
      <div className="form-group">
        <label className="product-price">Price:</label>
        <input
          type="text"
          id="price"
          placeholder='Input product price'
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <span className="tooltip">Set the price for the product</span>
      </div>
      <div className="form-group">
        <label className="product-time">Time:</label>
        <div className="time-control">
          <button onClick={() => setTime(time + 5)}>^</button>
          <span>{formatTime(time)}</span>
          <button onClick={() => setTime(Math.max(0, time - 5))}>v</button>
        </div>
      </div>
      <div className="button-create-container">
        <button className='create-product-btn' onClick={debounced}>Auction product</button>
      </div>
      {successAlert && <p className="success-alert active">Product successfully published!</p>}
    </div>
  );
}
