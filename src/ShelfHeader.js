import React from 'react';

export default function ShelfHeader(props) {
  return (
    <h2 className="bookshelf-title">{props.shelfHeading}</h2>
  );
}
