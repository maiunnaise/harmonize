import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './ExercicesSearch.css';
import GreyDiv from '../components/GreyDiv.js';
import SearchBar from '../components/SearchBar.js';

const allCategories = ['Solfège', 'Piano', 'Guitare', 'Batterie'];

function showFirstLevels(){
    let lvls = document.querySelectorAll('.niveaux > div');
    for(let i = 0; i < lvls.length; i++){
        if(lvls[i].firstChild.style.display = 'hidden'){
            lvls[i].firstChild.style.display = 'flex';
        }
    };
}

function DisplayLevels(){
    let exerciceDivs = document.querySelectorAll('.GreyDiv > div');
    let showBtns = document.querySelectorAll('.GreyDiv > div > div > button');
    for(let i = 0; i < exerciceDivs.length; i++){
        let opened = false;
        showBtns[i].addEventListener('click', function(){
            let lvlid = exerciceDivs[i].id;
            let lvl = document.getElementById(lvlid).querySelector('.niveaux > div');   
            let childLvl = lvl.childNodes;
            if(!opened){
                for(let y = 0; y < childLvl.length; y++){
                    childLvl[y].style.display = 'flex';
                };
                showBtns[i].querySelector('.arrow').style.transform = "rotate(-135deg)";
                showBtns[i].querySelector('.arrow').style.marginTop = "0.8em";
                opened = true;
            }
            else {
                for(let y = 0; y < childLvl.length; y++){
                    childLvl[y].style.display = 'none';
                };
                childLvl[0].style.display = 'flex';
                showBtns[i].querySelector('.arrow').style.transform = "rotate(45deg)";
                showBtns[i].querySelector('.arrow').style.marginTop = "0em";
                opened = false;
            }
        });
        
    }
}

function levelCompletion({ exercice }){
    let niveaux = exercice.niveaux;
    let exoDiv = document.getElementById(exercice.id);
    let lvlParentDiv = null;
    if(exoDiv != null){
        lvlParentDiv = exoDiv.querySelector('.niveaux > div');
    }
    for (let i = 0; i < niveaux.length; i++) {
        if(lvlParentDiv != null){
            let lvl = lvlParentDiv.querySelector(`[id="lvl${niveaux[i].id}from${exercice.id}"]`);
            if (niveaux[i].completed) {
                if (lvl != null) {
                    lvl.classList.remove("notCompleted");
                    lvl.classList.add("completed");
                }
            } else {
                if (lvl != null) {
                    lvl.classList.remove("completed");
                    lvl.classList.add("notCompleted");
                }
            }
        }
    };
};

//Affiche les niveaux de l'exercice
function NiveauBar({ exercice }) {
    let niveaux = exercice.niveaux;

    //Assure que les élements sont bien chargés 
    useEffect(() => {
        levelCompletion({ exercice });
        showFirstLevels();
        DisplayLevels();
    });
    
    return (
        <div>
            {niveaux.map((level, index) => {
                return (
                    <div key={level.id} id={`lvl${level.id}from${exercice.id}`} className='hidden'>
                        <h3>{level.Titre}</h3>
                        <div>    
                            <p className="exerciceDesc">{level.desc}</p>
            
                            <button>
                                <Link to={`/exercices/${exercice.id}/${level.id}`}>Démarrer</Link>
                            </button>
                        </div>
                    </div>
                );
            })}
        </div>
    );

    
}


function Search(){
    const [filteredData, setFilteredData] = useState(exercices);
    const [selectedCategory, setSelectedCategory] = useState('All');

    const handleSearch = (searchTerm, category) => {
        const filteredResults = exercices.filter((item) =>
          item.titre.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.category.toLowerCase().includes(searchTerm.toLowerCase())
        );
      
        const filteredByCategory = selectedCategory === 'All'
            ? filteredResults
            : filteredResults.filter(item => item.category === selectedCategory)
        DisplayLevels();
        setFilteredData(filteredByCategory);
        
    };
    
    useEffect((category) => {
        handleSearch('',category);
    }, [selectedCategory]);
    
    const handleCategoryFilter = (category) => {
        setSelectedCategory(category);
        let selectedBtn = document.getElementById(category);
        for (let i = 0; i < allCategories.length; i++) {
            let btn = document.getElementById(allCategories[i]);
            if (btn !== selectedBtn) {
                btn.classList.remove('active');
            }
        }
        selectedBtn.classList.toggle('active');
        if(!selectedBtn.classList.contains('active')){
            setSelectedCategory('All');
            setTimeout(() => {showFirstLevels();}, 10);
        }
    };

    const exercicesList = () => {
        {filteredData.map((exercices, index) => (
            <div key={index}>
                <NiveauBar exercice={exercices}/>
            </div>
           
        ))}
    };

    return (
        <div className="content ExercicesSearch">
            <SearchBar onSearch={handleSearch} />
            <div id='categoryFilter'>
                {allCategories.map((category, index) => (
                <button
                    key={index}
                    id={category}
                    onClick={() => handleCategoryFilter(category)}
                >{category}</button>
                ))}
            </div>
            {filteredData.map((exercices, index) => (
                <GreyDiv
                    key={index}
                    content={
                    <div id={exercices.id}>
                        <div>
                            <h2><span>{exercices.titre}</span><span className="greyText"> · {exercices.category} </span></h2>
                            <button onClick={exercicesList}><i className="arrow"></i></button>
                        </div>
                        <div className='niveaux'>
                            <NiveauBar exercice={exercices}/>
                        </div>
                    </div>
                    }
                />  
            ))}
        </div>
    )
}

let exercices = [
    {id: 5, 
    titre: "Reconnaissance de notes", 
    category: "Solfège",
    niveaux: [
        {Titre: "Niveau 1", id: 1, desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        completed: true},
        {Titre: "Niveau 2", id: 2, desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", 
        completed: false},
        {Titre: "Niveau 3", id: 3, desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        completed: false},
        {Titre: "Niveau 4", id: 4, desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        completed: false},
    ]},
    {id: 4, 
    titre: "Accords", 
    category: "Solfège",
    niveaux: [
        {Titre: "Niveau 1", id: 1, desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        completed: false},
        {Titre: "Niveau 2", id: 2, desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", 
        completed: false},
        {Titre: "Niveau 3", id: 3, desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        completed: false},
        {Titre: "Niveau 4", id: 4, desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        completed: false},
    ]},
    {id: 3, 
    titre: "Notes", 
    category: "Piano",
    niveaux: [
        {Titre: "Niveau 1", id: 1, desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        completed: false},
        {Titre: "Niveau 2", id: 2, desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", 
        completed: false},
        {Titre: "Niveau 3", id: 3, desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        completed: false},
        {Titre: "Niveau 4", id: 4, desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        completed: false},
    ]},
]

export default function ExerciceSearch(){
    return (
    <Search />
    );
};