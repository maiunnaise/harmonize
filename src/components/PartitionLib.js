import './Partition.css';
import {putAPI, deleteAPI} from '../components/fetchAPI';

function Partition({partition, style}){


    const putData = async (idSheet, body) => {
        await putAPI(`vault-sheets/${idSheet}`,body);
    };

    const deleteData = async (idSheet) => {
        await deleteAPI(`vault-sheets/${idSheet}`);
    };


    function addFav(e){
        if(e.target.src.includes("colored")){
            e.target.src = "/logo/icons/star.png";
            e.target.parentElement.classList.toggle("fav");
            putData(e.target.parentElement.parentElement.id, {isFavorite: false});
        }
        else{
            e.target.src = "/logo/icons/star_colored.png";
            e.target.parentElement.classList.toggle("fav");
            putData(e.target.parentElement.parentElement.id, {isFavorite: true});
        }

        e.preventDefault();
    }

    function deleteLib(e){
        deleteData(e.target.parentElement.parentElement.id);
        e.target.parentElement.parentElement.remove();
        e.preventDefault();
    }

    return(
        <div className={partition.isFavorite ? 'partition fav' : 'partition'} id={partition.id}>
            <div className='partitionDesc'>
                <p>{partition.Sheet.title}</p>
                <p>{partition.Sheet.difficulty} - {partition.Sheet.style} - {partition.Sheet.Instrument.Name}</p>
            </div>
            <p>{partition.Sheet.author}</p>
            <div className='libIcons'>
                {style == "fav" && !partition.isFavorite ? (
                    <img src="/logo/icons/star.png" alt="star" onClick={addFav}/>) 
                    : style == "fav" && partition.isFavorite? (
                        <img src="/logo/icons/star_colored.png" alt="star" onClick={addFav}/>)
                    : null
                }
                <img src="/logo/icons/trash-bin.png" alt="delete" onClick={deleteLib}/>
            </div>
            
        </div>
    )
}

function PartitionCustom({partition}){
    
    const putData = async (idSheet, body) => {
        await putAPI(`vault-custom-sheets/${idSheet}`,body);
    };

    const deleteData = async (idSheet) => {
        await deleteAPI(`vault-custom-sheets/${idSheet}`);
    };


    function addFav(e){
        if(e.target.src.includes("colored")){
            e.target.src = "/logo/icons/star.png";
            e.target.parentElement.classList.toggle("fav");
            putData(e.target.parentElement.parentElement.id, {isFavorite: false});
        }
        else{
            e.target.src = "/logo/icons/star_colored.png";
            e.target.parentElement.classList.toggle("fav");
            putData(e.target.parentElement.parentElement.id, {isFavorite: true});
        }

        e.preventDefault();
    }

    function deleteLib(e){
        deleteData(e.target.parentElement.parentElement.id);
        e.target.parentElement.parentElement.remove();
        e.preventDefault();
    }

    return(
        <div className={partition.isFavorite ? 'partition fav' : 'partition'} id={partition.id}>
            <div className='partitionDesc'>
                <p>{partition.CustomSheet.title}</p>
                <p>{partition.CustomSheet.difficulty} - {partition.CustomSheet.style} - {partition.CustomSheet.instrument}</p>
            </div>
            <p>{partition.CustomSheet.author.nom}</p>
            <div className='libIcons'>
                { !partition.isFavorite ? (
                    <img src="/logo/icons/star.png" alt="star" onClick={addFav}/>) 
                    : partition.isFavorite? (
                        <img src="/logo/icons/star_colored.png" alt="star" onClick={addFav}/>)
                    : null
                }
                <img src="/logo/icons/trash-bin.png" alt="delete" onClick={deleteLib}/>
            </div>
        </div>
    )
}

export {Partition, PartitionCustom}