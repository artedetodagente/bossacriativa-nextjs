import React from 'react';
import Descriptor from '@/components/Descriptor';
import Page from '@/components/Page';
import Grid from '@/components/Grid';
import CardDefault from '@/components/CardDefault';
import Breadcrumb from '@/components/Breadcrumb';

export default function Realities() {
  return (
    <Page>
      <Breadcrumb />
      <Descriptor
        title="Mostras"
        text="No Bossa Criativa, arte, cultura e inclusão têm como palco a internet e patrimônios da humanidade. São mais de 180 artistas e educadores, de várias regiões
        do país, em apresentações, lives e oficinas de capacitação nas áreas de música, circo, artes visuais, dança, teatro e gestão cultural. Mais de 200 horas de
        conteúdo já estão no ar, com foco na diversidade e democratização da cultura."
      />
      <Grid
        gap="15px"
        source={[{
          id: 1, title: 'teste', description: 'descrição', photo: 'https://blog.emania.com.br/wp-content/uploads/2016/05/fotos-da-lua.jpg',
        }, {
          id: 2, title: 'teste', description: 'descrição', photo: 'https://blog.emania.com.br/wp-content/uploads/2016/05/fotos-da-lua.jpg',
        }, {
          id: 3, title: 'teste', description: 'descrição', photo: 'https://blog.emania.com.br/wp-content/uploads/2016/05/fotos-da-lua.jpg',
        }]}
        renderItem={(item) => (
          <CardDefault
            key={item.id}
            source={item}
          />
        )}
      />
    </Page>
  );
}
