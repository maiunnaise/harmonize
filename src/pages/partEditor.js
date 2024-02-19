import CheckLogin from '../components/checkLogin';
import SimpleHeader from '../components/simpleHeader';
import './partEditor.css';
import { getAPI, postAPI} from '../components/fetchAPI';
import { useEffect, useState} from 'react';
import Embed from 'flat-embed';
import { useNavigate } from 'react-router-dom';
import manageCache from '../components/cache';


export default function PartEditor() {
    CheckLogin();
    const [isCreated, setIsCreated]= useState(false);
    const [partData, setPartData] = useState([]);
    const navigate = useNavigate();
    const [changeContent, setChangeContent] = useState(false);

    const [customSheets, setCustomSheets] = useState([]); 

    useEffect(() => {

        manageCache('vault-custom-sheets', 300, setCustomSheets, 'vault-custom-sheets');
    }, [])

    useEffect(() => {
       if (isCreated ===true && partData.length ==0){
            closePopUp();
            navigate('/search')
       }else if(isCreated === true && partData.length !=0){
            closePopUp();
       }
    }, [isCreated]);

    return(
        <div className='simpleContent' id='partEdit'>
            <SimpleHeader />
            <h1>Éditeur de partition</h1>
            <PopUpPart content={changeContent ? <CreateNewPart isCreated={setIsCreated} setData={setPartData} customSheets={customSheets}/> : <ChoosePart isCreated={setIsCreated} setData={setPartData} changeContent={setChangeContent} customSheets={customSheets}/>} />
            {isCreated && partData.length!=0 ? <EmbedEditor data={partData}/> :null}
        </div>

    )
}

function ChoosePart({isCreated, setData, changeContent, customSheets}){
    const [partData, setPartData] = useState([]);

    useEffect(() => {
        if(partData && partData.length != 0){
            console.log(partData);
            const dataPart = {title: partData.title, id: partData.scoreKey, author: partData.author};
            setData(dataPart);
            isCreated(true);
        }
    }, [partData]);

    async function editPart(){
        let part = document.getElementById('partitions');

        if(part.value == ""){
            let error = document.querySelector('.error');
            error.style.display = 'block';
            return;
        }

        await getAPI('custom-sheets/'+part.value, setPartData);
    }
    
    return(
        <div id='overlayPartEdit' className='overlay'>
            <div id="popupPart">
                <p className="close" onClick={()=>isCreated(true)}>X</p>
                <h2>Choisir une partition</h2>
                
                <div className="choosePart">
                    <p>Dans votre bibliothèque :</p>
                    <select name="partitions" id="partitions">
                        <option value="">Vos partitions</option>
                        {customSheets.length !=0 ? customSheets.map((sheet, index) => {
                            return(
                                <option value={sheet.CustomSheet.id} key={index}>{sheet.CustomSheet.title}</option>
                            )
                        }):null}
                    </select>
                    <div onClick={()=>editPart()}>Modifier cette partition</div>
                    <p className='error'>Veuillez choisir une partition</p>
                </div>

                <div className='btnCreate' onClick={()=>changeContent(true)}>Créer une partition</div>
            </div>
        </div>
    )
}

function EmbedEditor({data}){
    let container;
    const [embed, setEmbed]=useState({});
    const [scoreKey, setScoreKey] = useState()
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
        })

    }

    return(
        <>
            <h2 id='titlePart'>{data.title}<span> - {data.author.prenom} {data.author.nom}</span></h2>
            
            <div className='embedEdit'>
            </div>

            <div className='savePart' onClick={() => savePart(scoreKey)}>Sauvegarder</div>
        </>
    )
}



function CreateNewPart({isCreated, setData, customSheets}){

    const [instruments, setInstruments] = useState([]);

    const [newPart, setNewPart] = useState([]);

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
        let style = document.querySelector('#style');
        let difficulty = document.querySelector('#Difficulté');
    
        console.log(title.value, instrumentType.value, instrument.value)

        if(title.value == "" || instrumentType.value == "" || instrument.value == ""|| style.value == "" || difficulty.value == ""){
            let error = document.querySelector('.error');
            error.style.display = 'block';
            return;
        }
    
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
                data.author = customSheets[0].User;
                setData(data);
                isCreated(true);
                addCustomPart(data);
            });
        };
    
        addPart();

        const addCustomPart = async (data) => {
            let inst = instrument.value[0].toUpperCase() + instrument.value.slice(1);
            style.value = style.value[0].toUpperCase() + style.value.slice(1);
            await postAPI('custom-sheets',setNewPart,{title: data.title , scoreKey: data.id, instrument:inst, style: style.value, difficulty: difficulty.value, author: data.author.id});
            sessionStorage.removeItem('vault-custom-sheets');
        };

        
    }

    return(
        <div id='overlayPartEdit' className='overlay'>
            <div id="popupPart">
                <p className="close" onClick={()=>isCreated(true)}>X</p>
                <h2>Créer une partition</h2>
                <form action="" className='createNewPart'>
                    <label htmlFor="title">Titre de la partition</label>
                    <input type="text" name="title" id="title"/>
                    <label htmlFor="Style">Style</label>
                    <input type="text" name="style" id="style"/>
                    <label htmlFor="Difficulté">Difficulté</label>
                    <select name='Difficulté' id='Difficulté'>
                        <option value="">Choisir une difficulté</option>
                        <option value="Facile">Facile</option>
                        <option value="Intermédiaire">Intermédiaire</option>
                        <option value="Difficile">Difficile</option>
                    </select>
                    
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
                <p className='error'>Veuillez renseigner tous les champs</p>
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