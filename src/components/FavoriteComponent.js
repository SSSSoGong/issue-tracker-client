import React, { useState } from 'react';

const FavoriteComponent = () => {
    const [isFavorite, setIsFavorite] = useState(false);

    const toggleFavorite = () => {
        setIsFavorite(prevIsFavorite => !prevIsFavorite);
    };

    // 디자인
    const buttonStyle = {
        fontSize: '1rem',
        color: isFavorite ? 'gold' : 'black',
        backgroundColor: isFavorite ? 'navy' : 'gray',
        border: 'none',
        borderRadius : "5px",
        cursor: 'pointer',
    };

    return (
        <div style={{display:"inline"}}>
            <button onClick={toggleFavorite} style={buttonStyle}>
                { isFavorite ? '★' : '☆' }
            </button>
        </div>
    );
};

export default FavoriteComponent;
