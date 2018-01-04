import * as ctx from './context';
// import {
//   addTokenToMiddleware,
//   context,
//   removeTokenFromMiddleware,
// } from './context';

// use this file with httplink.

// We are overriding this method for HttpLink
//
// for HTTP link we do NOT create dataloaders
// they are created on the server
export const dynamicContext = _prevContext => ({
  ...ctx.context,
});

// export {
//   dynamicContext,
//   addTokenToMiddleware,
//   removeTokenFromMiddleware,
// };

export const addTokenToMiddleware = ctx.addTokenToMiddleware;
export const removeTokenFromMiddleware = ctx.removeTokenFromMiddleware;
