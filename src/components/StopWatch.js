import React from 'react';
import { useStopwatch } from 'react-timer-hook';

function StopWatch() {
    const {
        seconds,
        minutes,
        hours,
        
        isRunning,
        start,
        pause,
        reset,
      } = useStopwatch({ autoStart: false });


  return (
    <div >
        
    <div >
      <span>{hours}</span>:<span>{minutes}</span>:<span>{seconds}</span>
    </div>
    <p>{isRunning ? 'Running' : 'Not running'}</p>
    <button onClick={start}>Start</button>
    <button onClick={pause}>Pause</button>
    <button onClick={reset}>Reset</button>
    </div>
  )
}

export default StopWatch