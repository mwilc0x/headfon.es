import React from 'react';
import './style.css';

interface Props {
  className?: string;
  src: string;
}

function ImageLoader(props: Props) {
  const [visible, setVisible] = React.useState(false);
  const { className = '', src } = props;
  const opacity = visible === true ? 1 : 0;

  return (
    <img
      onLoad={() => setVisible(true)}
      className={`image-container ${className}`}
      src={src}
      style={{ opacity }}
    />
  );
}

export default ImageLoader;
