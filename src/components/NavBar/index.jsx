import React, { Fragment } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { BsCircleFill } from 'react-icons/bs';
import { Nav } from './styles';

export default function NavBar({ menus }) {
  return (
    <Nav>
      <div>
        <Link href="/" replace>
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
                  <a href={menu.url}>{menu.label.replace(/ /g, '\u00a0')}</a>
                  {
                    menus[index + 1]?.parentId && (
                      <ul>
                        {
                          menus.slice(index + 1)
                            .map((submenu) => submenu.parentId === menu.id && (
                              <li key={submenu.id}>
                                <a href={submenu.url}>{submenu.label}</a>
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
