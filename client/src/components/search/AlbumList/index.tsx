import * as React from 'react';
import { AlbumListing, ListHeader } from '../';
import { ShowAll } from '../../';
import './style.css';

interface Props {
  albums: any;
}

function AlbumList(props: Props) {
  const {
    albums: { items },
  } = props;
  const [showAll, setShowAll] = React.useState(false);
  let itemsToShow = showAll ? items : items.slice(0, 5);

  return (
    <div className="album-list">
      {!!items.length && <ListHeader>Albums</ListHeader>}

      <div className="album-list__grid">
        {itemsToShow.map((album: any, i: number) => (
          <AlbumListing album={album} key={i} />
        ))}
      </div>

      {!showAll && items.length > 5 ? (
        <ShowAll handleClick={() => setShowAll(true)} label="Show All" />
      ) : null}
    </div>
  );
}

AlbumList.defaultProps = { albums: { items: [] } };

export default AlbumList;
