import React from 'react';

function YouThumb({ url, vid, link }) {
  const src = url || 'https://www.youtube.com/watch?v=TxnbWa9SPdI';
  const id = src.match(/(?:youtu\.be\/|youtube\.com(?:\/embed\/|\/v\/|\/watch\?v=|\/user\/\S+|\/ytscreeningroom\?v=))([\w-]{10,12})\b/)[1];

  const Thumb = () => <img src={`https://img.youtube.com/vi/${vid}/mqdefault.jpg`} alt="assistir" />;

  return (
    link ? (
      <a className="you-thumb" href={src} rel="noopener noreferrer" target="_blank">
        <Thumb vid={id} />
      </a>
    ) : <Thumb vid={id} />
  );
}

export default YouThumb;
