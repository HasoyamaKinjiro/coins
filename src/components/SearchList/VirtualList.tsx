import React, { useRef, useState, useEffect, useCallback } from 'react';

interface VirtualListProps<T> {
    items: T[];
    itemHeight: number;
    renderItem: (item: T, index: number) => React.ReactNode;
    showFavorites: boolean;
}

const VirtualList = <T,>({ items, itemHeight, renderItem, showFavorites }: VirtualListProps<T>) => {
    const rootRef = useRef<HTMLUListElement>(null);
    const [start, setStart] = useState(0);
    const visibleRows = 8;

    const onScroll = useCallback((e: any) => {
        setStart(Math.floor(e.target.scrollTop / itemHeight));
    }, [itemHeight]);

    useEffect(() => {
        const currentRef = rootRef.current;
        if (currentRef) {
            currentRef.addEventListener('scroll', onScroll);

            return () => currentRef.removeEventListener('scroll', onScroll);
        }
    }, [onScroll]);

    useEffect(() => {
        if (rootRef.current) {
            rootRef.current.scrollTop = 0;
            setStart(0);
        }
    }, [showFavorites]);

    const getTopHeight = () => {
        return itemHeight * start;
    };

    const getBottomHeight = () => {
        return itemHeight * (items.length - (start + visibleRows));
    };

    const renderedItems = items
        .slice(start, start + visibleRows + 1)
        .map((item, index) => renderItem(item, start + index));

    return (
        <ul className="coins-ul" ref={rootRef} style={{ overflowY: items.length > visibleRows ? 'scroll' : 'hidden' }}>
            <div style={{ height: getTopHeight() }} />
            {renderedItems}
            <div style={{ height: getBottomHeight() }} />
        </ul>
    );
};

export default VirtualList;
