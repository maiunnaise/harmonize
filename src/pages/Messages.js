import React, { useState, useEffect } from 'react';
import './Messages.css';
import { Link , useNavigate, useParams } from 'react-router-dom';

function MessagesHeader({user}) {
    const navigate = useNavigate();
    return (
      <header className='MessagesHeader'>
        <div>
            <img className="backArrow" src="/logo/icons/back-arrow.png" alt="menu arrow" onClick={() => navigate(-1)}></img>
            <h2>{user.firstname} {user.lastname}</h2>
        </div>
        <div>
            <img className="phone" src="/logo/icons/phone.png" alt="phone logo"></img>
            <img className="video" src="/logo/icons/video.png" alt="video logo"></img>
        </div>
      </header>
    );
}

function ChatBar(){
    useEffect(() => {
        let input = document.querySelector('input');
        input.addEventListener("keypress", function (e) {
            if (e.key === 'Enter') {
               console.log(input.value);
               input.value = "";
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


function MessagesDisplay({data}){
    let contactId = useParams().id;
    let contact = users.find((user) => user.id == contactId);
    return data.map((message, index) => {
        if(message.Sender.id == contact.id){
            console.log("Message reçu");
            return (
                <div className="messageReceived" id='message.id'>
                    <img src={contact.img} alt="profile"/>
                    <p>{message.content}</p>
                </div>
            );
        }
        else {
            console.log("Message envoyé");
            return (
                <div className="messageSended" id='message.id'>
                    <p>{message.content}</p>
                    <img src={contact.img} alt="profile"/> 
                </div>
            );
        }
    })
};

function MessagePage({data,users}){
    let contactId = useParams();
    console.log(contactId.id);
    let user = users.find((user) => user.id == contactId.id);
    console.log(user);
    
    return (
        <div className="simpleContent">
            <MessagesHeader user={user}/>
            <div className='MessagesDisplay'>
                <MessagesDisplay data={data}/>
            </div>
            <ChatBar />
        </div>
    )
}

let data = [
    {
        "id": 2,
        "Cours": {
            "id": 2
        },
        "content": "Salut Michel, en raison de fort brouillard je serai en distanciel ce matin.",
        "Sender": {
            "id": 2,
            "email": "teacher@mmi.fr",
            "roles": [
                "ROLE_TEACHER",
                "ROLE_USER"
            ]
        },
        "Receiver": {
            "id": 3,
            "email": "student@mmi.fr",
            "roles": [
                "ROLE_STUDENT",
                "ROLE_USER"
            ]
        }
    },
    {
        "id": 3,
        "Cours": {
            "id": 2
        },
        "content": "Merci pour ta compréhension.",
        "Sender": {
            "id": 2,
            "email": "teacher@mmi.fr",
            "roles": [
                "ROLE_TEACHER",
                "ROLE_USER"
            ]
        },
        "Receiver": {
            "id": 3,
            "email": "student@mmi.fr",
            "roles": [
                "ROLE_STUDENT",
                "ROLE_USER"
            ]
        }
    },
    {
        "id": 4,
        "Cours": {
            "id": 2
        },
        "content": "menfou hahahhahaha",
        "Sender": {
            
            "id": 3,
            "email": "student@mmi.fr",
            "roles": [
                "ROLE_STUDENT",
                "ROLE_USER"
            ]
        },
        "Receiver": {
            "id": 2,
            "email": "teacher@mmi.fr",
            "roles": [
                "ROLE_TEACHER",
                "ROLE_USER"
            ]
        }
    },
    {
        "id": 4,
        "Cours": {
            "id": 2
        },
        "content": "hahahhakzj fkkaaertaertaert eartaertaeta zetat",
        "Sender": {
            
            "id": 3,
            "email": "student@mmi.fr",
            "roles": [
                "ROLE_STUDENT",
                "ROLE_USER"
            ]
        },
        "Receiver": {
            "id": 2,
            "email": "teacher@mmi.fr",
            "roles": [
                "ROLE_TEACHER",
                "ROLE_USER"
            ]
        }
    },
]

let users = [
    {id: 2,
    img: "https://www.w3schools.com/howto/img_avatar.png",
    firstname: "John",
    lastname: "Doe",
    email: "adadas@mail.com",
    instruments: ["Piaeeeeno","Guitare"],},
    {id: 3,
    img: "https://www.w3schools.com/howto/img_avatar.png",
    firstname: "John",
    lastname: "Doe",
    email: "adadas@mail.com",
    instruments: ["Piaeeeeno","Guitare"],},
]

export default function Messages(){
    return (
        <MessagePage data={data} users={users} />
    );
};