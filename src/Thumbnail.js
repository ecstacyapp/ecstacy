import React from 'react';
import './Thumbnail.css'; // Assuming you have a Thumbnail.css

const Thumbnail = ({ src, caption }) => (
  <div className="thumbnail">
    <div className="image-container">
      <img src={src} alt={caption} />
    </div>
    <div className="caption">{caption}</div>
  </div>
);

export default Thumbnail;
