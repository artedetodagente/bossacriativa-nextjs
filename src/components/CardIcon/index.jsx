import React from 'react';
import PropTypes from 'prop-types';
import { Card } from './styles';

export default function CardIcon({ icon, text }) {
  return (
    <Card>
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
};
