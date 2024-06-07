import React, {useState} from 'react';
import IconsSvg from '../../assets/icons.svg';
import {CoinI} from '../../types';

interface CoinProps {
    name: string;
    favorite: boolean;
    isFavorite: boolean;
    toggleFavorite: () => void;
}

const Coin = ({ name, favorite, isFavorite, toggleFavorite }: CoinProps) => {
    /*const [isFavorite, setIsFavorite] = useState(favorite);*/

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
