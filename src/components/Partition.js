import './Partition.css';
import { useEffect, useState } from "react";
import {getAPI, postAPI} from '../components/fetchAPI';

export default function Partition({partition}){

    const [addPartition, setAddPartition] = useState([]);
    const [vaultSheets, setVaultSheets] = useState([]);
    const postPart = async (body) => {
        await postAPI(`vault-sheets`,setAddPartition,body);
    };

    useEffect(() => {
        const fetchVault = async () => {
            await getAPI(`vault-sheets`,setVaultSheets);
        };

        fetchVault();
    }, []);

    let isInVault = false;
    vaultSheets.map((vaultSheet, index) => {
        if(vaultSheet.Sheet.id == partition.id){
            isInVault = true;
        }
    });

    function addLib(e){
        if(e.target.src.includes("add")){
            e.target.src = "/logo/icons/check.png";
            postPart({idSheet: e.target.parentElement.parentElement.id});
        }
        e.preventDefault();
    }

    return(
        <div id={partition.id} className='partition'>
            <div className='partitionDesc'>
                <p>{partition.title}</p>
                <p>{partition.difficulty} - {partition.style} - {partition.Instrument.Name}</p>
            </div>
            <p>{partition.author}</p>
            <div className='libIcons'>
                {isInVault ? (
                    <img src="/logo/icons/check.png" alt="inVault"/>) 
                    : (
                    <img src="/logo/icons/add.png" alt="add" onClick={addLib}/>)
                }
                
            </div>
            
        </div>
    )
}