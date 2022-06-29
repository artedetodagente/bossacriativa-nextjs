/* eslint-disable import/prefer-default-export */
/* eslint-disable consistent-return */
import Router from 'next/router';
import token from './token';

export const auth = async (ctx) => {
  const tok = await token.getToken(ctx);
  if (ctx.req && Object.keys(tok).length === 0) {
    ctx.res.writeHead(302, { Location: '/admin' });
    ctx.res.end();
    return;
  }

  if (!tok) {
    Router.push('/admin');
  }

  return tok;
};
