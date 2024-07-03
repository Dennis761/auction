import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { joinSession } from '../../Redux/Actions/AuctionSessionActions.js';

const ConfirmMessage = ({ productName, sessionId, onClose }) => {
  const dispatch = useDispatch();
  const [isHovering, setIsHovering] = useState(false);

  const handleConfirm = () => {
    dispatch(joinSession(sessionId));
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
        <h2>Confirm</h2>
        <p>You want to attend in "{productName}" auction?</p>
        <Link to={`/attend-auction-product/${sessionId}`}>
          <button
            style={styles.linkButton}
            onClick={handleConfirm}
          >
            Yes, I do
          </button>
        </Link>
        <button
          onClick={onClose}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          style={isHovering ? { ...styles.button, ...styles.buttonHover } : styles.button}
        >
          Cancel
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
    zIndex: 1000,
  },
  formContainer: {
    background: 'white',
    padding: '3vh',
    borderRadius: '1vh',
    boxShadow: '0 0.3vh 1.5vh rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    zIndex: 1010,
  },
  button: {
    padding: '1.5vh 3vh',
    marginTop: '3vh',
    marginLeft: '2vh',
    cursor: 'pointer',
    borderRadius: '0.75vh',
    border: '0.15vh solid #ccc',
    background: 'white',
    transition: 'background 0.3s, color 0.3s',
  },
  buttonHover: {
    background: '#007bff',
    color: 'white',
  },
  linkButton: {
    padding: '1.5vh 3vh',
    marginTop: '3vh',
    marginRight: '2vh',
    cursor: 'pointer',
    borderRadius: '0.75vh',
    border: 'none',
    background: '#28a745',
    color: 'white',
    textDecoration: 'none',
    transition: 'background 0.3s, color 0.3s',
  },
};

export default ConfirmMessage;
