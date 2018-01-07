import fetch from 'isomorphic-fetch';
import qs from 'query-string';

export class ErrorFetch extends Error {
  constructor(response) {
    super(response.statusText);
    this.response = response;
    this.code = response.status;
  }
}

export const checkStatus = response => {
  if (response.status >= 200 && response.status < 300) return response;
  throw new ErrorFetch(response);
};

/* eslint-disable complexity */
export const makeFetchOpts = ({
  method,
  data,
  authToken,
  authorization,
  ctx = {},
  opts = {},
} = {}) => {
  const headers = {
    ...opts.headers,
    ...ctx.headers,
    ...(['POST', 'PUT', 'PATCH'].includes(method || opts.method)
      ? { 'Content-Type': 'application/json' }
      : {}),
    ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
    ...(authorization ? { Authorization: authorization } : {}),
  };

  return {
    ...opts,
    ...(method || opts.method ? { method: method || opts.method } : {}),
    ...(authToken || authorization || (ctx.headers && ctx.headers.authorization)
      ? { credentials: 'include' }
      : {}),
    ...(data || opts.body ? { body: JSON.stringify(data || opts.body) } : {}),
    ...(Object.keys(headers).length > 0 ? { headers } : {}),
  };
};
/* eslint-enable complexity */

// doesn't work with some params already in the url, sorry
export const addQsToUrl = (url = '', qsObj = {}) =>
  Object.keys(qsObj).length > 0 ? `${url}?${qs.stringify(qsObj)}` : url;

export const fetchAndParse = method => async ({
  url,
  urlParams,
  data,
  authToken,
  authorization,
  ctx,
  opts,
}) => {
  const response = await fetch(
    addQsToUrl(url, urlParams),
    makeFetchOpts({ method, data, authToken, authorization, ctx, opts })
  );
  checkStatus(response); // may throw - GraphQL will catch
  if (response.status === 204) return {};
  return await response.json();
};

// ======= this is OUR FETCHER !!!

/* slightly different api for fetcher.get/post/...:
 * {
 *   url ... url to be fetched
 *   urlParams ... url params as an object
 *   data ... object probably
 *   authToken ... if there should be authToken
 *   opts ... standard fetch opttions (2nd parameter)
 * }
 */
export default {
  get: fetchAndParse('GET'),
  post: fetchAndParse('POST'),
  put: fetchAndParse('PUT'),
  patch: fetchAndParse('PATCH'),
  delete: fetchAndParse('DELETE'),
};
