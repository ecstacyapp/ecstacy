import React from 'react';
import { Link } from 'react-router-dom';

function Tab({ label, selected, onClick }) {
  return (
    <Link
      to={`/${label.toLowerCase()}`}
      className={selected ? 'selected' : ''}
      onClick={onClick}
    >
      {label}
    </Link>
  );
}

export default Tab;
