import React from 'react';
import PropTypes from 'prop-types';
import { Card } from './styles';

export default function CardText({
  title, image, excerpt, click,
}) {
  return (
    <Card onClick={click}>
      <p>
        {excerpt.replace(/<\/?[^>]+(>|$)/g, '')}
      </p>
    </Card>
  );
}

CardText.propTypes = {
  title: PropTypes.string,
  excerpt: PropTypes.string,
  click: PropTypes.func,
};

CardText.defaultProps = {
  title: '',
  excerpt: '',
  click: null,
};
