import './Partition.css';
import { useEffect, useState } from "react";
import {putAPI} from '../components/fetchAPI';

export default function Partition({partition, style}){
    const [partitions] = useState([]);


    const fetchData = async (idSheet, body) => {
        await putAPI(`vault-sheets/${idSheet}`,body);
    };


    function addFav(e){
        if(e.target.src.includes("colored")){
            e.target.src = "/logo/icons/star.png";
            e.target.parentElement.classList.toggle("fav");
            fetchData(e.target.parentElement.id, {isFavorite: false});
        }
        else{
            e.target.src = "/logo/icons/star_colored.png";
            e.target.parentElement.classList.toggle("fav");
            fetchData(e.target.parentElement.id, {isFavorite: true});
        }

        e.preventDefault();
    }

    function addLib(e){
        if(e.target.src.includes("add")){
            e.target.src = "/logo/icons/check.png";
        }
        else{
            e.target.src = "/logo/icons/add.png";
        };
        e.preventDefault();
    }

    console.log(partitions);
    return(
        <div className={partition.isFavorite ? 'partition fav' : 'partition'} id={partition.id}>
            <div className='partitionDesc'>
                <p>{partition.Sheet.title}</p>
                <p>{partition.Sheet.difficulty} - {partition.Sheet.style} - {partition.Sheet.Instrument.Name}</p>
            </div>
            <p>{partition.Sheet.author}</p>
            {style == "fav" && !partition.isFavorite ? (
                <img src="/logo/icons/star.png" alt="star" onClick={addFav}/>) 
                : style == "fav" && partition.isFavorite? (
                    <img src="/logo/icons/star_colored.png" alt="star" onClick={addFav}/>)
                : <img src="/logo/icons/add.png" alt="add" onClick={addLib}/>}
        </div>
    )
}