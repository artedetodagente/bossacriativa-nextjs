import React from 'react';
import PropTypes from 'prop-types';
import { Card } from './styles';

export default function CardIcon({ icon, text, click }) {
  return (
    <Card onClick={click}>
      <figure>{icon}</figure>
      <div>
        <p>{ text }</p>
      </div>
    </Card>
  );
}

CardIcon.propTypes = {
  icon: PropTypes.element.isRequired,
  text: PropTypes.string.isRequired,
  click: PropTypes.func,
};

CardIcon.defaultProps = {
  click: null,
};
