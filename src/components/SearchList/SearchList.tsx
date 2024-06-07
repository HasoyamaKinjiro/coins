import React, {useState} from 'react';
import './SearchList.css';
import {CoinI} from '../../types';
import SearchButton from '../ui/SearchButton';
import Coin from '../Coin';

interface SearchListProps {
    coins: CoinI[];
}

const SearchList = ({ coins }: SearchListProps) => {
    const [favorites, setFavorites] = useState<Record<number, boolean>>(
        coins.reduce((acc, coin) => {
            acc[coin.id] = coin.favorite;
            return acc;
        }, {} as Record<number, boolean>)
    );
    const [showFavorites, setShowFavorites] = useState(false);

    const toggleFavorite = (id: number) => {
        setFavorites(prevState => {
            const newFavorites = { ...prevState };
            newFavorites[id] = !newFavorites[id];
            return newFavorites;
        });
    };

    const switchButton = (show: boolean) => {
        setShowFavorites(show);
    }

    const filteredCoins = showFavorites ? coins.filter(coin => favorites[coin.id]) : coins;

    const renderedCoins = filteredCoins.map(coin => (
        <Coin
            name={coin.name}
            favorite={coin.favorite}
            isFavorite={favorites[coin.id]}
            key={coin.id}
            toggleFavorite={() => toggleFavorite(coin.id)}
        />
    ));

    return (
        <div className="search-list">
            <div className="search-list_btns">
                <SearchButton
                    title="favorites"
                    svg={{
                        iconId: "#icon-StarFull",
                        width: 16,
                        height: 16
                    }}
                    onClick={() => switchButton(true)}
                />
                <SearchButton
                    title="all coins"
                    onClick={() => switchButton(false)}
                />
            </div>
            <ul className="coins-ul">
                {renderedCoins}
            </ul>
        </div>
    );
};

export default SearchList;
