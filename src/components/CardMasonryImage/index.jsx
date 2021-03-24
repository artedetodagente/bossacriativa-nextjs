import React from 'react';
import { Card } from './styles';

export default function CardMasonryImage({ image, title, excerpt }) {
  return (
    <Card>
      <figure>
        <img src={image} alt="" />
      </figure>
      <h1>{title}</h1>
      <div>
        <p>{excerpt}</p>
      </div>
    </Card>
  );
}
