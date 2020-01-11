import * as React from 'react';
import { useQuery } from 'urql';
import { playTrack, setArtistViewingTopTracks } from '../../../store';
import { ArtistTopTracksQuery } from '../../../queries';

interface Props {
  id: string;
  tracks: ArtistTopTrack[];
}

const Track = props => {
  const playArtistTrack = () => {
    playTrack(props.track);
  };

  const { name } = props.track;

  return <div onClick={playArtistTrack}>{name}</div>;
};

function ArtistTopTracks(props: Props) {
  const { id } = props;
  const [result] = useQuery({ query: ArtistTopTracksQuery, variables: { id } });
  const { data } = result;
  setArtistViewingTopTracks(data.artistTopTracks.tracks);

  const { tracks } = props;
  return (
    <div>
      {tracks.map((track, i) => (
        <Track key={i} track={track} />
      ))}
    </div>
  );
}

export default ArtistTopTracks;
