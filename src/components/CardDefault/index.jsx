import React, { useEffect, useState } from 'react';
import { Card } from './styles';

export default function CardDefault({ source, click }) {
  const [data, setData] = useState({
    photo: '', link: '', title: '', description: '',
  });

  useEffect(() => {
    setData({ ...data, ...source });
  }, []);

  return (
    <Card
      photo={data?.photo}
      onClick={() => click(data?.id)}
    >
      <h1>{data?.title}</h1>
      <p>{data?.description}</p>
    </Card>
  );
}
