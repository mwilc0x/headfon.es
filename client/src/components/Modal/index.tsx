import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import './style.css';

const modalRoot = document.getElementById('modal-root') || document.createElement('div');

function Modal(props) {
  let el = document.createElement('div');

  useEffect(() => {
    el.className = 'modal-container';
    modalRoot.appendChild(el);

    return () => {
        modalRoot.removeChild(el);
    }
  })

  return createPortal(
    props.children,
    el
  );
}

export default Modal;
