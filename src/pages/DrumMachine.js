import React, { useState, useEffect } from 'react';
import './DrumMachine.css';
import SimpleHeader from "../components/simpleHeader"

const DrumMachinePage = () => {
    const [stepsNb, setStepsNb] = useState(12);
    const [pattern, setPattern] = useState(() => Array.from({ length: 3 }, () => Array(stepsNb).fill(false)));
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);
    const [mutedRows, setMutedRows] = useState(Array(12).fill(false));
    const instruments = ['kick', 'snare', 'hiHat'];
    const drumSounds = {
      kick: "https://freewavesamples.com/files/Bass-Drum-1.wav",
      snare: "https://freewavesamples.com/files/Ensoniq-ESQ-1-Snare.wav",
      hiHat: "https://freewavesamples.com/files/Closed-Hi-Hat-1.wav",
      // Add more drum sounds and their URLs as needed
    };
    var [tempo, setTempo] = useState(130);

    function tempoToMs(tempo){
      return 60000/tempo;
    }
  
    const toggleStep = (row, col) => {
      const newPattern = [...pattern];
      newPattern[row][col] = !newPattern[row][col];
      setPattern(newPattern);
    };
  
    const playStep = (step) => {
      pattern.forEach((row, index) => {
        let s = document.getElementById(`${index}-${step}`);
        if (row[step] && !mutedRows[index]) {
          s.style.backgroundColor= "#C182BF";
          setTimeout(() => {
            s.style.backgroundColor = "#845583";
          }, tempoToMs(tempo)/2);
          const audio = new Audio(drumSounds[Object.keys(drumSounds)[index]]);
          audio.play();
        }
        
      });
    };
  
    const handlePlayPause = () => {
      setIsPlaying(!isPlaying);
      setCurrentStep(0);
    };

    const changeBPM = (e) => {
      setTempo(e.target.value);
    }

    const changeStepsNb = (e) => {
      const newStepsNb = parseInt(e.target.value);
      setStepsNb(newStepsNb);
      setCurrentStep(0);
      setPattern((prevPattern) => {
        const newPattern = prevPattern.map((row) => {
          const newRow = [...row];
          newRow.length = newStepsNb;
          return newRow;
        });
        return newPattern;
      });
    }

    const toggleMute = (rowIndex) => {
      const newMutedRows = [...mutedRows];
      newMutedRows[rowIndex] = !newMutedRows[rowIndex];
      setMutedRows(newMutedRows);
      let row = document.getElementById(rowIndex);
      let muteBtn = row.querySelector('.muteBtn');
      if (newMutedRows[rowIndex]) {
        muteBtn.style.backgroundColor = "#4C4C4C";
        muteBtn.style.filter = "drop-shadow(0 0 0.2rem #4C4C4C)";
        row.style.backgroundColor = "#303030";
      } else {
        muteBtn.style.backgroundColor = "#97e622";
        muteBtn.style.filter = "drop-shadow(0 0 0.2rem #97e622)";
        row.style.backgroundColor = "#393939";
      }
    };
  
    useEffect(() => {
      let intervalId;
      if (isPlaying) {
        intervalId = setInterval(() => {
          playStep(currentStep);
          setCurrentStep((currentStep + 1) % pattern[0].length);
        }, tempoToMs(tempo)/2); 
      } else {
        clearInterval(intervalId);
      }
      return () => clearInterval(intervalId);
    }, [isPlaying, currentStep, pattern]);

    const styleSteps = (rowIndex, colIndex) => {
      if (pattern[rowIndex][colIndex]) {
        if (mutedRows[rowIndex]) { 
          return { backgroundColor: '#845583', opacity: '0.3' }; 
        }
        return { backgroundColor: '#845583' }; 
      }
      return {backgroundColor: '#2d2d2d'};
    };
  
    return (
      <div>
        <h1>Boîte à rythmes</h1>
        <div className="grid">
          {pattern.map((row, rowIndex) => (
            <div key={rowIndex}>
              <div id={rowIndex} onClick={() => toggleMute(rowIndex)}>
                <span className='muteBtn'></span>
                <p>{instruments[rowIndex]}</p>
              </div>
              <div>
                {row.map((step, colIndex) => (
                  <div
                  key={colIndex}
                  id={`${rowIndex}-${colIndex}`}
                  onClick={() => toggleStep(rowIndex, colIndex)}
                  style={{
                    ...styleSteps(rowIndex, colIndex)
                  }}
                  ></div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <label for="bpm">BPM</label>
        <input name="bpm" type="range" min="20" max="300" defaultValue={tempo} onChange={changeBPM}/>
        <label for="stepsNb">Steps</label>
        <input name="stepsNb" type="range" min="8" max="32" step="2" defaultValue={stepsNb} onChange={changeStepsNb}/>
        <p className='displayBPM'>{tempo}</p>
        <p className='displaySteps'>{stepsNb}</p>
        <button className="playBtn" onClick={handlePlayPause}>{isPlaying ? 'Pause' : 'Play'}</button>
      </div>
    );
  };

export default function DrumMachine(){
    return (
    <div className='DrumMachine'>
        <SimpleHeader/>    
        <DrumMachinePage />
    </div>
    );
};