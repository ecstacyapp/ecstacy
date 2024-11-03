import React from 'react';

function Thumbnail({ src, caption }) {
  return (
    <div className="thumbnail">
        <div className="image-container">
            <img src={src} alt={caption} />
        </div>
        <div className="caption">{caption}</div>
    </div>
  );
}

export default Thumbnail;
