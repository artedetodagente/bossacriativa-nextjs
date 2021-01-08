import React from 'react';

function YouEmbed({ url }) {
  const link = url || 'https://www.youtube.com/watch?v=TxnbWa9SPdI';
  const vid = link.match(/(?:youtu\.be\/|youtube\.com(?:\/embed\/|\/v\/|\/watch\?v=|\/user\/\S+|\/ytscreeningroom\?v=))([\w-]{10,12})\b/)[1];

  return (
    <div className="embed-container">
      <iframe
        title={vid}
        src={`https://www.youtube.com/embed/${vid}?autoplay=1`}
        frameBorder="0"
        allow="autoplay;fullscreen"
      />
    </div>
  );
}

export default YouEmbed;
