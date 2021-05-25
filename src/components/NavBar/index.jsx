import React, { Fragment, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { BsCircleFill } from 'react-icons/bs';
import { Nav } from './styles';

export default function NavBar({ menus }) {
  const [open, setOpen] = useState(false);

  return (
    <Nav open={open}>
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
        {/* <Link href="/automatica/pagina-de-teste-para-exibicao-de-paginas-internas">
          <a>
            Link página de teste
          </a>
        </Link> */}
        <a className="hamburguer" href="#" onClick={() => setOpen(!open)}>
          Menu
          <span className="hamburgerSymbol">&#9776;</span>
        </a>
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
                <li className="circulo"><BsCircleFill /></li>
              </Fragment>
            )
          ))
        }
      </ul>
    </Nav>
  );
}
