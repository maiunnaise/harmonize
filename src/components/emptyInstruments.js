import './emptyInstruments.css';
import manageCache from '../components/cache';
import { useState } from 'react';


export default function EmptyInstruments({instrument}) {
    const [instruments, setInstruments] = useState([]);

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
            headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem('token') },
            body: JSON.stringify({"instrumentList":instrumentsId})
        };
        fetch('https://harmonize.mael-mouquet.fr/api/user-instruments', requestOptions)
        .then(response => response.json())
        .then(data => {
            //sessionStorage.setItem('user-instruments', JSON.stringify({ data.Instrument, cacheTime: new Date().getTime() }));
            closePopUp();
        });

        //manageCache('user-instruments', 604800, setInstruments, 'user-instruments');

    }
    

    return(
        <div className='overlay'>
                <div className='popUpInstrument'>
                    <p className='closePopUp' onClick={closePopUp}>X</p>
                    <h3>Ajoutez vos instruments !</h3>
                    <div className='instrumentList'>
                        {instrument.map((instrument, index) => {
                            return <div className='instrument' id={instrument.id} onClick={selectInstrument} key={index}>
                                <p>{instrument.Name}</p>
                            </div>
                        })}
                    </div>
                    <button className='addInstrument' onClick={addInstrument}>Ajouter</button>
                </div>
            </div>
    )
}