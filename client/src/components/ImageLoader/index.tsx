import React from 'react';
import './style.css';

interface Props {
  className?: string;
  src: string;
}

function ImageLoader(props: Props) {
  const { className, src } = props;
  return (
    <React.Suspense fallback={'Loading...'}>
      <img className={`image-container ${className || ''}`} src={src} />
    </React.Suspense>
  );
}

export default ImageLoader;
