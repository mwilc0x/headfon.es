import * as React from 'react';
import { ConnectHOC, Client, query } from 'urql';
import { updateSearchResults } from '../../../store';
import { navigate } from '@reach/router';
import { SearchQuery } from '../../../queries';
import './style.css';

interface ISearchProps {
  client: Client;
}
interface ISearchState {
  query: string;
}

export class Search extends React.Component<ISearchProps, ISearchState> {
  public input;
  public state: ISearchState = { query: '' };
  public componentDidMount() {
    this.input.focus();
  }

  public render() {
    return (
      <div className="search">
        <div className="search-input-info">
          Search for an album, songs or playlists
        </div>
        <input
          type="text"
          name="searchQuery"
          onChange={this.handleChange}
          onKeyPress={this.handleKeyPress}
          placeholder="Start typing..."
          ref={r => (this.input = r)}
        />
      </div>
    );
  }
  private handleSearch = () => {
    const { client } = this.props;
    const { query: inputQuery } = this.state;

    client
      .executeQuery(query(SearchQuery, { query: inputQuery }), true)
      .then((res: any) => {
        updateSearchResults(res.data.search);
        navigate('/search');
      });
  };
  private handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = e;
    const { value } = target;

    this.setState({
      query: value,
    });
  };
  private handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      this.handleSearch();
    }
  };
}

export default ConnectHOC()(Search);
