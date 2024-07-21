import React, { useState, useRef, useEffect } from 'react';
import './customDropdown.css';
import { WatchListCoin } from '../Watchlist/watchList';
import { useNavigate } from 'react-router-dom';

interface CustomDropdownProps {
  recentlyViewed: Array<WatchListCoin>;
  placeholder?: string;
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({
  recentlyViewed,
  placeholder = 'Select an option',
}) => {
    const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    setSearchTerm(option)
    setIsOpen(false);
    setSearchTerm('');
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const filteredOptions = recentlyViewed.filter((option) =>
    option.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div
      className="custom-dropdown text-black p-1 roboto-light flex-1 bg-white dark:text-white dark:bg-black"
      ref={dropdownRef}
    >
      <div className="custom-dropdown-header" onClick={() => setIsOpen(!isOpen)}>
        <input
            type="text"
            className="w-full bg-white dark:bg-transparent text-sm md:text-normal p-0 "
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        <span className={`custom-dropdown-icon ${isOpen ? 'open' : ''}`}>▼</span>
      </div>
      {isOpen && (
        <div className="custom-dropdown-list-container">
         
          <ul className="custom-dropdown-list">
          {filteredOptions && <li
                className="custom-dropdown-item text-center dark:bg-black"
              >
                Search for Coin
              </li>}
            {filteredOptions.map((option, index) => (
              <li
                key={index}
                className="custom-dropdown-item dark:bg-black"
                onClick={() => {handleOptionClick(option.name);navigate(`/product/${option.id}`);}}
              >
                {option.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CustomDropdown;
