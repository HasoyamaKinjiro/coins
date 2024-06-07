import React, {useEffect, useState, useRef} from 'react';
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
    const rootRef = useRef<HTMLUListElement>(null);
    const [start, setStart] = useState(0);

    const toggleFavorite = (id: number) => {
        setFavorites(prevState => {
            const newFavorites = { ...prevState };
            newFavorites[id] = !newFavorites[id];
            return newFavorites;
        });
    };

    const switchButton = (show: boolean) => {
        if (show) setStart(0)
        setShowFavorites(show);
    }

    const rowHeight = 28;
    const visibleRows = 9;

    function getTopHeight() {
        return rowHeight * start;
    }

    function getBottomHeight() {
        return rowHeight * (coins.length - (start + visibleRows));
    }

    function onScroll(e: any) {
        setStart(Math.floor(e.target.scrollTop / rowHeight))
    }

    useEffect(() => {
        const currentRef = rootRef.current;
        if (currentRef) {
            currentRef.addEventListener('scroll', onScroll);

            return () => currentRef.removeEventListener('scroll', onScroll);
        }
    }, []);

    const filteredCoins = showFavorites ? coins.filter(coin => favorites[coin.id]) : coins;

    const renderedCoins = filteredCoins
        .slice(start, start + visibleRows + 1)
        .map(coin => (
        <Coin
            name={coin.name}
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
            <ul className="coins-ul" ref={rootRef}>
                <div style={{height: getTopHeight()}}/>
                {renderedCoins}
                <div style={{height: getBottomHeight()}}/>
            </ul>
        </div>
    );
};

export default SearchList;
