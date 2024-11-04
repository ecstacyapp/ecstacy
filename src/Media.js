// Media.js
import React from 'react';
import Thumbnail from './Thumbnail';

const thumbnails = Array.from({ length: 12 }).map((_, index) => ({
    src: 'https://via.placeholder.com/300x400', // Replace with the actual thumbnail image URL
    caption: `Caption ${index + 1}`
}));
const videoThumbnails = Array.from({ length: 12 }).map((_, index) => ({
    src: Math.random() > 0.5 ? 'https://via.placeholder.com/300x169' : 'https://via.placeholder.com/169x300', // Randomly choose between 16:9 or 9:16
    caption: `Video Caption ${index + 1}`
}));

export const ImagesContent = ({ gridSize }) => (
  <div className={`grid grid-size-${gridSize}`}>
    {thumbnails.map((thumbnail, index) => (
      <Thumbnail key={index} src={thumbnail.src} caption={thumbnail.caption} />
    ))}
  </div>
);

export const VideosContent = ({ gridSize }) => (
  <div className={`grid grid-size-${gridSize}`}>
    {videoThumbnails.map((thumbnail, index) => (
      <Thumbnail key={index} src={thumbnail.src} caption={thumbnail.caption} />
    ))}
  </div>
);
