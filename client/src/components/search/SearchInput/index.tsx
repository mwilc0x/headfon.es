import * as React from 'react';
import { ConnectHOC, Client, query } from 'urql';
import { updateSearchResults } from '../../../store';
import { navigate } from '@reach/router';
import './style.css';

interface ISearchProps { client: Client }
interface ISearchState { query: string }

export class Search extends React.Component<ISearchProps, ISearchState> {
  public input;
  public state: ISearchState = { query: '' };
  public componentDidMount() {
    this.input.focus();
  }

  public render() {
    return (
      <div className="search">
        <div className="search-input-info">Search for an album or songs</div>
        <input 
          type="text" 
          name="searchQuery" 
          onChange={this.handleChange} 
          onKeyPress={this.handleKeyPress} 
          placeholder="Start typing..."
          ref={r => this.input = r}
        />
      </div>
    );
  }
  private handleSearch = () => {
    const { client } = this.props;
    const { query: inputQuery } = this.state;

    client.executeQuery(query(LookupSearch, { query: inputQuery }), true)
      .then((res: any) => {
        updateSearchResults(res.data.search);
        navigate('/search');
      });
  }
  private handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = e;
    const { value } = target;

    this.setState({
      query: value
    });
  }
  private handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      this.handleSearch();
    }
  }
}

const LookupSearch = `
query($query: String) {
  search(query: $query) {
    albums {
      items {
        uri
        artists {
          name
        }
        id
        name
        images {
          url
        }
      }
    }
    artists {
      items {
        id
        name
        images {
          url
        }
      }
    }
    playlists {
      items {
        name
        images {
          url
        }
        uri
      }
    }
    tracks {
      items {
        album {
          name
        }
        artists {
          name
        }
        duration_ms
        name
        uri
      }
    }
  }
}
`;

export default ConnectHOC()(Search);
