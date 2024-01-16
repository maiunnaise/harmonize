import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './CoursSearch.css';
import GreyDiv from '../components/GreyDiv.js';
import HistoryButton from '../components/HistoryButton.js';
import SearchBar from '../components/SearchBar.js';

const allCategories = ['Solfège', 'Piano', 'Guitare', 'Batterie'];

function Search(){
    const [filteredData, setFilteredData] = useState(cours);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (searchTerm, category) => {
        const filteredResults = cours.filter((item) =>
          item.titre.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.category.toLowerCase().includes(searchTerm.toLowerCase())
        );
      
        const filteredByCategory = selectedCategory === 'All'
            ? filteredResults
            : filteredResults.filter(item => item.category === selectedCategory);
      
        //Combine les deux filtres
        // const combinedFilteredData = category === undefined
        //   ? filteredResults
        //   : filteredByCategory;
      
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
        }
    };

    // const handleInputChange = (value) => {
    // setSearchTerm(value);
    // handleSearch(); // Update filtered data when changing search term
    // };

    return (
        <div className="content CoursSearch">
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
            {filteredData.map((cours, index) => (
                <Link key={index} to={`/cours/${cours.id}`}>
                <GreyDiv
                    content={
                    <div>
                        <h2>{cours.titre} <span className="greyText"> · {cours.category} </span></h2>
                        <p>{cours.desc}</p>
                        <img src={cours.img} alt="cours illustration" />
                    </div>
                    }
                />
                </Link>
            ))}
        </div>
    )
}

let cours = [{id: 5, titre: "Les notes", desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
category: "Solfège", img: "/img/cours-image.jpg"},
{id: 3, titre: "Les accords", desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
category: "Solfège", img: "/img/cours-image.jpg"},
{id: 2, titre: "Les notes", desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
category: "Piano", img: "/img/cours-image.jpg"}]

export default function CoursSearch(){
    return (
    <Search />
    );
};