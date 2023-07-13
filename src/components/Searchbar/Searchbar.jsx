import { useState } from 'react';
import './Searchbar.module.css';
import PropTypes from 'prop-types';

export const Searchbar = ({ onSubmit}) => {
 const [searchQuery, setSearchQuery] = useState('');

 const handleChange = e => {
    setSearchQuery(e.target.value.toLowerCase());
  };

 const handleSubmit = e => {
    e.preventDefault();
    if (searchQuery.trim() === '') {
      return alert('Please enter something');
    }
    onSubmit(searchQuery);
    setSearchQuery('');
  };

    return (
      <header>
        <form onSubmit={handleSubmit}>
          <button type="submit">Search
          </button>

          <input
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            name="searchQuery"
            value={searchQuery}
            onChange={handleChange}
          />
        </form>
      </header>
    );
  }

Searchbar.propTypes = {
  onSubmit: PropTypes.func,
};