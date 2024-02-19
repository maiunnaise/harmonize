import React, { useState, useEffect } from 'react';
import './DrumMachine.css';
import SimpleHeader from "../components/simpleHeader"

const DrumMachinePage = () => {
    const [stepsNb, setStepsNb] = useState(12);
    const instruments = ['kick', 'snare', 'hiHat', 'crash', 'tom'];
    const [pattern, setPattern] = useState(() => Array.from({ length: instruments.length }, () => Array(stepsNb).fill(false)));
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);
    const [mutedRows, setMutedRows] = useState(Array(12).fill(false));
    const [volume, setVolume] = useState(1.0);
    const drumSounds = {
      kick: "https://freewavesamples.com/files/Bass-Drum-1.wav",
      snare: "https://freewavesamples.com/files/Ensoniq-ESQ-1-Snare.wav",
      hiHat: "https://freewavesamples.com/files/Closed-Hi-Hat-1.wav",
      crash: "https://freewavesamples.com/files/Crash-Cymbal-2.wav",
      tom : "https://freewavesamples.com/files/Electro-Tom.wav",
    };
    var [tempo, setTempo] = useState(130);

    var [drumColor, pressedColor, rowColor] = useState("#845583");

    if(localStorage.getItem('lightMode') == 'light'){
      drumColor = "white";
      pressedColor = "#efefef";
      rowColor = "#efefef";
    }
    else {
      drumColor = "#845583";
      pressedColor = "#474747";
      rowColor = "#474747";
    }

    function tempoToMs(tempo){
      return 60000/tempo;
    }
  
    const toggleStep = (row, col) => {
      const newPattern = [...pattern];
      newPattern[row][col] = !newPattern[row][col];
      setPattern(newPattern);
    };
    console.log(drumColor);
    const playStep = (step) => {
      pattern.forEach((row, index) => {
        let s = document.getElementById(`${index}-${step}`);
        if (row[step] && !mutedRows[index]) {
          s.style.backgroundColor= "#C182BF";
          setTimeout(() => {
            s.style.backgroundColor = "#845583";
          }, tempoToMs(tempo)/2);
          const audio = new Audio(drumSounds[Object.keys(drumSounds)[index]]);
          audio.volume = volume;
          audio.play();
        }
        
      });
    };
  
    const handlePlayPause = () => {
      setIsPlaying(!isPlaying);
      setCurrentStep(0);
    };

    const changeBPM = (e) => {
      if(e.target.value >= 20 && e.target.value <= 250){ 
        setTempo(e.target.value);
        let inputBPM = document.getElementById('inputBPM');
        inputBPM.value = e.target.value;
        let rangeBPM = document.getElementById('rangeBPM');
        rangeBPM.value = e.target.value
      }
    }

    const changeStepsNb = (e) => {
      if(e.target.value >= 8 && e.target.value <= 32){ 
        const newStepsNb = parseInt(e.target.value);
        setStepsNb(newStepsNb);
        let inputSteps = document.getElementById('inputSteps');
        inputSteps.value = e.target.value;
        let rangeSteps = document.getElementById('rangeSteps');
        rangeSteps.value = e.target.value;
        
        setPattern((prevPattern) => {
          const newPattern = prevPattern.map((row) => {
            const newRow = Array(newStepsNb).fill(false);
            for (let i = 0; i < Math.min(row.length, newStepsNb); i++) {
              newRow[i] = row[i];
            }
            return newRow;
          });
          return newPattern;
        });
      }
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
        row.style.backgroundColor = pressedColor;
      } else {
        muteBtn.style.backgroundColor = "#97e622";
        muteBtn.style.filter = "drop-shadow(0 0 0.2rem #97e622)";
        row.style.backgroundColor = rowColor;
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
      return {backgroundColor: drumColor};
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
        <div className="controls">
          <div>
            <label for="volume">Volume</label>
            <input name="volume" type="range" min="0" max="1" step="0.1" defaultValue={volume} onChange={e => setVolume(e.target.value)}/>
            <p>{(volume*10)}</p>
          </div>
          <div>
            <label for="bpm">BPM</label>
            <input name="bpm" type="range" min="20" id="rangeBPM" max="250" defaultValue={tempo} onChange={changeBPM}/>
            <input type="number" min="20" max="250" id="inputBPM" defaultValue={tempo} onChange={changeBPM}/>
          </div>
          <div>
            <label for="stepsNb">Steps</label>
            <input name="stepsNb" type="range" min="8" id="rangeSteps" max="32" step="4" defaultValue={stepsNb} onChange={changeStepsNb}/>
            <input type="number" min="8" max="32" id="inputSteps" defaultValue={stepsNb} onChange={changeStepsNb}/>
          </div>
        </div> 
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