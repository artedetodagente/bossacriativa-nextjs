import React from 'react';
import PropTypes from 'prop-types';
import { BiRightArrow, BiLeftArrow } from 'react-icons/bi';
import { Bar } from './styles';

export default function ButtonsNavigations({
  onPrev, onNext,
}) {
  return (
    <Bar>
      <button
        type="button"
        onClick={onPrev}
      >
        <BiLeftArrow />
      </button>
      <button
        type="button"
        onClick={onNext}
      >
        <BiRightArrow />
      </button>
    </Bar>
  );
}

ButtonsNavigations.propTypes = {
  onPrev: PropTypes.func,
  onNext: PropTypes.func,
};

ButtonsNavigations.defaultProps = {
  onPrev: null,
  onNext: null,
};
