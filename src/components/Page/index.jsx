/* eslint-disable no-restricted-syntax */
/* eslint-disable global-require */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { BsCircleFill } from 'react-icons/bs';
import { Menu } from './styles';

export default function Page({ children, options }) {
  const [menus, setMenus] = useState([]);

  useEffect(() => {
    const ids = [];
    const list = options
      .sort((a, b) => (a.order < b.order ? -1 : 1))
      .map((op) => ({ ...op, childItems: options.filter((item) => item.parentId === op.id) }))
      .sort((a, b) => (a.order < b.order ? 1 : -1));
    for (const op of list) {
      const id = list.findIndex((it) => it.childItems.some((obj) => obj.id === op.id));
      if (id !== -1) {
        const subId = list[id].childItems.findIndex((it) => it.id === op.id);
        list[id].childItems[subId] = op;
        ids.push(op.id);
      }
    }
    setMenus(
      list.filter((it) => !ids.includes(it.id))
        .sort((a, b) => (a.order < b.order ? -1 : 1)),
    );
  }, [options]);

  return (
    <>
      <Head>
        <title>Bossa Criativa - Arte de Toda Gente</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header>
        <Menu>
          <div>
            <Image
              src={require('@/images/logo-menu.svg')}
              alt="Logo do Bossa Criativa"
              width="100px"
              height="80px"
            />
          </div>
          <ul>
            {
              menus.map((menu) => (
                !menu.parentId && (
                  <li key={menu.id}>
                    <Link href={menu.url}>
                      {menu.label}
                    </Link>
                    <BsCircleFill />

                    {
                      menu?.childItems.length > 0 && (
                        <ul>
                          {
                            menu.childItems.map((submenu) => (
                              <li key={submenu.id}>
                                <Link href={submenu.url}>
                                  {submenu.label}
                                </Link>
                              </li>
                            ))
                          }
                        </ul>
                      )
                    }
                  </li>
                )
              ))
            }
          </ul>
        </Menu>
      </header>
      <main>{children}</main>
      <footer />
    </>
  );
}
