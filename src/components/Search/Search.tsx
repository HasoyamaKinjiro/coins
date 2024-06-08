import React, {useEffect, useRef, useState} from 'react';
import { createPortal } from 'react-dom';
import './Search.css';
import IconsSvg from '../../assets/icons.svg';
import coins from '../../data';
import SearchInput from '../ui/SearchInput';
import SearchList from '../SearchList';

const portal = document.getElementById('search-popup-portal');

const Search = () => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [popupStyles, setPopupStyles] = useState({});
    const searchRef = useRef<HTMLDivElement | null>(null);
    const popupRef = useRef<HTMLDivElement | null>(null);

    const openPopUp = () => {
        setIsPopupOpen(!isPopupOpen);
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    const handleClickOutside = (e: MouseEvent) => {
        if (popupRef.current && !popupRef.current.contains(e.target as Node) &&
            searchRef.current && !searchRef.current.contains(e.target as Node)) {
            setIsPopupOpen(false);
        }
    };

    useEffect(() => {
        if (isPopupOpen && searchRef.current) {
            const rect = searchRef.current.getBoundingClientRect();
            setPopupStyles({
                position: 'absolute',
                top: `${rect.bottom}px`,
                right: `${rect.left}px`,
                width: '288px'
            });
        }
    }, [isPopupOpen]);

    useEffect(() => {
        if (isPopupOpen) {
            document.addEventListener('mouseup', handleClickOutside);
        } else {
            document.removeEventListener('mouseup', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mouseup', handleClickOutside);
        };
    }, [isPopupOpen]);

    const sortedCoins = coins.slice().sort((a, b) => a.name.localeCompare(b.name));

    const filteredCoins = sortedCoins.filter((coin) =>
        coin.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="search" ref={searchRef}>
            <button
                className={`search-button ${isPopupOpen ? 'search-button_open' : 'search-button_closed'}`}
                onClick={openPopUp}
            >
                <svg width="16" height="16">
                    <use href={IconsSvg + "#icon-Search"}></use>
                </svg>
                search
            </button>
                {isPopupOpen && portal && createPortal(
                    <div className="search-popup" style={popupStyles} ref={popupRef}>
                        <SearchInput
                            value={searchQuery}
                            onChange={handleSearchChange}
                        />
                        <SearchList coins={filteredCoins} />
                    </div>,
                    portal
                )}
        </div>
    );
};

export default Search;
