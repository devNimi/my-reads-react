import React from 'react';

export default function ShelfHeader(props) {
  return (
    <div>
      <h2 className="bookshelf-title">{props.shelfHeading}</h2>
    <p className="bookshelf-sub-title">{props.shelfSubHeading}</p>
     </div>
  );
}
