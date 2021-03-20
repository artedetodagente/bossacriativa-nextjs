import React, { useState } from 'react';
import { BsInfoCircleFill } from 'react-icons/bs';
import { Card } from './styles';

export default function CardImageWithTitle({
  video, image, title, excerpt, click,
}) {
  const src = video || 'https://www.youtube.com/watch?v=TxnbWa9SPdI';
  const id = src.match(/(?:youtu\.be\/|youtube\.com(?:\/embed\/|\/v\/|\/watch\?v=|\/user\/\S+|\/ytscreeningroom\?v=))([\w-]{10,12})\b/)[1];
  const thumb = `https://img.youtube.com/vi/${id}/mqdefault.jpg`;

  const [infoShow, setInfoShow] = useState(false);

  const handleInfoShow = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setInfoShow(!infoShow);
  };

  return (
    <Card infoShow={infoShow} onClick={click}>
      <figure>
        <img
          src={image || thumb}
          alt={title}
        />
      </figure>
      <h1>{title}</h1>
      <a
        className="infoButton"
        href=""
        onClick={(e) => handleInfoShow(e)}
      >
        <BsInfoCircleFill />
      </a>
      <div>
        <p>
          {excerpt && excerpt.replace(/<\/?[^>]+(>|$)/g, '')}
        </p>
      </div>
    </Card>
  );
}
