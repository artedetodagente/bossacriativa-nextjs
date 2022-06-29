import React from 'react';
import PropTypes from 'prop-types';
import { Card } from './styles';

export default function CardText({ title, text }) {
  return (
    <Card>
      <h1>{title}</h1>
      <p>{text}</p>
    </Card>
  );
}

CardText.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};
