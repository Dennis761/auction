import React, { useState, useEffect } from 'react';

function Timer({ initialSeconds }) {
  const [seconds, setSeconds] = useState(initialSeconds);

  useEffect(() => {
    if (seconds > 0) {
      const intervalId = setInterval(() => {
        setSeconds(prevSeconds => prevSeconds - 1);
      }, 1000);

      // Очистка интервала при размонтировании компонента
      return () => clearInterval(intervalId);
    }
  }, [seconds]);

  // Функция для форматирования времени в мм:сс
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const timerContainerStyle = {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    height: '100vh',
    width: '100vw',
    fontFamily: 'Courier New, Courier, monospace',
    padding: '2vh'
  };

  const timerStyle = {
    padding: '2vh',
    border: '0.3vh solid #61dafb',
    borderRadius: '1vh',
    transition: 'all 0.5s ease',
    color: seconds < 20 ? 'red' : 'black',
    transform: seconds < 20 ? 'scale(1.2)' : 'scale(1)',
    backgroundColor: 'transparent'
  };

  return (
    <div style={timerContainerStyle}>
      <div style={timerStyle}>
        {formatTime(seconds)}
      </div>
    </div>
  );
}

export default Timer;
