import React from 'react';
import './SearchButton.css';
import IconsSvg from '../../../assets/icons.svg';

interface SearchButtonProps {
    title: string;
    className?: string;
    svg?: {
        iconId: string;
        width: string | number;
        height: string | number;
    };
    onClick: () => void;
}

const SearchButton = ({ title, onClick, className, svg }: SearchButtonProps) => {
    return (
        <button className={`search-button ${className}`} onClick={onClick}>
            {
                svg &&
                <svg width={svg.width} height={svg.height}>
                    <use href={IconsSvg + svg.iconId}></use>
                </svg>
            }
            {title}
        </button>
    );
};

export default SearchButton;
