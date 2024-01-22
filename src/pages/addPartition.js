import './addPartition.css';
import { useState, useEffect } from 'react';
import { getAPI } from '../components/fetchAPI';
import { Link } from 'react-router-dom';
import Partition from '../components/Partition';
import SimpleHeader from '../components/simpleHeader';
import CheckLogin from '../components/checkLogin';

export function Addform({partitions}){
    useEffect(() => {
        let list = document.querySelectorAll("select");
        partitions = Array.from(partitions);
        list = Array.from(list);
        list.map((select) => {
            partitions.map((partition) => {
                if (select.id in partition){
                    if (!select.innerHTML.includes(partition[select.id])){
                        if(select.id == "Instrument"){
                            if( !select.innerHTML.includes(partition.Instrument.Name)){
                                select.innerHTML += `<option value="${partition[select.id].Name}">${partition[select.id].Name}</option>`
                            }
                            
                        }
                        else{
                            select.innerHTML += `<option value="${partition[select.id]}">${partition[select.id]}</option>`
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
        values.map((value) => {
            if(value.value != ""){ 
                filters.push(value.value);
            }
        })

        let partitions = document.querySelectorAll(".partition");
        partitions = Array.from(partitions);
        partitions.map((partition) => {
            let count = 0;
            filters.map((filter) => {
                if (partition.innerHTML.includes(filter)){
                    count++;
                }
            })
            if(count == filters.length){
                partition.style.display = "flex";
            }
            else {
                partition.style.display = "none";
            }
        })

        ifEmpty();
    }

    function searchBar(e) {
        let partitions = document.querySelectorAll(".partition");
        partitions = Array.from(partitions);
    
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
    
            const matchesFilter = data.includes(filter) && count === filters.length;

            if (filter === "" || matchesFilter) {
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
        let research = document.querySelector("input").value;

        if(filters.every(filter => filter.value == "") && research == ""){
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

export default function AddPartition() {
    CheckLogin();
    const [partitions, setPartitions] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            await getAPI('sheets', setPartitions);
        };

        fetchData();
    }, []);
    return(
        <div className="simpleContent">
            <SimpleHeader/>
            <h1>Ajouter une partition</h1>
            <Addform partitions={partitions}/>
            <div className='harmonizePart'>
                {partitions.map((partition) => {
                return (
                <Link to={`/play/${partition.id}`}>
                    <Partition partition={partition}/>
                </Link>
                );
                })}
            </div>
            
        </div>
    )
}