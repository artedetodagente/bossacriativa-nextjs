import React from 'react';
import Page from '@/components/Page';
import Schedule from '@/components/Agenda';
import Fluid from '@/components/Fluid';
import CardImage from '@/components/CardImage';
import core from '@/core';

export default function Agenda({menus, eventos}) {
    return(
    <>
        <Page menus={menus}>
            <Fluid>
                <Schedule 
                    source={eventos}
                    renderItem={(item) => (
                    <CardImage 
                        title={item.title}
                        excerpt={item.excerpt}
                        click={null}
                        image={null}
                        h={350}
                    />
                    )}
                />
            </Fluid>
        </Page>
    </>
    );
}

export async function getStaticProps() {
    const eventos = await core.eventos.getAll();
    const menus = await core.menus.getAll();
  
    return {
      props: {
        eventos: eventos.nodes || [],
        menus: menus.nodes || [],
      },
      revalidate: 1,
    };
  }