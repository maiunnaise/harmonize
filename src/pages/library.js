import './library.css';
import {Partition, PartitionCustom} from '../components/PartitionLib';
import { useEffect } from "react";
import { Link } from 'react-router-dom';
import GreyDiv from '../components/GreyDiv';
import { getAPI } from '../components/fetchAPI';
import { useState } from 'react';
import manageCache from '../components/cache';


export function Libform({partitions, customSheets}){
    useEffect(() => {
        let list = document.querySelectorAll("select");
        partitions = Array.from(partitions);
        list = Array.from(list);
        list.map((select, index) => {
            partitions.map((partition, index) => {
                if (select.id in partition.Sheet){
                    if (!select.innerHTML.includes(partition.Sheet[select.id])){
                        if(select.id == "Instrument"){
                            if( !select.innerHTML.includes(partition.Sheet.Instrument.Name)){
                                select.innerHTML += `<option value="${partition.Sheet[select.id].Name}">${partition.Sheet[select.id].Name}</option>`
                            }
                        }
                        else{
                            select.innerHTML += `<option value="${partition.Sheet[select.id]}">${partition.Sheet[select.id]}</option>`
                        }
                        
                    }
                }
            })
            customSheets.map((partition, index) => {
                if (select.id=="Instrument"){
                    select.id = "instrument";
                }
                if (select.id in partition.CustomSheet){
                    if (!select.innerHTML.includes(partition.CustomSheet[select.id])){
                        if(select.id == "author"){
                            if( !select.innerHTML.includes(partition.CustomSheet.author.nom)){
                                select.innerHTML += `<option value="${partition.CustomSheet.author.nom}">${partition.CustomSheet.author.nom}</option>`
                            }
                        }
                        else{
                            select.innerHTML += `<option value="${partition.CustomSheet[select.id]}">${partition.CustomSheet[select.id]}</option>`
                        }
                        
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
        values.map((value, index) => {
            if(value.value != ""){ 
                filters.push(value.value);
            }
        })

        let isFav = document.querySelector(".isFav");
        let partitions = document.querySelectorAll(".partition");
        partitions = Array.from(partitions);
        partitions.map((partition, index) => {
            let count = 0;
            filters.map((filter, index) => {
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
        values.map((value, index) => {
            if(value.value != ""){ 
                filters.push(value.value);
            }
        })

        partitions = Array.from(partitions);
        partitions.map((partition) => {
            let count = 0;
            filters.map((filter, index) => {
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
            .map((value, index) => value.value.toLowerCase()
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
            partitions.map((partition, index) => {
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
                <select name="instrument" id="Instrument" onChange={handleChange}>
                    <option value="">Instruments</option>
                </select>
                <select name="auteur" id="author" onChange={handleChange}>
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

    const [partitions, setPartitions] = useState([]);
    const [customSheets, setCustomSheets] = useState([]);

    useEffect(() => {
        manageCache('vault-sheets', 30, setPartitions, 'vault-sheets');
        manageCache('vault-custom-sheets', 30, setCustomSheets, 'vault-custom-sheets');
    }, []);


    return (
    <div className="content">
        <h1>Ma bibliothèque</h1>
        <Libform partitions={partitions} customSheets={customSheets}/>
        <div className='libraryPart'>
        {partitions.length === 0 || customSheets.length === 0 ? (
            <p className="noPart">Vous n'avez pas encore de partitions dans votre bibliothèque</p>
            ) : 
            (
                <>
                    {partitions.map((partition, index) => (
                    <Link key={index} to={`/play/${partition.Sheet.id}`}>
                        <Partition partition={partition} style="fav" />
                    </Link>
                    ))}
                    {customSheets.map((partition, index) => (
                    <Link key={index} to={`/play/${partition.CustomSheet.id}/custom`}>
                        <PartitionCustom partition={partition}/>
                    </Link>
                    ))}
                </>
            )
        }

        </div>
        <Link to="/addPartition" className='addPart'>
            <GreyDiv content={<AddPart/>}/>
        </Link>
    </div>
    )
}