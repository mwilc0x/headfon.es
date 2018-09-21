import * as React from 'react';
import { Consumer, selectShowHiddenMenu, selectTheme } from '../../store';
import { Modal, ThemeMenu } from '../../components';

export class ModalsContainer extends React.PureComponent {
  public render() {
    return (
      <Consumer select={[selectShowHiddenMenu, selectTheme]}>
        {(showHiddenMenuModal, selectedTheme: any) => {
          return showHiddenMenuModal ? (
            <Modal>
              <ThemeMenu selectedTheme={selectedTheme} />
            </Modal>
          ) : null;
        }}
      </Consumer>
    );
  }
}
