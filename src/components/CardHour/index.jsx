import React from 'react';
import PropTypes from 'prop-types';
import { Card } from './styles';

export default function CardHour({
  image, title, excerpt, click, h, w, hour,
}) {
  return (
    <Card
      image={image}
      onClick={click}
      // h={h}
      // w={w}
    >
      <figure>
        <img
          src={image}
          alt={title}
          // width="100%"
          // height="100%"
        />
      </figure>
      <div>
        <div>
          <p>
            {hour}
            h
          </p>
        </div>
        <div>
          <h1>{title}</h1>
        </div>
      </div>
      <div>
        <p>{excerpt && excerpt.replace(/<\/?[^>]+(>|$)/g, '')}</p>
      </div>
    </Card>
  );
}

CardHour.propTypes = {
  title: PropTypes.string,
  excerpt: PropTypes.string,
  click: PropTypes.func,
  h: PropTypes.number,
  w: PropTypes.number,
  hour: PropTypes.number,
};

CardHour.defaultProps = {
  title: '',
  excerpt: '',
  click: null,
  h: 0,
  w: 0,
  hour: 11,
};
