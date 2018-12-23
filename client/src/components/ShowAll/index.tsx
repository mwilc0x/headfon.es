import * as React from 'react';
import './style.css';

function ShowAll({ handleClick }) {
  return (
    <span className="show-all" onClick={handleClick}>
      Show All
    </span>
  );
}

export default ShowAll;
