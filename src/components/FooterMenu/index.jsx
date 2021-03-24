import React, { Fragment } from 'react';

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
    </ul>
  </div>
);

export default FooterMenu;
