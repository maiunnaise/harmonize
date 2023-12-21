import React, { useState, useEffect } from 'react';
import './findTeacher.css';
import PurpleButton from '../components/PurpleButton.js';
import GreyDiv from '../components/GreyDiv.js';
import HistoryButton from '../components/HistoryButton.js';
import SearchBar from '../components/SearchBar.js';

function TeachersDesc({teacher}){
    return (
        <div>
            <img className="findTeacherImg"src={teacher.image} alt='${teacher.firstname} ${teacher.lastname}'/>
            <div>
                <div id="teacherName">
                    <h2>{teacher.firstname} {teacher.lastname} <span className="greyText"> · {teacher.location} </span></h2>
                </div>
                <div>
                    {teacher.instruments.map((instrument, index) => {
                        return <p key={index} className="instrumentText">{instrument}</p>;
                    })}
                </div>
            </div>
            <p className="textDesc">{teacher.description}</p>
            <PurpleButton buttonText="Envoyer une demande" />
        </div>
    )
}


function FindTeachersDiv({teachers}){
    const [filteredData, setFilteredData] = useState(teachers);
    const [searchTerm, setSearchTerm] = useState('');
    
    const handleSearch = (searchTerm) => {
        const filteredResults = teachers.filter((item) =>
            item.location.toLowerCase().includes(searchTerm.toLowerCase()) 
        );
        
        setFilteredData(filteredResults);
    };

    return (
        <div className='content'>
            <GreyDiv content={
                <div className="divSearchTeacher">
                    <h2>Trouver un enseignant</h2>
                    <PurpleButton buttonText="Autour de moi" />
                    <SearchBar onSearch={handleSearch}/>
                </div>
            }/>
            {filteredData.map((teacher, index) => {
                return <GreyDiv key={index} content={<TeachersDesc teacher={teacher} />}/>;
            })}
            <HistoryButton buttonText="Historique d'activités" />
        </div>
    )
}

const teachers = 
[
    {image: "../logo192.png", location: "Fruits", instruments: ["Piano","Guitare"], firstname: "Apple", lastname: "Araerpple", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."},
    {image: "../logo192.png", location: "Fruits", instruments: ["aaa","bbb"], firstname: "Apple", lastname: "Arpple", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."},
    {image: "../logo192.png", location: "Saint-Lô", instruments: ["aaa","bbb"], firstname: "Apple", lastname: "Araerppeeee", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."},]
;

export default function FindTeachersPage(){
    return (
    <FindTeachersDiv teachers={teachers} />
    );
};