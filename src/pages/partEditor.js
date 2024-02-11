import CheckLogin from '../components/checkLogin';
import SimpleHeader from '../components/simpleHeader';
import './partEditor.css';
import { getAPI, postAPI, deleteAPI, putAPI } from '../components/fetchAPI';
import { useEffect, useState } from 'react';

export default function PartEditor() {
    CheckLogin();
    return(
        <div className='simpleContent'>
            <SimpleHeader />
            <h1>Éditeur de partition</h1>
            <PopUpPart content={<CreateNewPart/>}/>
        </div>

    )
}

function CreateNewPart(){

    const [instruments, setInstruments] = useState([]);
    useEffect(() => {
        async function fetchInstruments() {
            try {
                const response = await fetch('../data/instruments.json');
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await response.json();
                setInstruments(data.instruments);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        
        fetchInstruments();
    }, []);
    console.log(instruments);

    function addInstruments(e){
        console.log(e.target.value)

        instruments.map((instrument, index) => {
            let select = document.getElementById('instrument');
            if(instrument.name == e.target.value){
                select.disabled = false;
                select.innerHTML = "<option value=''>Choisir un instrument</option>";
                instrument.instruments.map((inst, index) => {
                    select.innerHTML += "<option value='"+inst.name+"'>"+inst.trad+"</option>";
                })
            }
            else if(e.target.value == ""){
                select.innerHTML = "<option value=''>Choisir un instrument</option>";
                select.disabled = true; 
            }
                
        })
    }

    return(
        <div id='overlayPartEdit' className='overlay'>
            <div id="popupPart">
                <p className="close" onClick={closePopUp}>X</p>
                <h2>Créer une partition</h2>
                <form action="" className='createNewPart'>
                    <label htmlFor="title">Titre de la partition</label>
                    <input type="text" name="title" id="title"/>
                    <label htmlFor="instrumentType">Instrument</label>
                    <div className='instrumentChoice'>
                        <select name="instrumentType" id="instrumentType" onChange={addInstruments}>
                            <option value="">Choisir un type</option>
                            {instruments.map((instrument, index) => {
                                return(
                                    <option value={instrument.name} key={index}>{instrument.trad}</option>
                                )
                            })}
                            
                        </select>
                        <select name="instrument" id="instrument" disabled>
                            <option value="">Choisir un instrument</option>
                        </select>
                    </div>
                    <div className='btnCreate'>Créer</div>
                </form>
            </div>
        </div>
    
    )

    

}

function closePopUp(){
    document.querySelector('.overlay').style.display = 'none';

}

function PopUpPart({content}){
    return(
        content
    )
}

function ChoosePart(){
    return(
        <div id='overlayPartEdit' className='overlay'>
            <div id="popupPart">
                <p className="close" onClick={closePopUp}>X</p>
                <h2>Choisir une partition</h2>
                
                <div className="choosePart">
                    <p>Dans votre bibliothèque :</p>
                    <select name="partitions" id="partitions">
                        <option value="">Vos partitions</option>
                        <option value="part1">Partition 1</option>
                    </select>
                    <div>Modifier cette partition</div>
                </div>

                <div className='btnCreate'>Créer une partition</div>
            </div>
        </div>
    )
}