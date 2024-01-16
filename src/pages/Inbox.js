import React, { useState, useEffect } from 'react';
import './Inbox.css';
import GreyDiv from '../components/GreyDiv.js';
import { Link } from 'react-router-dom';

function SearchInbox(){
    return (
        <div id="searchInbox">
            <h2>Boîte de réception</h2>
            <input type="text" placeholder="Rechercher..."/>
        </div>
    )
}

function getTimeSinceMessage(message){
    let time = (new Date() - new Date(message.date))/1000;
    if(time < 60){
        return `${Math.floor(time)} s`;
    }
    time = time/60;
    if(time < 60){
        return `${Math.floor(time)} min`;
    }
    time = time/60;
    if(time < 24){
        return `${Math.floor(time)} h`;
    }
    time = time/24;
    return `${Math.floor(time)} j`;
}

function Contact({user}){
    let lastMessage = user.messages[user.messages.length-1];
    return (
        <Link to={`/message/${user.id}`} className='inboxLink'>
            <div className="inboxContact">
                <img src="../logo192.png" alt="contact"/>
                <div className="inboxText">
                    <h2 >{user.firstname} {user.lastname}</h2>
                    <p>
                        <span className="lastMessage">{lastMessage.content}</span> <span>· {getTimeSinceMessage(lastMessage)}</span>
                    </p>
                </div>
            </div>
        </Link>
    ) 
}

function InboxDiv({users}){
    return (
        <div className='content'>
            <SearchInbox />    
            {users.map((user, index) => {
                if(user.messages[user.messages.length-1].unread){
                    return <GreyDiv className="unread" key={index} content={<Contact user={user}/>}/>;
                }
                else{
                    return <GreyDiv key={index} content={<Contact user={user}/>}/>;
                }
            })}
        </div>
    )
}

let data =
[
    {id: "1",firstname: "Apple", lastname: "Araerpple", messages: [{date: '2023/10/09 12:00', unread : true, content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."}]},
    {id: "2",firstname: "Apple", lastname: "Arpple", messages: [{date: '2023/12/13 20:00', unread : false, content: "Lorem ipsum dolor sit amet"}]},
    {id: "3",firstname: "Apple", lastname: "Araerppeeee", messages: [{date: 1621861200000, unread : false, content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."}]},
]

data = data.sort(function(a, b){
    let dateA = new Date(a.messages[a.messages.length-1].date).getTime();
    let dateB = new Date(b.messages[b.messages.length-1].date).getTime();
    if (dateA > dateB) {
        return -1;
    }
});

export default function Inbox(){
    return (
        <InboxDiv users={data} />
    );
};