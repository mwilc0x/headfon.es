import * as React from 'react';
import { Router } from '@reach/router';
import { IRouteProps } from '../../routing';
import {
  SearchInput,
  SearchRecent,
} from '../../components';
import './style.css';

const SearchResults = React.lazy(() => import('../../components/search/Results'));

interface Props extends IRouteProps {}

export function Search(props: Props) {
  return (
    <div className="search">
      <SearchInput />

      <Router>
        <SearchRecent path="/recent" />
        <SearchResults path="/results/:query" />
      </Router>
    </div>
  )
}

export default Search;
