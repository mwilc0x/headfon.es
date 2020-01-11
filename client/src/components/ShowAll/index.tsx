import * as React from 'react';
import './style.css';

interface Props {
  handleClick: any;
  label: string;
}

function ShowAll({ handleClick, label }: Props) {
  return (
    <span className="show-all" onClick={handleClick}>
      {label}
    </span>
  );
}

export default ShowAll;
