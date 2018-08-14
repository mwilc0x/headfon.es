import * as React from 'react';
import './style.css';

export const Loading = (props) => {
  if (props.error) {
    return <div>Error! <button onClick={ props.retry }>Retry</button></div>;
  } else if (props.pastDelay) {
    return <p className="loading-progress">Loading!!!!!</p>;
  } else {
    return  <p className="loading-progress">what!!!!!</p>;
  }
}

export default Loading;
