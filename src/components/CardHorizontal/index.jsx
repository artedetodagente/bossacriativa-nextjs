import React from 'react';
import { Card } from './styles';

export default function CardHorizontal({
  image, title, text, click,
}) {
  return (
    <Card onClick={click}>
      <figure>
        <img src={image} alt={title} />
      </figure>
      <div>
        <h1>{title}</h1>
        <p>{text.replace(/<\/?[^>]+(>|$)/g, '')}</p>
      </div>
    </Card>
  );
}
