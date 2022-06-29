import React from 'react';
import PropTypes from 'prop-types';
import { Card, ImageContainer } from './styles';

export default function CardImageWithText({
  title, image, excerpt, click,
}) {
  return (
    <Card onClick={click}>
      <ImageContainer>
        <img src={image} alt="" />
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

CardImageWithText.propTypes = {
  title: PropTypes.string,
  excerpt: PropTypes.string,
  click: PropTypes.func,
};

CardImageWithText.defaultProps = {
  title: '',
  excerpt: '',
  click: null,
};
