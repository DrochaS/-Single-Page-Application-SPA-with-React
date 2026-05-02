import React from 'react'
import './SearchBar.css'

const SearchBar = ({ searchTerm, onSearchChange }) => {
  return (
    <div className="search-container">
      <h2>Search Projects</h2>
      <input
        type="text"
        placeholder="Search by title or description..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="search-input"
        data-testid="search-input"
      />
    </div>
  )
}

export default SearchBar