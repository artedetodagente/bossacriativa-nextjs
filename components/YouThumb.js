import React from 'react'

function YouThumb(props) {

  const url = props.url || "https://www.youtube.com/watch?v=TxnbWa9SPdI"
  const vid = url.match(/(?:youtu\.be\/|youtube\.com(?:\/embed\/|\/v\/|\/watch\?v=|\/user\/\S+|\/ytscreeningroom\?v=))([\w-]{10,12})\b/)[1]

  const Thumb = (props) => <img src={`https://img.youtube.com/vi/${props.vid}/mqdefault.jpg`} alt="assistir" />

  return (
    props.link 
      ? <a className="you-thumb" href={url} rel="noopener noreferrer" target="_blank"><Thumb vid={vid} /></a>
      : <Thumb vid={vid} />
  );
}

export default YouThumb;
