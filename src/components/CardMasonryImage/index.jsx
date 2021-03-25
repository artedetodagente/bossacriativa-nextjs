import React from 'react';
import { IoCopy } from 'react-icons/io5';
import { Card } from './styles';

export default function CardMasonryImage({
  image, title, excerpt, collection, click,
}) {
  return (
    <Card
      onClick={click}
      isClick={click !== null}
      isCollection={collection}
    >
      <figure>
        <img src={image} alt={title} />
      </figure>
      <div className="icon">
        <IoCopy />
      </div>
      <h1>{title}</h1>
      <div>
        <p>{excerpt}</p>
      </div>
    </Card>
  );
}
