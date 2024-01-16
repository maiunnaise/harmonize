import React, { useState } from 'react';
import './SearchBar.css';

const SearchBar = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleInputChange = (event) => {
        const newSearchTerm = event.target.value;
        setSearchTerm(newSearchTerm);
        onSearch(newSearchTerm);
    };

    return (
        <div >
            <input
            className='SearchBar'
            type="text"
            placeholder="Rechercher..."
            value={searchTerm}
            onChange={handleInputChange}
            />
        </div>
    );
};

export default SearchBar;