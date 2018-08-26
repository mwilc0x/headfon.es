import * as React from 'react';
import { Consumer, selectShowHiddenMenu, showHiddenMenu, selectTheme } from '../../store';
import { Modal, ThemeMenu } from '../../components';

export class ModalsContainer extends React.PureComponent {
  public componentDidMount() {
    document.addEventListener('keydown', this.handleGlobalKeyDown);
  }
  public componentWillUnmount() {
    document.removeEventListener('keydown', this.handleGlobalKeyDown);
  }
  public render() {
    return (
      <Consumer select={[selectShowHiddenMenu, selectTheme]}>
        {(showHiddenMenuModal, selectedTheme: any) => {
          return showHiddenMenuModal
            ? <Modal><ThemeMenu selectedTheme={selectedTheme} /></Modal>
            : null;
        }}
      </Consumer>
    );
  }
  private handleGlobalKeyDown = (e) => {
    if (e.ctrlKey === true && e.key === 'e') {
      showHiddenMenu();
    }
  }
}
