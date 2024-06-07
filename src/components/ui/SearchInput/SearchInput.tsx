import React, {useState} from 'react';
import './SearchInput.css';
import SearchIcon from './assets/SearchIcon';

interface SearchInputProps {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchInput = ({ value, onChange }: SearchInputProps) => {
    const [isFocused, setIsFocused] = useState(false);

    return (
        <div className="search-form">
            <SearchIcon
                color={isFocused ? `var(--text-color)` : `var(--border-color)`}
                width="18"
                height="18"
            />
            <input
                className="search-input"
                type="search"
                autoFocus={true}
                value={value}
                onChange={onChange}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholder="Search..."
            />
        </div>
    );
};

export default SearchInput;
