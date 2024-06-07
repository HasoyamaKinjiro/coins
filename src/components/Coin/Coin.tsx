import React from 'react';
import IconsSvg from '../../assets/icons.svg';

interface CoinProps {
    name: string;
    isFavorite: boolean;
    toggleFavorite: () => void;
}

const Coin = ({ name, isFavorite, toggleFavorite }: CoinProps) => {
    return (
        <li className="coins-li"
            onClick={toggleFavorite}
        >
            <svg width="16" height="16">
                <use href={`${IconsSvg}${isFavorite ? "#icon-StarFull" : "#icon-StarEmpty"}`}></use>
            </svg>
            {name}
        </li>
    );
};

export default Coin;
