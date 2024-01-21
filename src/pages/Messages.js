import React, { useState, useEffect } from 'react';
import './Messages.css';
import { Link , useNavigate, useParams } from 'react-router-dom';
import { getAPI, postAPI, deleteAPI, putAPI} from '../components/fetchAPI.js';
import { decodeToken } from "react-jwt";

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

function MessagesHeader({user}) {

    const navigate = useNavigate();
    return (
      <header className='MessagesHeader'>
        <div>
            <img className="backArrow" src="/logo/icons/back-arrow.png" alt="menu arrow" onClick={() => navigate(-1)}></img>
            <h2>{user.User.prenom} {user.User.nom}</h2>
        </div>
        <div>
            <img className="phone" src="/logo/icons/phone.png" alt="phone logo"></img>
            <img className="video" src="/logo/icons/video.png" alt="video logo"></img>
        </div>
      </header>
    );
}

function ChatBar({cours}){
    const [data2,setData] = useState([]);
    useEffect(() => {
        let input = document.querySelector('input');
        input.addEventListener("keypress", function (e) {
            if (e.key === 'Enter') {
    
                let obj = {"content": input.value, "unread": true};
                
                console.log(obj);
    
                const fetchData = async () => {
                    await postAPI("cours/"+cours.id+"/messages", setData, obj);
                };
    
                fetchData();
    
                input.value = "";
                
                window.location.reload();
            }
         });
    }, []);

    return(
        <div className='ChatBar'>
            <input type="text" placeholder="Écrire un message..."/>
            <div>
                <div className='vocal'>
                    <img className="micro" src="/logo/icons/micro.png" alt="microphone logo"></img>
                </div>
                <div>
                    <img className="note" src="/logo/icons/sol-key.png" alt="note logo"></img>
                    <img className="image" src="/logo/icons/image.png" alt="image logo"></img>
                </div>
            </div>
            
        </div>
    );
};


function MessagesDisplay({msg, contact, cours}){
    // let contact = users.find((user) => user.id == contactId);
    return msg.map((message, index) => {


        if(message.Sender == null ||message.Sender.id == contact.User.id ){
            console.log("Message reçu");
            const obj = {"unread": false};
            const fetchData = async () => {
                await putAPI("cours/"+cours.id+"/messages/"+message.id, obj);
            };

            fetchData();
            return (
                <div className="messageReceived" key={message.id} id={message.id}>
                    <img src={contact.img} alt="profile"/>
                    <p>{message.content}</p>
                </div>
            );
        }
        else if ( message.Sender.id != null  && message.Sender.id != contact.User.id) {
            console.log("Message envoyé");
            return (
                <div className="messageSended" key={message.id} id={message.id}>
                    <p>{message.content}</p>
                    <img src={contact.img} alt="profile"/> 
                </div>
            );
        }
    })
};

function MessagePage({data}){
    let role = getRole();
    let contact = role === "ROLE_STUDENT" ? data.cours.Teacher : data.cours.Student;
    
    //Supprime un message en restant appuyé dessus
    function DeleteMsg(){
        const messages = document.querySelectorAll(".messageSended, .messageReceived");
        
        messages.forEach(message => {
            let pressTimer;
            const startPress = () => {
                pressTimer = setTimeout(() => {
                    const fetchData = async () => {
                        await deleteAPI("cours/"+data.cours.id+"/messages/"+message.id);
                    };
            
                    fetchData();
                    
                }, 1000); 
            };
            const endPress = () => {
                clearTimeout(pressTimer);
                window.location.reload();
            };
            message.addEventListener('touchstart', startPress);
            message.addEventListener('touchend', endPress);
            message.addEventListener('mousedown', startPress);
            message.addEventListener('mouseup', endPress);
        });
    
    }

    useEffect(() => {
        DeleteMsg();
    }, [data.msg]);
    
    return (
        <div className="simpleContent">
            <MessagesHeader user={contact}/>
            <div className='MessagesDisplay'>
                <MessagesDisplay msg={data.msg} contact={contact} cours={data.cours}/>
            </div>
            <ChatBar cours={data.cours}/>
        </div>
    )
}


export default function Messages(){
    const coursId = useParams().id;

    const [msg, setMsg] = useState([]);
    const [cours, setCours] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            await getAPI('cours/'+coursId+"/messages", setMsg);
            await getAPI('cours/'+coursId, setCours);
        };

        fetchData();
    }, []);
    
    const data = {msg, cours};

    return (
        cours.id !== undefined && msg.length > 0 ?
        <MessagePage data={data}/>:
        null
    );
};