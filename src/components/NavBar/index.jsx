import React, { Fragment } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { BsCircleFill } from 'react-icons/bs';
import { Nav } from './styles';

export default function NavBar({ menus }) {
  return (
    <Nav>
      <div>
        <Link href="/">
          <a>
            <Image
              src={require('@/images/menu-logo.svg')}
              alt="Logo do Bossa Criativa"
              width="100px"
              height="80px"
            />
          </a>
        </Link>
      </div>
      <ul>
        {
          menus.map((menu, index) => (
            !menu.parentId && (
              <Fragment key={menu.id}>
                <li>
                  <Link href={menu.url}>
                    <a>{menu.label}</a>
                  </Link>
                  {
                    menus[index + 1]?.parentId && (
                      <ul>
                        {
                          menus.slice(index + 1)
                            .map((submenu) => submenu.parentId === menu.id && (
                              <li key={submenu.id}>
                                <Link href={submenu.url}>
                                  <a>{submenu.label}</a>
                                </Link>
                              </li>
                            ))
                        }
                      </ul>
                    )
                  }
                </li>
                <li><BsCircleFill /></li>
              </Fragment>
            )
          ))
        }
      </ul>
    </Nav>
  );
}
