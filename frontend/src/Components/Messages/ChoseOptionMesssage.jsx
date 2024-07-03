import React from 'react';
import { Link } from 'react-router-dom';

const ChooseOptionMessage = () => {
  const handleMouseEnter = (event) => {
    event.target.style.backgroundColor = '#555';
  };

  const handleMouseLeave = (event) => {
    event.target.style.backgroundColor = '#fff';
  };

  return (
    <div style={styles.container}>
      <form style={styles.form}>
        <h2 style={styles.heading}>Choose Role</h2>
        <div style={styles.buttonContainer}>
          <Link
            to="/attend-an-auction"
            style={styles.button}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            Attend an Auction
          </Link>
          <Link
            to="/summit-an-auction"
            style={styles.button}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            Summit an Auction
          </Link>
        </div>
      </form>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#000',
  },
  form: {
    backgroundColor: '#fff',
    padding: '10vh',
    borderRadius: '3vh',
    border: '0.5vh solid #ccc',
    boxShadow: '0 0 3vh rgba(0, 0, 0, 0.5)',
    textAlign: 'center',
  },
  heading: {
    marginBottom: '10vh',
    fontSize: '5vh',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-around',
  },
  button: {
    backgroundColor: '#fff',
    border: '0.5vh solid #000',
    borderRadius: '3vh',
    padding: '1vh 4vh',
    cursor: 'pointer',
    fontSize: '5vh',
    transition: 'background-color 0.3s',
    margin: '0 2vh', 
    textDecoration: 'none',
    color: '#000',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
};

export default ChooseOptionMessage;
