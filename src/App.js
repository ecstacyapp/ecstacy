import React, { useState, useRef, useEffect } from 'react';
import { Route, Routes, Link, useNavigate } from 'react-router-dom';
import './App.css';
import Fuse from 'fuse.js';
import { ImagesContent, VideosContent } from './Media';
import { TagsContent, CharactersContent, HottiesContent, ChicksContent, ShowsContent } from './Entities';
import SettingsContent from './Settings'

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1);
  const [isSelectionToolActive, setIsSelectionToolActive] = useState(false); // New state for toggle
  const [gridSize, setGridSize] = useState(3); // New state for grid size
  const searchBarRef = useRef(null);
  const navigate = useNavigate();

  const tabs = ['Images', 'Videos', 'Tags', 'Characters', 'Hotties', 'Chicks', 'Shows', 'Settings'];

  const defaultColor = '#999999';

  const tagsList = [
    { name: 'Tag1', color: '#FF5733', type: 'Tag' },
    { name: 'Tag2', color: '#33FF57', type: 'Tag' },
    { name: 'Tag3', color: '#3357FF', type: 'Tag' }
  ].map(item => ({ ...item, color: item.color || defaultColor }));

  const charactersList = [
    { name: 'Character1', color: '#FFD700', type: 'Character' },
    { name: 'Character2', color: '#FF1493', type: 'Character' },
    { name: 'Character3', color: '#8A2BE2', type: 'Character' }
  ].map(item => ({ ...item, color: item.color || defaultColor }));

  const hottiesList = [
    { name: 'Hottie1', color: '#FF6347', type: 'Hottie' },
    { name: 'Hottie2', color: '#7CFC00', type: 'Hottie' },
    { name: 'Hottie3', color: '#4682B4', type: 'Hottie' }
  ].map(item => ({ ...item, color: item.color || defaultColor }));

  const chicksList = [
    { name: 'Chick1', color: '#FFB6C1', type: 'Chick' },
    { name: 'Chick2', color: '#20B2AA', type: 'Chick' },
    { name: 'Chick3', color: '#87CEFA', type: 'Chick' }
  ].map(item => ({ ...item, color: item.color || defaultColor }));

  const showsList = [
    { name: 'Show1', color: '#40E0D0', type: 'Show' },
    { name: 'Show2', color: '#FF4500', type: 'Show' },
    { name: 'Show3', color: '#DA70D6', type: 'Show' }
  ].map(item => ({ ...item, color: item.color || defaultColor }));

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    if (term) {
      const allItems = [...tagsList, ...charactersList, ...hottiesList, ...chicksList, ...showsList];
      const options = {
        keys: ['name'],
        threshold: 0.8
      };
      const fuse = new Fuse(allItems, options);
      const results = fuse.search(term).map(({ item }) => ({
        ...item,
        color: item.color || defaultColor
      }));
      setSuggestions(results);
      setSelectedSuggestionIndex(0);
    } else {
      setSuggestions([]);
      setSelectedSuggestionIndex(-1);
    }
  };
  
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      setSelectedSuggestionIndex(prevIndex =>
        Math.min(prevIndex + 1, suggestions.length - 1)
      );
    } else if (e.key === 'ArrowUp') {
      setSelectedSuggestionIndex(prevIndex => Math.max(prevIndex - 1, 0));
    } else if (e.key === 'Enter') {
      if (selectedSuggestionIndex >= 0 && selectedSuggestionIndex < suggestions.length) {
        handleSuggestionClick(suggestions[selectedSuggestionIndex]);
      }
    } else if (e.key === 'Escape') {
      setSearchTerm('');
      setSuggestions([]);
      searchBarRef.current.focus();
    }
  };

  const handleSuggestionClick = (suggestion) => {
    const lowerCaseSuggestion = suggestion.name.toLowerCase();
    let url;
  
    if (tagsList.some(item => item.name === suggestion.name)) {
      url = `/tags?tag=${encodeURIComponent(lowerCaseSuggestion)}`;
    } else if (charactersList.some(item => item.name === suggestion.name)) {
      url = `/characters?character=${encodeURIComponent(lowerCaseSuggestion)}`;
    } else if (hottiesList.some(item => item.name === suggestion.name)) {
      url = `/hotties?hottie=${encodeURIComponent(lowerCaseSuggestion)}`;
    } else if (chicksList.some(item => item.name === suggestion.name)) {
      url = `/chicks?chick=${encodeURIComponent(lowerCaseSuggestion)}`;
    } else if (showsList.some(item => item.name === suggestion.name)) {
      url = `/shows?show=${encodeURIComponent(lowerCaseSuggestion)}`;
    }
  
    navigate(url);
    setSearchTerm('');
    setSuggestions([]);
  };

  useEffect(() => {
    const handleGlobalKeyDown = (e) => {
      if (e.key === 'Escape') {
        setSearchTerm('');
        setSuggestions([]);
        searchBarRef.current.focus();
      }
    };

    document.addEventListener('keydown', handleGlobalKeyDown);
    
    return () => {
      document.removeEventListener('keydown', handleGlobalKeyDown);
    };
  }, []);

  const renderContent = (gridSize) => {
    return (
      <Routes>
        <Route path="/tags" element={<TagsContent gridSize={gridSize} />} />
        <Route path="/characters" element={<CharactersContent gridSize={gridSize} />} />
        <Route path="/hotties" element={<HottiesContent gridSize={gridSize} />} />
        <Route path="/chicks" element={<ChicksContent gridSize={gridSize} />} />
        <Route path="/shows" element={<ShowsContent gridSize={gridSize} />} />
        <Route path="/settings" element={<SettingsContent />} />
        <Route path="/images" element={<ImagesContent gridSize={gridSize} />} />
        <Route path="/videos" element={<VideosContent gridSize={gridSize} />} />
        <Route path="/" element={<div>Select a tab or use the search bar</div>} />
      </Routes>
    );
  };
  
  const isLight = (color) => {
    if (!color) return true; // Default to light if color is undefined
    const hex = color.replace('#', '');
    if (hex.length !== 6) return true; // Default to light if color is invalid
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminance > 0.5;
  };

  const toggleSelectionTool = () => {
    setIsSelectionToolActive(prevState => !prevState);
  };

  const handleSliderChange = (e) => {
    setGridSize(parseInt(e.target.value, 10));
  };

  return (
    <div>
      <div className="search-bar">
        <div className="search-bar-elements">
          <button 
            className={`selection-tool ${isSelectionToolActive ? 'active' : ''}`} 
            onClick={toggleSelectionTool}
          >
            Selection Tool
          </button>
          <div className="slider-container">
            <input 
              type="range" 
              min="1" 
              max="5" 
              step="1" 
              value={gridSize} 
              onChange={handleSliderChange} // Update handler
            />
          </div>
          <div className="search-input-container">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={handleSearchChange}
              onKeyDown={handleKeyDown}
              ref={searchBarRef}
            />
            {suggestions.length > 0 && (
              <ul className="suggestions">
                {suggestions.map((suggestion, index) => {
                  const bgColor = suggestion.color || defaultColor;
                  const textColor = isLight(bgColor) ? '#000' : '#fff';
                  return (
                    <li
                      key={index}
                      className={index === selectedSuggestionIndex ? 'selected' : ''}
                      onClick={() => handleSuggestionClick(suggestion)}
                    >
                      <span style={{ marginRight: '10px'}}>
                        {suggestion.type}:
                      </span>
                      <span className="tag" style={{ backgroundColor: bgColor, color: textColor }}>
                        {suggestion.name}
                      </span>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
          <button className="add-button">+</button>
          <button className="remove-button">-</button>
          <select className="sort-dropdown">
            <option value="desc">Alphabetically</option>
            <option value="desc">Path</option>
            <option value="asc">Random</option>
            <option value="desc">Size</option>
          </select>
        </div>
      </div>
      <div className="top-bar">
        {tabs.map((tab) => (
          <Link
            key={tab}
            to={`/${tab.toLowerCase()}`}
            className={window.location.pathname.includes(tab.toLowerCase()) ? 'selected' : ''}
          >
            {tab}
          </Link>
        ))}
      </div>
      <div id="content">
        {renderContent(gridSize)} {/* Pass gridSize */}
      </div>
    </div>
  );
}

export default App;
