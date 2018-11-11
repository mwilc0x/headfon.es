import * as React from 'react';
import './style.css';

function ListHeader(props) {
  return <p className="list-header">{props.children}</p>;
}

export default ListHeader;

