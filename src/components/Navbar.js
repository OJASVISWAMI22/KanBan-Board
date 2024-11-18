import React, { useState } from 'react';
import display from '../assets/Display.svg';
import down from '../assets/down.svg';
function Navbar({ grouping, sorting, onGroupingChange, onSortingChange }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleGroupingChange = (newGrouping) => {
    onGroupingChange(newGrouping);
    setIsDropdownOpen(false);
  };

  const handleSortingChange = (newSorting) => {
    onSortingChange(newSorting);
    setIsDropdownOpen(false);
  };
  return (
    <nav className="navbar">
      <div className="display-button" onClick={toggleDropdown}>
        <img src={display}/>
        <span>Display</span>
        <img src={down}></img>
      </div>
      {isDropdownOpen && (
        <div className="dropdown">
          <div className="dropdown-section">
            <label>Grouping</label>
            <select 
              value={grouping} 
              onChange={(e) => handleGroupingChange(e.target.value)}
            >
              <option value="status">Status</option>
              <option value="user">User</option>
              <option value="priority">Priority</option>
            </select>
          </div>
          <div className="dropdown-section">
            <label>Ordering</label>
            <select 
              value={sorting} 
              onChange={(e) => handleSortingChange(e.target.value)}
            >
              <option value="priority">Priority</option>
              <option value="title">Title</option>
            </select>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;