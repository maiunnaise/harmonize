import React, { useState, useEffect } from 'react';
import './CoursPage.css';
import GreyDiv from '../components/GreyDiv.js';
import SimpleHeader from '../components/simpleHeader.js';
import { useSearchParams, useParams } from 'react-router-dom'
import CheckLogin from '../components/checkLogin.js';

function Cours(){
    CheckLogin();
    const [queryParameters] = useSearchParams()
    const {coursId} = useParams();
    //Donne le cours dont l'id est coursId
    let cours = coursData.filter(e => e.id === Number(coursId))[0];

    return (
        <div className="simpleContent">
            <SimpleHeader />
            <div id="CoursPage">
                <h2>{cours.titre} <span className="greyText"> · {cours.category} </span></h2>
                <p className='boldText'>{cours.desc}</p>
                <p>{cours.content}</p>
            </div>
        </div>
    )
}

let coursData = [{id: 5, titre: "Les notes", desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
category: "Solfège", img: "/img/cours-image.jpg",
content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."},
{id: 3, titre: "Les accords", desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
category: "Solfège", img: "/img/cours-image.jpg",
content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."},
{id: 2, titre: "Les notes", desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
category: "Piano", img: "/img/cours-image.jpg",
content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."}]

export default function CoursPage(){
    return (
    <Cours/>
    );
};