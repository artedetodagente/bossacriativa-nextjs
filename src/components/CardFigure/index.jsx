import React from 'react';
import PropTypes from 'prop-types';
import { Card, ImageContainer } from './styles';

export default function CardFigure({
  title, image, excerpt, click,
}) {
  return (
    <Card onClick={click}>
      <ImageContainer>
        <img src={image} alt=""/>
        <h1>{title}</h1>
      </ImageContainer>
      <div>
        <p>
          {excerpt && excerpt.replace(/<\/?[^>]+(>|$)/g, '')}
        </p>
      </div>
    </Card>
  );
}

CardFigure.propTypes = {
  title: PropTypes.string,
  excerpt: PropTypes.string,
  click: PropTypes.func,
};

CardFigure.defaultProps = {
  title: '',
  excerpt: '',
  click: null,
};
