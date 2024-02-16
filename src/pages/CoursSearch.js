import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './CoursSearch.css';
import GreyDiv from '../components/GreyDiv.js';
import SearchBar from '../components/SearchBar.js';
import {getAPI} from '../components/fetchAPI.js';
import manageCache from '../components/cache';


function Search(){

    const [data, setData] = useState([]);
    useEffect(() => {
        // const fetchData = async () => {
        //     await getAPI('cours-app?offset=5&limit=3', setData);
        // };

        // fetchData();
        manageCache("cours-app", 604800, setData, `cours-app?offset=5&limit=3`);

    }, []);


    useEffect(() => {
        if (data.length > 0) {
            setFilteredData(data);
        }
    }, [data]);

    const cours =[];

    data.map((coursData, index) => {
        cours.push(coursData);
    });

    const [filteredData, setFilteredData] = useState(cours);
    const [selectedCategory, setSelectedCategory] = useState('All');
    
    const handleSearch = (searchTerm, category) => {
        const filteredResults = cours.filter((item) =>
          item.Title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.Instrument.Name.toLowerCase().includes(searchTerm.toLowerCase())
        );
      
        const filteredByCategory = selectedCategory === 'All'
            ? filteredResults
            : filteredResults.filter(item => item.Instrument.Name === selectedCategory);
      
      
        setFilteredData(filteredByCategory);
    };
    
    useEffect((category) => {
        handleSearch('',category);
    }, [selectedCategory]);
    
    const handleCategoryFilter = (cours) => {
        setSelectedCategory(cours.Instrument.Name);
        let selectedBtn = document.getElementById(cours.Instrument.Name);
        for (let i = 0; i < cours.length; i++) {
            let btn = document.getElementById(cours.Instrument.Name[i]);
            if (btn !== selectedBtn) {
                btn.classList.remove('active');
            }
        }
        selectedBtn.classList.toggle('active');
        if(!selectedBtn.classList.contains('active')){
            setSelectedCategory('All');
        }
    };

    return (
        <div className="content CoursSearch">
            <SearchBar onSearch={handleSearch} />
            <div id='categoryFilter'>
                {cours.map((c, index) => (
                <button
                    key={index}
                    id={c.Instrument.Name}
                    onClick={() => handleCategoryFilter(c)}
                >{c.Instrument.Name}</button>
                ))}
            </div>
            {filteredData.map((cours, index) => (
                <Link key={index} to={`/cours/${cours.id}`}>
                <GreyDiv
                    content={
                    <div>
                        <h2>{cours.Title} <span className="greyText"> · {cours.Instrument.Name} </span></h2>
                        <p>{cours.desc}</p>
                        <img src="/img/cours-image.jpg" alt="cours illustration" />
                    </div>
                    }
                />
                </Link>
            ))}
        </div>
    )
}

export default function CoursSearch(){
    return (
    <Search />
    );
};