import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './SearchPage.css';
import PurpleButton from '../components/PurpleButton.js';
import GreyDiv from '../components/GreyDiv.js';
import HistoryButton from '../components/HistoryButton.js';

function Search(){
    return (
        <div className="content SearchPage">
            <h2>Explorer</h2>
            <div id="toolsDiv">
                <Link to="/partitions">
                    <div id='partitionDiv'>
                        <p>Créateur de partition</p>
                        <img src="/logo/icons/sol-key.png" alt="sol key" />
                    </div>
                </Link>
                <Link to="/metronome">
                    <div id='metronomeDiv'>
                        <p>Métronome</p>
                        <img src="/logo/icons/metronome.png" alt="metronome logo" />
                    </div>
                </Link>
                <Link to="/accordeur">
                    <div id='accordeurDiv'>
                        <p>Accordeur</p>
                        <img src="/logo/icons/accordeur.png" alt="accordeur logo" />
                    </div>
                </Link>
                <Link to="/boiterythme">
                    <div id='rythmBoxDiv'>
                        <p>Boîte à rythme</p>
                        <img src="/logo/icons/drum-kit.png" alt="boite a rythme logo" />
                    </div>
                </Link>
            </div>
            <Link to="/cours">
                <GreyDiv content={
                    <div id="SearchPageCours">
                        <h2>Cours</h2>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                        sed do eiusmod tempor incididunt ut labore et dolore magna 
                        aliqua. Bibendum at varius vel pharetra.</p>
                        <img src="/img/cours-image.jpg" alt="cours illustration" />
                    </div>
                }/>
            </Link>
            <Link to="/exercices">
                <GreyDiv content={
                    <div id="SearchPageExercices">
                        <h2>Exercices</h2>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                        sed do eiusmod tempor incididunt ut labore et dolore magna 
                        aliqua. Bibendum at varius vel pharetra.</p>
                        <img src="/img/exercices-image.jpg" alt="exercices illustration" />
                    </div>
                }/>
            </Link>
        </div>
    )
}

export default function SearchPage(){
    return (
    <Search />
    );
};