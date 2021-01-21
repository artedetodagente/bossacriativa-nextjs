import Image from 'next/image';
import React from 'react';
import { Card } from './styles';

export default function CardHorizontal({ image, title, text }) {
  return (
    <Card>
      <figure>
        <img src={image} />
      </figure>
      <div>
        <h1>{title}</h1>
        <p>{text}</p>
      </div>
    </Card>
  );
}
