/* eslint-disable react/forbid-prop-types */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Lottie from 'react-lottie';
import { Load } from './styles';

export default function Loader({ animation, open }) {
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : 'auto';
  }, [open]);

  return (
    <Load open={open}>
      <Lottie
        options={{
          loop: true,
          autoplay: true,
          animationData: animation,
        }}
        width={350}
        height={350}
      />
    </Load>
  );
}

Loader.propTypes = {
  open: PropTypes.bool,
  animation: PropTypes.any.isRequired,
};

Loader.defaultProps = {
  open: false,
};
