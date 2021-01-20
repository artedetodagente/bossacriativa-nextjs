import React, { Fragment } from 'react';
import { useRouter } from 'next/router';
import { BsChevronRight } from 'react-icons/bs';
import Link from 'next/link';
import { Container } from './styles';

export default function Breadcrumb({ name }) {
  const router = useRouter();
  const paths = (router.asPath.split('/'))
    .filter((item) => item.trim() !== '')
    .map((item) => item.split('-').join(' '));

  return (
    <Container>
      <Link href="/">
        <a href="/#">Início</a>
      </Link>
      <BsChevronRight />
      {
        paths.map((item, index) => (
          <Fragment key={index}>
            {
              index === paths.length - 1
                ? <Link href={`/${router.asPath}`}><a href="/#">{name || item}</a></Link>
                : (
                  <>
                    <Link href={item}><a href="/#">{item}</a></Link>
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
