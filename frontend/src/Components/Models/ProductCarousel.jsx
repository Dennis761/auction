import React, { useState } from 'react';
import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";
import ConfirmForm from '../Forms/ConfirmForm.jsx';

const ProductCarousel = ({ products }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [formState, setFormState] = useState(false);

  const handlePrevClick = () => {
    console.log('Prev Clicked');
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? products.length - 1 : prevIndex - 1
    );
    setFormState(false);
  };

  const handleNextClick = () => {
    console.log('Next Clicked');
    setCurrentIndex((prevIndex) =>
      prevIndex === products.length - 1 ? 0 : prevIndex + 1
    );
    setFormState(false);
  };

  const handleItemClick = () => {
    console.log('Item Clicked');
    setFormState(true);
  };

  const handleCloseForm = () => {
    console.log('Form Closed');
    setFormState(false);
  };

  const carouselContainerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '2vh',
  };

  const buttonStyle = {
    backgroundColor: '#ccc',
    border: 'none',
    padding: '1vh',
    cursor: 'pointer',
    fontSize: '3vh',
    marginLeft: '2vh',
    marginRight: '2vh',
  };

  const carouselContentStyle = {
    display: 'flex',
    overflow: 'hidden',
    width: '80vh',
    justifyContent: 'center',
    position: 'relative',
  };

  const carouselItemStyle = {
    flex: '0 0 100%',
    maxWidth: '100%',
    transition: 'transform 0.5s ease-in-out',
    textAlign: 'center',
    position: 'relative',
  };

  const imageStyle = {
    width: '100%',
    border: '1vh solid #000',
    cursor: 'pointer',
  };

  const timeblockContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '1.5vh',
  };

  const timeblockStyle = {
    width: '30vh',
    backgroundColor: '#f9f9f9',
    padding: '1.5vh',
    border: '0.5vh solid #ccc',
    borderRadius: '1.5vh',
    boxShadow: '0 0.6vh 1.2vh rgba(0, 0, 0, 0.1)',
    textAlign: 'left',
  };

  if (!products || products.length === 0) {
    return (
      <div style={carouselContainerStyle}>
        <p style={{
          fontSize: '5vh',
          color: 'white'
          }}>No products available</p>
      </div>
    );
  }

  return (
    <>
      <div style={carouselContainerStyle}>
        {formState && (
          <ConfirmForm
            productName={products[currentIndex].product.title}
            sessionId={products[currentIndex].session._id}
            onClose={handleCloseForm}
          />
        )} 
        {products.length > 1 && (
          <button
            style={buttonStyle}
            onClick={handlePrevClick}
            aria-label="Prev product"
          >
            <AiFillCaretLeft />
          </button>
        )}
        <div style={carouselContentStyle}>
          <div
            onClick={handleItemClick}
            style={carouselItemStyle}
          >
            <img
              src={products[currentIndex].product.imageURL}
              alt={products[currentIndex].product.title}
              style={imageStyle}
            />
            <div style={timeblockContainerStyle}>
              <div style={timeblockStyle}>
                <p><strong>Name:</strong> {products[currentIndex].product.title}</p>
                <p><strong>Time:</strong> {products[currentIndex].product.time}</p>
              </div>
            </div>
          </div>
        </div>
        {products.length > 1 && (
          <button
            style={buttonStyle}
            onClick={handleNextClick}
            aria-label="Next product"
          >
            <AiFillCaretRight />
          </button>
        )}
      </div>
    </>
  );
};

export default ProductCarousel;
