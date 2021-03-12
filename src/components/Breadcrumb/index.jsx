import React, { Fragment } from 'react';
import { useRouter } from 'next/router';
import { BsChevronRight } from 'react-icons/bs';
import Link from 'next/link';
import { Container } from './styles';

export default function Breadcrumb({ name }) {
  const router = useRouter();
  const paths = (router.asPath.split('?')[0].split('/'))
    .filter((item) => item.trim() !== '')
    .filter((item, index) => !(item.trim() === 'automatica' && index === 0))
    // .filter((item, index) => !(item.trim() === 'lives-quadros' && index === 0))
    // .filter((item, index) => !(item.trim() === 'apresentacoes-series' && index === 0))
    .map((item, index) => ((item.trim() === 'lives-quadros' && index === 0) ? 'lives' : item))
    .map((item, index) => ((item.trim() === 'apresentacoes-series' && index === 0) ? 'realidades' : item))
    .map((item) => item.split('-').join(' '));

  return (
    <Container>
      <Link href="/">
        <a>Início</a>
      </Link>
      <BsChevronRight />
      {
        paths.map((item, index) => (
          <Fragment key={index}>
            {
              index === paths.length - 1
                ? <Link href={router.asPath}><a>{name || item}</a></Link>
                : (
                  <>
                    <Link href={`/${item}`}><a>{item}</a></Link>
                    <BsChevronRight />
                  </>
                )
            }
          </Fragment>
        ))
      }
    </Container>
  );
}
