import React from 'react';
import { useLocation } from 'react-router-dom';
import Thumbnail from './Thumbnail'; // Import Thumbnail component

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

// Define data arrays for each category
const characters = Array.from({ length: 12 }).map((_, index) => ({
  src: 'https://via.placeholder.com/300x400', // Replace with actual character image URL
  caption: `Character ${index + 1}`
}));

const hotties = Array.from({ length: 12 }).map((_, index) => ({
  src: 'https://via.placeholder.com/300x400', // Replace with actual hottie image URL
  caption: `Hottie ${index + 1}`
}));

const chicks = Array.from({ length: 12 }).map((_, index) => ({
  src: 'https://via.placeholder.com/300x400', // Replace with actual chick image URL
  caption: `Chick ${index + 1}`
}));

const shows = Array.from({ length: 12 }).map((_, index) => ({
  src: 'https://via.placeholder.com/300x400', // Replace with actual show image URL
  caption: `Show ${index + 1}`
}));

const tags = Array.from({ length: 12 }).map((_, index) => ({
  src: 'https://via.placeholder.com/300x400', // Replace with actual tag image URL
  caption: `Tag ${index + 1}`
}));

export const TagsContent = ({ gridSize }) => (
  <div className={`grid grid-size-${gridSize}`}>
    {tags.map((tag, index) => (
      <Thumbnail key={index} src={tag.src} caption={tag.caption} />
    ))}
  </div>
);

export const CharactersContent = ({ gridSize }) => (
  <div className={`grid grid-size-${gridSize}`}>
    {characters.map((character, index) => (
      <Thumbnail key={index} src={character.src} caption={character.caption} />
    ))}
  </div>
);

export const HottiesContent = ({ gridSize }) => (
  <div className={`grid grid-size-${gridSize}`}>
    {hotties.map((hottie, index) => (
      <Thumbnail key={index} src={hottie.src} caption={hottie.caption} />
    ))}
  </div>
);

export const ChicksContent = ({ gridSize }) => (
  <div className={`grid grid-size-${gridSize}`}>
    {chicks.map((chick, index) => (
      <Thumbnail key={index} src={chick.src} caption={chick.caption} />
    ))}
  </div>
);

export const ShowsContent = ({ gridSize }) => (
  <div className={`grid grid-size-${gridSize}`}>
    {shows.map((show, index) => (
      <Thumbnail key={index} src={show.src} caption={show.caption} />
    ))}
  </div>
);
