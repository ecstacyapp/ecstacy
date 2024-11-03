// Entities.js
import React from 'react';
import { useLocation } from 'react-router-dom';

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

export const TagsContent = () => {
  const query = useQuery();
  const tagName = query.get('tag');
  return <div>{`Tags Content: ${tagName}`}</div>;
};

export const CharactersContent = () => {
  const query = useQuery();
  const characterName = query.get('character');
  return <div>{`Characters Content: ${characterName}`}</div>;
};

export const HottiesContent = () => {
  const query = useQuery();
  const hottieName = query.get('hottie');
  return <div>{`Hotties Content: ${hottieName}`}</div>;
};

export const ChicksContent = () => {
  const query = useQuery();
  const chickName = query.get('chick');
  return <div>{`Chicks Content: ${chickName}`}</div>;
};

export const ShowsContent = () => {
  const query = useQuery();
  const showName = query.get('show');
  return <div>{`Shows Content: ${showName}`}</div>;
};
