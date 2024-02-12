import CheckLogin from '../components/checkLogin';
import SimpleHeader from '../components/simpleHeader';
import './partEditor.css';
import { getAPI, postAPI, deleteAPI, putAPI } from '../components/fetchAPI';
import { useEffect, useState } from 'react';
import { decodeToken } from 'react-jwt';
import Embed from 'flat-embed';

export default function PartEditor() {
    CheckLogin();
    const [isCreated, setIsCreated]= useState(false);
    const [partData, setPartData] = useState([]);
    //const [showCreatePart, setShowCreatePart] = useState(false);
    const [changeContent, setChangeContent] = useState(false);

    useEffect(() => {
       if (isCreated ===true){
        closePopUp();
       }
    }, [isCreated]);

    function ChoosePart(){
        const test = {title: "PartitionTest", id: "65ca3f0732e4e7dea04b40c2"};
        return(
            <div id='overlayPartEdit' className='overlay'>
                <div id="popupPart">
                    <p className="close" onClick={closePopUp}>X</p>
                    <h2>Choisir une partition</h2>
                    
                    <div className="choosePart">
                        <p>Dans votre bibliothèque :</p>
                        <select name="partitions" id="partitions">
                            <option value="">Vos partitions</option>
                            <option value="65ca3f0732e4e7dea04b40c2" >Partition test</option>
                        </select>
                        <div onClick={()=> {setIsCreated(true); setPartData(test)}}>Modifier cette partition</div>
                    </div>
    
                    <div className='btnCreate' onClick={()=>setChangeContent(true)}>Créer une partition</div>
                </div>
            </div>
        )
    }

    return(
        <div className='simpleContent' id='partEdit'>
            <SimpleHeader />
            <h1>Éditeur de partition</h1>
            <PopUpPart content={changeContent ? <CreateNewPart isCreated={setIsCreated} setData={setPartData}/> : <ChoosePart />} />
            {isCreated && partData.length!=0 ? <EmbedEditor data={partData}/> :null}
        </div>

    )
}

function EmbedEditor({data}){

    let container;
    const [embed, setEmbed]=useState({});
    const [scoreKey, setScoreKey] = useState()
    //const [postRevision, setPostRevision] = useState(false)
    useEffect(()=>{
        console.log(data)
        if(data.length !=0){
            setScoreKey(data.id)
            console.log(scoreKey)
            container = document.querySelector('#partEdit .embedEdit');
            setEmbed(new Embed(container,{
                score: data.id,
                embedParams:{
                    appId: "65819d1caf8624704c5475eb",
                    controlsPosition:"bottom",
                    themeScoreBackground: "transparent",
                    branding: false,
                    controlsPrint: false,
                    themePrimary: "#845583",
                    mode:"edit"
                }
            }))
            
            
        }
        
    }, [data])

    // useEffect(()=>{
    //     if(postRevision === true){
    //         console.log(scoreKey, embed)
    //         savePart(scoreKey);
    //     }

    // },[postRevision])

    function savePart(scoreKey){
        console.log(embed)
        embed.getMusicXML().then(function(xml){
            console.log(scoreKey);
            const revision = {
                data:xml
            }
            const addRevision = async () => {
                await fetch('https://api.flat.io/v2/scores/'+scoreKey+'/revisions', {method: 'POST', headers: { 'Content-Type': 'application/json','Authorization': 'Bearer 21f9066ad7206af44f3965071e0e6dae3f4cd036a655a96c4026037ab51e01eea3ef4ae9a5074a7f5e461b083252f433edebd5c5a2172acec5277dca0111ca8a'}, body:JSON.stringify(revision)})
                .then(response => response.json())
                .catch((error) => {
                    return; 
                })
                .then(data => {
                    console.log(data);
                });
            };

            addRevision();
            //setPostRevision(false);
        })

    }

    return(
        <>
            <h2>{data.title}</h2>
            
            <div className='embedEdit'>
            </div>

            <div className='savePart' onClick={() => savePart(scoreKey)}>Sauvegarder</div>
        </>
    )
}



function CreateNewPart({isCreated, setData}){

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
                    select.innerHTML += `<option value="${inst.name}" ${inst.premium ? 'disabled' : ''}>
                    ${inst.trad}${inst.premium ? " - Premium" : ""}
                </option>`;
            })
            }
            else if(e.target.value == ""){
                select.innerHTML = "<option value=''>Choisir un instrument</option>";
                select.disabled = true; 
            }
                
        })
    }

    function generatePart(){
        let title = document.querySelector('#title');
        let instrumentType = document.querySelector('#instrumentType');
        let instrument = document.querySelector('#instrument');
    
        console.log(title.value, instrumentType.value, instrument.value)
    
        let body = {
            'title': title.value,
            'privacy': "public",
            "builderData":{
                "scoreData":{
                    "instruments":[
                        {
                            "group":instrumentType.value,
                            "instrument": instrument.value
                        }
                    ]
                },
            }
        }
    
        console.log(JSON.stringify(body))
    
        const addPart = async () => {
            await fetch('https://api.flat.io/v2/scores', {method: 'POST', headers: { 'Content-Type': 'application/json','Authorization': 'Bearer 21f9066ad7206af44f3965071e0e6dae3f4cd036a655a96c4026037ab51e01eea3ef4ae9a5074a7f5e461b083252f433edebd5c5a2172acec5277dca0111ca8a'}, body:JSON.stringify(body)})
            .then(response => response.json())
            .catch((error) => {
                return; 
            })
            .then(data => {
                setData(data);
                isCreated(true);
            });
        };
    
        addPart();
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
                    <div className='btnCreate' onClick={generatePart}>Créer</div>
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