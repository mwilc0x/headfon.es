import React from 'react';
import { Img } from 'the-platform';
import './style.css';

interface Props {
  className?: string;
  src: string;
}

function ImageLoader(props: Props) {
  const { className, src } = props;
  return (
    <React.Suspense fallback={'Loading...'}>
        <Img
          className={`image-container ${className}`}
          src={src}
        />
    </React.Suspense>
  );
}

export default ImageLoader;
