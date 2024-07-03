import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useDebounce from '../../Hooks/useDebounce.jsx';
import { createAuction } from '../../../Redux/Actions/OrganizerActions.js';
import { useNavigate } from 'react-router-dom';
import './SummitAuction.css';

const SummitAuction = () => {
  const [productInfo, setProductInfo] = useState({
    title: '',
    description: '',
    aboutProduct: '',
    imageURL: '',
    location: '',
    country: '',
    price: '',
    time: ''
  });

  const [successAlert, setSuccessAlert] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, sessions } = useSelector((state) => state.organizer);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductInfo({ ...productInfo, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createAuction(productInfo)).then((newSession) => {
      if (newSession) {
        navigate(`/summit-auction-product/${newSession._id}`);
        setSuccessAlert(true);
        setTimeout(() => setSuccessAlert(false), 3000);
      }
    }).catch((error) => {
      console.error(error);
    });
  };

  const debouncedSubmit = useDebounce(handleSubmit, 2500);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };
  return (
    <div className="product-create-set">
      <h2>Publish your product!</h2>
      {error && <p className="error-message" style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={(e) => debouncedSubmit(e)}>
        <div className="form-group">
          <label className="product-title">Product title:</label>
          <input
            type="text"
            id="product-title"
            placeholder="Input product title"
            value={productInfo.title}
            onChange={(e) => setProductInfo({ ...productInfo, title: e.target.value })}
            className="form-input"
            required
          />
          <span className="tooltip">Enter the title of your product</span>
        </div>
        <div className="form-group">
          <label className="product-description">Short description:</label>
          <input
            id="product-description"
            placeholder="Input short description"
            value={productInfo.description}
            onChange={(e) => setProductInfo({ ...productInfo, description: e.target.value })}
            className="form-input"
            required
          />
          <span className="tooltip">Provide a brief description</span>
        </div>
        <div className="form-group">
          <label className="product-about">About Product:</label>
          <textarea
            type="text"
            id="product-about"
            placeholder="Input info about product"
            value={productInfo.aboutProduct}
            onChange={(e) => setProductInfo({ ...productInfo, aboutProduct: e.target.value })}
            className="form-textarea"
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
                setProductInfo({ ...productInfo, imageURL: base64String });
              };
              reader.readAsDataURL(file);
            }}
            className="form-input"
          />
          <span className="tooltip">Upload an image of the product</span>
        </div>
        <div className="form-group">
          <label className="product-country">Country:</label>
          <input
            type="text"
            id="product-country"
            placeholder="Input product country"
            value={productInfo.country}
            onChange={(e) => setProductInfo({ ...productInfo, country: e.target.value })}
            className="form-input"
          />
          <span className="tooltip">Enter the country of origin</span>
        </div>
        <div className="form-group">
          <label className="product-location">Location:</label>
          <input
            type="text"
            id="product-location"
            placeholder="Input product location"
            value={productInfo.location}
            onChange={(e) => setProductInfo({ ...productInfo, location: e.target.value })}
            className="form-input"
          />
          <span className="tooltip">Specify the location of the product</span>
        </div>
        <div className="form-group">
          <label className="product-price">Price:</label>
          <input
            type="text"
            id="price"
            placeholder="Input product price"
            value={productInfo.price}
            onChange={(e) => setProductInfo({ ...productInfo, price: e.target.value })}
            className="form-input"
            required
          />
          <span className="tooltip">Set the price for the product</span>
        </div>
        <div className="form-group">
          <label className="product-time">Time:</label>
          <div className="time-control">
            <button type="button" onClick={() => setProductInfo({ ...productInfo, time: +productInfo.time + 5 })}>^</button>
            <span>{formatTime(productInfo.time)}</span>
            <button type="button" onClick={() => setProductInfo({ ...productInfo, time: Math.max(0, +productInfo.time - 5) })}>v</button>
          </div>
        </div>
        <div className="button-create-container">
          <button className="create-product-btn" type="submit" disabled={loading}>
            {loading ? 'Creating...' : 'Auction product'}
          </button>
        </div>
        {successAlert && <p className="success-alert active">Product successfully published!</p>}
      </form>
    </div>
  );
};

export default SummitAuction;