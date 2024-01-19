import { getAPI } from "./fetchAPI";
import { useState } from 'react';
import './emptyInstruments.css';

export default function EmptyInstruments({instrument}) {

    function selectInstrument(e){
        e.target.parentElement.classList.toggle('selectedInstrument');
        
    }

    function closePopUp(){
        let overlay = document.querySelector('.overlay');
        overlay.style.display = 'none';
    }

    function addInstrument(){
        let instruments = document.querySelectorAll('.selectedInstrument');
        let instrumentsId = [];
        for (const instrument of instruments) {
            instrumentsId.push(instrument.id);
        }
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(instrumentsId)
        };
        console.log(requestOptions.body);
        // fetch('https://harmonize.mael-mouquet.fr/api/user-instruments', requestOptions)
        // .then(response => response.json())
        // .then(data => {
        //     closePopUp();
        // });
        closePopUp();
    }

    return(
        <div className='overlay'>
                <div className='popUpInstrument'>
                    <p className='closePopUp' onClick={closePopUp}>X</p>
                    <h3>Ajoutez vos instruments !</h3>
                    <div className='instrumentList'>
                        {instrument.map((instrument) => {
                            return <div className='instrument' id={instrument.id} onClick={selectInstrument}>
                                <p>{instrument.Name}</p>
                            </div>
                        })}
                    </div>
                    <button className='addInstrument' onClick={addInstrument}>Ajouter</button>
                </div>
            </div>
    )
}