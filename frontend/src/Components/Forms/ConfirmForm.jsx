import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { joinSession } from '../../Redux/Actions/AuctionSessionActions.js';

const ConfirmForm = ({ productId, onClose }) => {
  const dispatch = useDispatch();
  const [isHovering, setIsHovering] = useState(false);

  const handleConfirm = () => {
    dispatch(joinSession(productId));
  };

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.formContainer}>
        <h2>Подтверждение</h2>
        <p>Вы выбрали продукт с ID: {productId}</p>
        <Link to={`/attend-auction-product/${productId}`}>
          <button
            style={styles.linkButton}
            onClick={handleConfirm}
          >
            Перейти к продукту
          </button>
        </Link>
        <button
          onClick={onClose}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          style={isHovering ? { ...styles.button, ...styles.buttonHover } : styles.button}
        >
          Закрыть
        </button>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000, // Ensure it overlays other content
  },
  formContainer: {
    background: 'white',
    padding: '3vh', // Converted px to vh
    borderRadius: '1vh', // Converted px to vh
    boxShadow: '0 0.3vh 1.5vh rgba(0, 0, 0, 0.1)', // Converted px to vh
    textAlign: 'center',
    zIndex: 1010, // Ensure it overlays the overlay
  },
  button: {
    padding: '1.5vh 3vh', // Converted px to vh
    marginTop: '3vh', // Converted px to vh
    marginLeft: '2vh', // Converted px to vh
    cursor: 'pointer',
    borderRadius: '0.75vh', // Converted px to vh
    border: '0.15vh solid #ccc', // Converted px to vh
    background: 'white',
    transition: 'background 0.3s, color 0.3s',
  },
  buttonHover: {
    background: '#007bff',
    color: 'white',
  },
  linkButton: {
    padding: '1.5vh 3vh', // Converted px to vh
    marginTop: '3vh', // Converted px to vh
    marginRight: '2vh', // Converted px to vh
    cursor: 'pointer',
    borderRadius: '0.75vh', // Converted px to vh
    border: 'none',
    background: '#28a745',
    color: 'white',
    textDecoration: 'none',
    transition: 'background 0.3s, color 0.3s',
  },
};

export default ConfirmForm;
