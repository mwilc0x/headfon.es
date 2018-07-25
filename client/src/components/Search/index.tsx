import * as React from 'react';
import { ConnectHOC, Client, query } from 'urql';

interface ISearchProps { client: Client }
interface ISearchState { query: string }

export class Search extends React.Component<ISearchProps, ISearchState> {
  public state: ISearchState = { query: '' };

  public render() {
    return (
      <div>
        <input type="text" name="searchQuery" onChange={this.handleChange} />
        <button onClick={this.handleSearch}>Search</button>
      </div>
    );
  }
  private handleSearch = () => {
    const { client } = this.props;
    const { query: inputQuery } = this.state;

    client.executeQuery(query(LookupSearch, { query: inputQuery }), true)
      .then(console.log);
  }
  private handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = e;
    const { value } = target;

    this.setState({
      query: value
    });
  }
}

const LookupSearch = `
query($query: String) {
  search(query: $query) {
    albums {
      items {
        name
      }
    }
  }
}
`;

export default ConnectHOC()(Search);
