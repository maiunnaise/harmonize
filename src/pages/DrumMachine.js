import React, { useState, useEffect } from 'react';
import './Metronome.css';
import SimpleHeader from "../components/simpleHeader"

const DrumMachinePage = () => {
    const [pattern, setPattern] = useState(() => Array.from({ length: 8 }, () => Array(4).fill(false))); // 8 steps, 4 beats, initialized with all off
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);
  
    const drumSounds = {
      kick: "https://freewavesamples.com/files/Bass-Drum-1.wav",
      snare: "https://freewavesamples.com/files/Ensoniq-ESQ-1-Snare.wav",
      hiHat: "https://freewavesamples.com/files/Closed-Hi-Hat-1.wav",
      // Add more drum sounds and their URLs as needed
    };
  
    const toggleStep = (row, col) => {
      const newPattern = [...pattern];
      console.log(row,col);
      newPattern[row][col] = !newPattern[row][col];
      setPattern(newPattern);
    };
  
    const playStep = (step) => {
      pattern.forEach((row, index) => {
        if (row[step]) {
          const audio = new Audio(drumSounds[Object.keys(drumSounds)[index]]);
          audio.play();
        }
      });
    };
  
    const handlePlayPause = () => {
      setIsPlaying(!isPlaying);
      setCurrentStep(0);
    };
  
    useEffect(() => {
      let intervalId;
      if (isPlaying) {
        intervalId = setInterval(() => {
          playStep(currentStep);
          setCurrentStep((currentStep + 1) % pattern[0].length);
        }, 500); // Adjust the interval according to your tempo
      } else {
        clearInterval(intervalId);
      }
      return () => clearInterval(intervalId);
    }, [isPlaying, currentStep, pattern]);
  
    return (
      <div>
        <h1>Drum Machine</h1>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {pattern.map((row, rowIndex) => (
            <div key={rowIndex} style={{ display: 'flex' }}>
              {row.map((step, colIndex) => (
                <div
                key={colIndex}
                onClick={() => toggleStep(rowIndex, colIndex)}
                style={{
                  width: '30px',
                  height: '30px',
                  border: '1px solid black',
                  backgroundColor: step ? 'lightgray' : 'white',
                  margin: '2px',
                  cursor: 'pointer',
                  boxShadow: currentStep === colIndex ? 'inset 0px 0px 0px 2px red' : 'none', // Apply red shadow to currently playing step
                }}
              ></div>
              ))}
            </div>
          ))}
        </div>
        <button onClick={handlePlayPause}>{isPlaying ? 'Pause' : 'Play'}</button>
      </div>
    );
  };

export default function DrumMachine(){
    return (
    <div>
        {/* <SimpleHeader/>     */}
        <DrumMachinePage />
    </div>
    );
};