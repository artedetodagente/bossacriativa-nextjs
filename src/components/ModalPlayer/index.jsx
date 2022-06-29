import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { AiFillCloseCircle } from 'react-icons/ai';
import { Modal } from './styles';
import YouEmbed from '../YouEmbed';

export default function ModalPlayer({ open, video, close }) {
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : 'auto';
  }, [open]);

  return (
    <Modal open={open}>
      <header>
        <button type="button" onClick={close}>
          Fechar
          <AiFillCloseCircle />
        </button>
      </header>
      <main>
        <YouEmbed
          url={video}
          stop={!open}
        />
      </main>
    </Modal>
  );
}

ModalPlayer.propTypes = {
  open: PropTypes.bool,
  video: PropTypes.string,
};

ModalPlayer.defaultProps = {
  open: false,
  video: '',
};
