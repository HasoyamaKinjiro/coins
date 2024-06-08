import React, { useState } from 'react';
import './SearchList.css';
import IconsSvg from '../../assets/icons.svg';
import VirtualList from './VirtualList';

interface CoinI {
    id: number;
    name: string;
    favorite: boolean;
}

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

    const renderCoinItem = (coin: CoinI) => (
        <li className="coins-li"
            onClick={() => toggleFavorite(coin.id)}
            key={coin.id}
        >
            <svg width="16" height="16">
                <use href={`${IconsSvg}${favorites[coin.id] ? "#icon-StarFull" : "#icon-StarEmpty"}`}></use>
            </svg>
            <span style={{ userSelect: 'text' }}>{coin.name}</span>
        </li>
    );

    return (
        <div className="search-list">
            <div className="search-list_btns">
                <button
                    className={`search-list_btn ${showFavorites && 'search-list_btn-open'}`}
                    onClick={() => switchButton(true)}
                >
                    <svg width="16" height="16">
                        <use href={IconsSvg + "#icon-StarFull"}></use>
                    </svg>
                    favorites
                </button>
                <button
                    className={`search-list_btn ${!showFavorites && 'search-list_btn-open'}`}
                    onClick={() => switchButton(false)}
                >
                    all coins
                </button>
            </div>
            {filteredCoins.length > 0 ? (
                <VirtualList
                    items={filteredCoins}
                    itemHeight={39}
                    renderItem={renderCoinItem}
                    showFavorites={showFavorites}
                />
            ) : (
                showFavorites ? (
                    <div className="no-results">Sorry, it seems like you don't have any favorite coins. =(</div>
                ) : (
                    <div className="no-results">Sorry, it seems like we can't find your coin. =(</div>
                )
            )}
        </div>
    );
};

export default SearchList;
