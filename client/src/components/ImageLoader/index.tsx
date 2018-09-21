import * as React from 'react';
import './style.css';

interface Props {
  className?: string;
  src: string;
}

interface State {
  visible: boolean;
}

class ImageLoader extends React.Component<Props, State> {
  public state = { visible: false };
  public render() {
    const { className = '', src } = this.props;
    const { visible } = this.state;
    const opacity = visible === true ? 1 : 0;
    return (
      <img
        onLoad={this.handleImageLoad}
        className={`image-container ${className}`}
        src={src}
        style={{ opacity }}
      />
    );
  }
  private handleImageLoad = () => {
    this.setState({
      visible: true,
    });
  };
}

export default ImageLoader;
