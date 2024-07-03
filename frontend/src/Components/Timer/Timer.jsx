import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const TimerContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  height: 40vh;
  width: 40vh;
  font-family: 'Courier New', Courier, monospace;
  padding: 2vh;
`;

const TimerDisplay = styled.div`
  font-size: 8vh;
  padding: 2vh;
  height: 8vh; 
  width: 20vh; 
  border: 0.3vh solid #61dafb;
  border-radius: 3.5vh;
  transition: all 0.5s ease;
  color: ${props => (props.seconds < 20 ? 'red' : 'black')};
  transform: ${props => (props.seconds < 20 ? 'scale(1.2)' : 'scale(1)')};
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function Timer({ initialSeconds }) {
  const remainingTime = useSelector((state) => state.organizer.remainingTime);
  const [seconds, setSeconds] = useState(initialSeconds || 0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (remainingTime !== null && !isRunning) {
      setSeconds(Math.ceil(remainingTime / 1000)); // Convert milliseconds to whole seconds
      setIsRunning(true);
    }
  }, [remainingTime, isRunning]);

  useEffect(() => {
    if (isRunning && seconds > 0) {
      const intervalId = setInterval(() => {
        setSeconds(prevSeconds => {
          const newSeconds = Math.max(0, prevSeconds - 1);
          if (newSeconds === 0) {
            setIsRunning(false);
          }
          return newSeconds;
        });
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [isRunning, seconds]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return ( 
    <TimerContainer>
      <TimerDisplay seconds={seconds}>
        {formatTime(seconds)}
      </TimerDisplay>
    </TimerContainer>
  );
}

export default Timer;
