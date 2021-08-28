import React from 'react';
import './style.css';

interface Props {
  alt?: string;
  className?: string;
  src: string;
}

function ImageLoader(props: Props) {
  const { alt, className, src } = props;
  return (
    <React.Suspense fallback={'Loading...'}>
      <img alt={alt} className={`image-container ${className || ''}`} src={src} />
    </React.Suspense>
  );
}

export default ImageLoader;
