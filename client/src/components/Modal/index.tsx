import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './style.css';

const modalRoot = document.getElementById('modal-root') || document.createElement('div');

class Modal extends React.PureComponent {
  private el = document.createElement('div');

  public componentDidMount() {
    this.el.className = 'modal-container';
    modalRoot.appendChild(this.el);
  }

  public componentWillUnmount() {
    modalRoot.removeChild(this.el);
  }

  public render() {
    return ReactDOM.createPortal(
      this.props.children,
      this.el
    ); 
  }


}

export default Modal;
