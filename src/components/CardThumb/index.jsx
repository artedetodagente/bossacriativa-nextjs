import React from 'react';
import { Card } from './styles';

export default function CardThumb({
  video, image, title, excerpt, click,
}) {
  const src = video || 'https://www.youtube.com/watch?v=TxnbWa9SPdI';
  const id = src.match(/(?:youtu\.be\/|youtube\.com(?:\/embed\/|\/v\/|\/watch\?v=|\/user\/\S+|\/ytscreeningroom\?v=))([\w-]{10,12})\b/)[1];
  const thumb = `https://img.youtube.com/vi/${id}/mqdefault.jpg`;

  return (
    <Card onClick={click}>
      <figure>
        <img
          src={image || thumb}
          alt={title}
        />
      </figure>
      <h1>{title}</h1>
      <div>
        <p>
          {excerpt && excerpt.replace(/<\/?[^>]+(>|$)/g, '')}
        </p>
      </div>
    </Card>
  );
}
