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
            headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem('token') },
            body: JSON.stringify({"instrumentList":instrumentsId})
        };
        fetch('https://harmonize.mael-mouquet.fr/api/user-instruments', requestOptions)
        .then(response => response.json())
        .then(data => {
            closePopUp();
        });
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