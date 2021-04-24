/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { Fragment } from 'react';
import { ImInstagram, ImYoutube, ImFacebook } from 'react-icons/im';

const FooterMenu = ({ menus }) => (
  <div className="ft-menu-container">
    <ul className="ft-menu-list">
      {
        menus.map((menu, index) => (
          !menu.parentId && (
            <Fragment key={menu.id}>
              <li className="ft-menu-list-item">
                <a href={menu.url}>{menu.label.replace(/ /g, '\u00a0')}</a>
                {
                  menus[index + 1]?.parentId && (
                    <ul className="ft-menu-inner-list">
                      {
                        menus.slice(index + 1)
                          .map((submenu) => submenu.parentId === menu.id && (
                          <li key={submenu.id} className="ft-menu-inner-list-item">
                            <a href={submenu.url}>{submenu.label}</a>
                          </li>
                          ))
                      }
                    </ul>
                  )
                }
              </li>
            </Fragment>
          )
        ))
      }
      <li className="ft-menu-list-item">
        <a href="#" onClick={(e) => e.preventDefault()}>Social</a>
        <ul className="ft-menu-icon-list">
          <li>
            <a
              href="https://www.instagram.com/bossacriativa.art"
              className="ft-menu-icon-container"
              target="_blank"
              rel="noreferrer"
            >
              <ImInstagram />
            </a>
          </li>
          <li>
            <a
              href="https://www.youtube.com/c/ArteDeTodaGente/playlists?view=50&sort=dd&shelf_id=1"
              className="ft-menu-icon-container"
              target="_blank"
              rel="noreferrer"
            >
              <ImYoutube />
            </a>
          </li>
          <li>
            <a
              href="https://www.facebook.com/bossacriativa.art/"
              className="ft-menu-icon-container"
              target="_blank"
              rel="noreferrer"
            >
              <ImFacebook />
            </a>
          </li>
        </ul>
      </li>
    </ul>
  </div>
);

export default FooterMenu;
