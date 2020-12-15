import React from 'react'

function YouEmbed(props) {

  const url = props.url || "https://www.youtube.com/watch?v=TxnbWa9SPdI"
  const vid = url.match(/(?:youtu\.be\/|youtube\.com(?:\/embed\/|\/v\/|\/watch\?v=|\/user\/\S+|\/ytscreeningroom\?v=))([\w-]{10,12})\b/)[1]

  return (
    <div className="embed-container">
      <iframe
        title={vid}
        src={`https://www.youtube.com/embed/${vid}?autoplay=1`}
        frameBorder="0"
        allow="autoplay;fullscreen" 
      ></iframe>
    </div>
  );
}

export default YouEmbed;
