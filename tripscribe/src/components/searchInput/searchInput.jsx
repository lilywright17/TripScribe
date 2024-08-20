import  React from 'react';
import './searchInput.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

export const SearchInput = ({ handleKeyDown, onChange, searchQuery }) => {

	return (
		<div className="search-container">
            <input 
                type="text" 
                placeholder="Search your trips..." 
                value={searchQuery} 
                onChange={onChange}
				onKeyDown={handleKeyDown} 
				className="search-input"
            />
			<FontAwesomeIcon icon={faSearch} />
			</div>
	)
}