import './Partition.css';
import { useEffect, useState } from "react";
import {putAPI} from '../components/fetchAPI';

export default function Partition({partition}){

    // const [partition, setPartition] = useState([]);
    // useEffect(() => {
    //     const fetchData = async () => {
    //         if (activity && activity.Sheet){
    //             console.log(activity.Sheet.id);
    //             await getAPI(`sheets/${activity.Sheet.id}`, setPartition);
    //         }

    //         await getAPI(`sheets/${activity.Sheet.id}`, setPartition);
            
    //     };

    //     fetchData();
    // }, []);


    // function addFav(e){
    //     if(e.target.src.includes("colored")){
    //         e.target.src = "/logo/icons/star.png";
    //         e.target.parentElement.classList.toggle("fav");
    //         fetchData(e.target.parentElement.id, {isFavorite: false});
    //     }
    //     else{
    //         e.target.src = "/logo/icons/star_colored.png";
    //         e.target.parentElement.classList.toggle("fav");
    //         fetchData(e.target.parentElement.id, {isFavorite: true});
    //     }

    //     e.preventDefault();
    // }

    function addLib(e){
        if(e.target.src.includes("add")){
            e.target.src = "/logo/icons/check.png";
        }
        else{
            e.target.src = "/logo/icons/add.png";
        };
        e.preventDefault();
    }

    // console.log(partitions);
    return(
        <div id={partition.id} className='partition'>
            <div className='partitionDesc'>
                <p>{partition.title}</p>
                <p>{partition.difficulty} - {partition.style} - {partition.Instrument.Name}</p>
            </div>
            <p>{partition.author}</p>
            <img src="/logo/icons/add.png" alt="add" onClick={addLib}/>
        </div>
    )
}