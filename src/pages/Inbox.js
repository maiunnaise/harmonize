import React, { useState, useEffect } from 'react';
import './Inbox.css';
import GreyDiv from '../components/GreyDiv.js';
import { Link } from 'react-router-dom';
import SearchBar from '../components/SearchBar.js';
import { getAPI} from '../components/fetchAPI.js';
import { decodeToken } from "react-jwt";
import CheckLogin from '../components/checkLogin.js';

//Retourne le role de l'utilisateur
function getRole(){

    const token = localStorage.getItem('token');
    let decodedToken = decodeToken(token);

    if(decodedToken.roles.includes('ROLE_STUDENT') && decodedToken != null){
        return "ROLE_STUDENT";
    }
    else if (decodedToken.roles.includes('ROLE_TEACHER') && decodedToken != null){
        return "ROLE_TEACHER";
    }
}

function Contact({cours}){

    const [msg, setMsg] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            await getAPI('cours/'+cours.id+'/messages', setMsg);
        };

        fetchData();
    }, []);
    
    if(msg.length > 0){
        //Récupere le dernier message
        msg.sort(function(a, b){
            let idA = a.id;
            let idB = b.id;
            if (idA > idB) {
                return -1;
            }
        });

        var lastMessage = msg[0];
        const role = getRole();

        var contactRole = lastMessage.Sender;
        
        if(lastMessage.unread === true && (contactRole== null || contactRole.roles[0] !== role)){
            return (
                <GreyDiv className="unread msgDiv" content={
                    <Link to={`/message/${cours.id}`} className='inboxLink'>
                        <div className="inboxContact">
                            <img src="../logo/icons/avatar.png" alt="contact"/>
                            <div className="inboxText">
                                 {role === "ROLE_STUDENT" ? 
                                    <h2>{cours.Teacher.User.prenom} {cours.Teacher.User.nom}</h2> :
                                    <h2>{cours.Student.User.prenom} {cours.Student.User.nom}</h2>}                      
                                <p>
                                    <span className="lastMessage">{lastMessage.content}</span> 

                                </p>
                            </div>
                        </div>
                    </Link>
                }/>
            ) 
        }
        else {
            return (
                <GreyDiv className="msgDiv" content={
                    <Link to={`/message/${cours.id}`} className='inboxLink'>
                        <div className="inboxContact">
                            <img src="../logo/icons/avatar.png" alt="contact"/>
                            <div className="inboxText">
                                 {role === "ROLE_STUDENT" ? 
                                    <h2>{cours.Teacher.User.prenom} {cours.Teacher.User.nom}</h2> :
                                    <h2>{cours.Student.User.prenom} {cours.Student.User.nom}</h2>}                      
                                <p>
                                    <span className="lastMessage">{lastMessage.content}</span> 
                                   
                                </p>
                            </div>
                        </div>
                    </Link>
                }/>
            )
            
        
        }
    }
}

function InboxDiv({users, cours}){

    const [filteredData, setFilteredData] = useState([]);
    useEffect(() => {
        setFilteredData(cours);
    }, [cours]);
    const handleSearch = (searchTerm) => {
        const filteredResults = cours.filter((item) =>
          item.Student.User.prenom.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.Student.User.nom.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredData(filteredResults);
    };
    
    return (
        <div className='content'>
            <div className="searchInbox">
                <SearchBar onSearch={handleSearch} />
            </div>
            {filteredData.map((cours, index) => {
                return <Contact cours={cours}  key={index} />
            })}
        </div>
    )
}

export default function Inbox(){
    CheckLogin();

    const [cours, setCours] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            await getAPI('cours', setCours);
        };

        fetchData();
    }, []);


    if(cours.length > 0){
        
    };

    return (
        <InboxDiv cours={cours} />
    );
};