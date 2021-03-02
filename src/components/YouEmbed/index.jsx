import React, { useEffect, useRef } from 'react';

function YouEmbed({ url, stop }) {
  const player = useRef(null);
  const link = url || 'https://www.youtube.com/watch?v=TxnbWa9SPdI';
  const vid = link.match(/(?:youtu\.be\/|youtube\.com(?:\/embed\/|\/v\/|\/watch\?v=|\/user\/\S+|\/ytscreeningroom\?v=))([\w-]{10,12})\b/)[1];

  useEffect(() => {
    if (stop) player.current.src = '';
  }, [stop]);

  return (
    <div className="embed-container">
      <iframe
        ref={player}
        title={vid}
        src={`https://www.youtube.com/embed/${vid}?autoplay=0`}
        frameBorder="0"
        allow="autoplay;fullscreen"
      />
    </div>
  );
}

export default YouEmbed;
