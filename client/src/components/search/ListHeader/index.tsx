import * as React from 'react';
import './style.css';

export default class ListHeader extends React.PureComponent {
  public render() {
    return <p className="list-header">{this.props.children}</p>;
  }
}
