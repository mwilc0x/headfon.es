import * as React from 'react';
import { navigate } from '@reach/router';
import { PlayButton } from 'react-player-controls';
import { ImageLoader } from '../../';
import { playAlbum } from '../../../store';
import './style.css';

interface Props {
  album: Album;
}

function AlbumListing(props: Props) {
  const [showPlayIcon, setShowPlayIcon] = React.useState(false);
  const { album } = props;
  const { images } = album;

  function navigateToAlbum() {
    const { id } = album;
    navigate(`/album/${id}`);
  }
  function handleAlbumPlay(e) {
    e.stopPropagation();
    playAlbum(album);
  }
  function handleOnMouseEnter() {
    setShowPlayIcon(true);
  }

  function handleOnMouseLeave() {
    setShowPlayIcon(false);
  };

  return (
    <div
      className="album-listing"
      onClick={navigateToAlbum}
      onMouseEnter={handleOnMouseEnter}
      onMouseLeave={handleOnMouseLeave}
    >
      {showPlayIcon ? (
        <PlayButton isEnabled={true} onClick={handleAlbumPlay} />
      ) : null}
      <ImageLoader src={images[0].url} />
    </div>
  );
}

export default AlbumListing;
