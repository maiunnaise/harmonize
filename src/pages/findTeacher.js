import React, { useState, useEffect } from 'react';
import './findTeacher.css';
import GreyDiv from '../components/GreyDiv.js';
import SearchBar from '../components/SearchBar.js';
import { getAPI } from '../components/fetchAPI.js';

function TeachersDesc({teacher}){
    return (
        <div>
            <img className="findTeacherImg"src="../logo192.png" alt='${teacher.prenom} ${teacher.nom}'/>
            <div>
                <div id="teacherName">
                    <h2>{teacher.User.prenom} {teacher.User.nom} <span className="greyText"> · {teacher.city} </span></h2>
                </div>
                <div className='instrumentsTeach'>
                    {teacher.User.userInstruments.map((instrument, index) => {
                        return <p key={index} className="instrumentText">{instrument.Instrument.Name}</p>;
                    })}
                </div>
            </div>
            <p className="textDesc">{teacher.User.description}</p>
            <button>Envoyer une demande</button>
        </div>
    )
}


function FindTeachersDiv(){
    const [teachers, setTeachers] = useState([]);
    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            await getAPI("teachers", setTeachers);
        };
        fetchData();

    }, []);

    useEffect(() => {
        if (teachers.length > 0){
            setFilteredData(teachers);
        }
    }, [teachers])

    
    const handleSearch = (searchTerm) => {
        if (searchTerm === '') {
            setFilteredData(teachers);
            return;
        }
    
        const filteredResults = teachers.filter((item) => {
            if (item.city !== null) {
                return item.city.toLowerCase().includes(searchTerm.toLowerCase());
            }
            return false; 
        });
    
        setFilteredData(filteredResults);
    };


    return (
        <div className='content searchTeacher'>
            <GreyDiv content={
                <div className="divSearchTeacher">
                    <h2>Trouver un enseignant</h2>
                    <div className="searchBtns">  
                        <button>Autour de moi</button>
                        <SearchBar onSearch={handleSearch}/>
                    </div>
                </div>
            }/>
            {filteredData.map((teacher, index) => {
                return <GreyDiv key={index} content={<TeachersDesc teacher={teacher} />}/>;
            })}
        </div>
    )
}

export default function FindTeachersPage(){

    return (
    <FindTeachersDiv  />
    );
};