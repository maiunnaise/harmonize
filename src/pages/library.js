import './library.css';
import Partition from '../components/Partition';
import { useEffect } from "react";
import { Link } from 'react-router-dom';
import GreyDiv from '../components/GreyDiv';

const partitions =[
    {
        id:0, name:"Partition tartampion", difficulty : "Débutant", style :"Jazz", instrument : "Basse", auteur : "Mozart", isFav : true
    },
    {
        id:1, name:"Partition 2", difficulty : "Avancé", style :"Classique", instrument : "Piano", auteur : "Teest", isFav : true
    },
    {
        id:2, name:"Partition 3e", difficulty : "Intermédiaire", style :"Jazz", instrument : "Flûte", auteur : "Hello", isFav : false
    }
];

export function Libform(){
    useEffect(() => {
        let list = document.querySelectorAll("select");
        list = Array.from(list);
        list.map((select) => {
            partitions.map((partition) => {
                if (select.id in partition){
                    if (!select.innerHTML.includes(partition[select.id])){
                        select.innerHTML += `<option value="${partition[select.id]}">${partition[select.id]}</option>`
                    }
                }
            })
        })

    })

    function handleChange(e){

        if(e.target.value != ""){
            e.target.classList.add("selectedFilter");
        }
        else{
            e.target.classList.remove("selectedFilter");
        }

    
        let values = document.querySelectorAll("select");
        values = Array.from(values);
        let filters = [];
        values.map((value) => {
            if(value.value != ""){ 
                filters.push(value.value);
            }
        })

        let isFav = document.querySelector(".isFav");
        let partitions = document.querySelectorAll(".partition");
        partitions = Array.from(partitions);
        partitions.map((partition) => {
            let count = 0;
            filters.map((filter) => {
                if (partition.innerHTML.includes(filter)){
                    count++;
                }
            })
            if(count == filters.length && isFav.classList.contains("selectedFilter") && partition.classList.contains("fav")){
                partition.style.display = "flex";
            }
            else if(count == filters.length && !isFav.classList.contains("selectedFilter")){
                partition.style.display = "flex";
            }
            else {
                partition.style.display = "none";
            }
        })

        ifEmpty();
    }

    function isFav(e){
        e.target.classList.toggle("selectedFilter");
        let partitions = document.querySelectorAll(".partition");

        let values = document.querySelectorAll("select");
        values = Array.from(values);
        let filters = [];
        values.map((value) => {
            if(value.value != ""){ 
                filters.push(value.value);
            }
        })

        partitions = Array.from(partitions);
        partitions.map((partition) => {
            let count = 0;
            filters.map((filter) => {
                if (partition.innerHTML.includes(filter)){
                    count++;
                }
            });
            if(e.target.classList.contains("selectedFilter")){
                if(partition.classList.contains("fav") && count == filters.length){
                    partition.style.display = "flex";
                } else {
                    partition.style.display = "none";
                }
            }
            else if(!e.target.classList.contains("selectedFilter") && count == filters.length){
                partition.style.display = "flex";
            }
        })

        ifEmpty();
    }

    function searchBar(e) {
        let partitions = document.querySelectorAll(".partition");
        partitions = Array.from(partitions);
        let isFav = document.querySelector(".isFav");
    
        let values = document.querySelectorAll("select");
        values = Array.from(values);
        let filters = values
            .filter(value => value.value !== "")
            .map(value => value.value.toLowerCase()
        );

        let decoy = document.querySelector("select:first-of-type");
    
        partitions.forEach(partition => {
            let count = filters.reduce((acc, filter) => acc + (partition.innerHTML.includes(filter) ? 1 : 0), 0);
            let filter = e.target.value.trim().toLowerCase();
            let data = partition.innerText.toLowerCase();
    
            const isFavFilter = isFav.classList.contains("selectedFilter") && partition.classList.contains("fav");
            const matchesFilter = data.includes(filter) && count === filters.length;
    
            if ((filter === "" && isFavFilter) || (matchesFilter && (!isFavFilter || !partition.classList.contains("fav")))) {
                partition.style.display = "flex";
            } 
            else if(filter === "") {
                handleChange({target: decoy});
            }
            else {
                partition.style.display = "none";
            }
        });

        ifEmpty();
    }

    function ifEmpty(){
        let filters = document.querySelectorAll("select");
        filters = Array.from(filters);
        let isFav = document.querySelector(".isFav");
        let research = document.querySelector("input").value;

        if(filters.every(filter => filter.value == "") && !isFav.classList.contains("selectedFilter") && research == ""){
            let partitions = document.querySelectorAll(".partition");
            partitions = Array.from(partitions);
            partitions.map((partition) => {
                partition.style.display = "flex";
            })
        }
    }
    

    return(
        <div className="libform">
            <input type="text" placeholder="Rechercher une partition" onInput={searchBar}></input>
            <div className='filters'>
                <div className='isFav' onClick={isFav}>Favoris</div>
                <select name="style" id="style" onChange={handleChange}>
                    <option value="">Styles</option>
                </select>
                <select name="instrument" id="instrument" onChange={handleChange}>
                    <option value="">Instruments</option>
                </select>
                <select name="auteur" id="auteur" onChange={handleChange}>
                    <option value="">Auteurs</option>
                </select>
                <select name="difficulty" id="difficulty" onChange={handleChange}>
                    <option value="">Difficulté</option>
                </select>
            </div>
            
        </div>
    )
}

function AddPart(){
    return(
        <>
            <img src="/logo/icons/add_purple.png" alt="add"/>
            <p>Ajouter une partition</p>
        </>
    )

}


export function Library() {
    return (
    <div className="content">
        <h1>Ma bibliothèque</h1>
        <Libform/>
        {partitions.map((partition) => {
            return (
            <Link to={`/play/${partition.id}`}>
                <Partition partition={partition} style="fav"/>
            </Link>
            );
        })}
        <Link to="/addPartition" className='addPart'>
            <GreyDiv content={<AddPart/>}/>
        </Link>
    </div>
    )
}