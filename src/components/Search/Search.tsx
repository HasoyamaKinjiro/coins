import React, {useState} from 'react';
import './Search.css';
import coins from '../../data';
import SearchButton from '../ui/SearchButton';
import SearchInput from '../ui/SearchInput';
import SearchList from '../SearchList';

const Search = () => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const openPopUp = () => {
        setIsPopupOpen(!isPopupOpen);
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    const sortedCoins = coins.slice().sort((a, b) => a.name.localeCompare(b.name));

    const filteredCoins = sortedCoins.filter((coin) =>
        coin.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="search">
            <SearchButton
                className={isPopupOpen ? 'search-button_open' : 'search-button_closed'}
                title="search"
                svg={{
                    iconId: "#icon-Search",
                    width: 16,
                    height: 16
                }}
                onClick={openPopUp}
            />
            {
                isPopupOpen &&
                <div className="search-popup">
                    <SearchInput
                        value={searchQuery}
                        onChange={handleSearchChange}
                    />
                    <SearchList coins={filteredCoins} />
                </div>
            }
        </div>
    );
};

export default Search;
