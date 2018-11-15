import * as React from 'react';
import { query as urqlQuery } from 'urql';
import { unstable_createResource as createResource} from 'react-cache';
import { client } from '../../../helpers';
import { SearchResultsQuery } from '../../../queries';
import {
    AlbumList,
    PlaylistList,
    TrackList,
} from '../';
import { Spinner } from '../../';
import './style.css';

const SearchDataResource = createResource(
    (query) => client.executeQuery(urqlQuery(SearchResultsQuery, { query }), true)
);

function Results(props) {
    const { query } = props;
    const { data } = SearchDataResource.read(query);

    const { albums, playlists, tracks } = data.search;

    React.useEffect(() => {
        window.scrollTo(0, 0);
    });

    return (
        <div className="search-results">
            <AlbumList albums={albums} />
            <PlaylistList playlists={playlists} />
            <TrackList tracks={tracks} />
        </div>
    );
}

export default (props) => (
    <React.Suspense fallback={<Spinner size="large" />}>
        <Results {...props} />
    </React.Suspense>
);
