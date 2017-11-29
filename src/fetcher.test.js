import { ErrorFetch, checkStatus, makeFetchOpts } from './fetcher';

import test from 'ava';

test('ErrorFetch', t => {
  const response = {
    statusText: 'some Error',
    status: 12345,
  };
  const e = new ErrorFetch(response);
  t.true(e instanceof Error);
  t.is(e.message, response.statusText);
  t.is(e.code, response.status);
  t.deepEqual(e.response, response);
});

test('checkStatus', t => {
  const responseOk = { status: 200 };
  const responseErr = { status: 300 };
  t.deepEqual(checkStatus(responseOk), responseOk);
  t.throws(() => checkStatus(responseErr));
});

test('makeFetchOpts - plain, get', t => {
  const fetchOpts = makeFetchOpts();
  t.deepEqual(fetchOpts, {});
});

test('makeFetchOpts - token, get', t => {
  const authToken = 'secret';
  const fetchOpts = makeFetchOpts({ authToken });
  const wantOpts = {
    credentials: 'include',
    headers: { Authorization: `Bearer ${authToken}` },
  };
  t.deepEqual(fetchOpts, wantOpts);
});

test('makeFetchOpts - token, post', t => {
  const authToken = 'secret';
  const opts = { method: 'POST' };
  const fetchOpts = makeFetchOpts({ method: 'POST', authToken });
  const wantOpts = {
    ...opts,
    credentials: 'include',
    headers: {
      Authorization: `Bearer ${authToken}`,
      'Content-Type': 'application/json',
    },
  };
  t.deepEqual(fetchOpts, wantOpts);
});

// will not test because of we'd need to mock fetch
// uncomment only if you want experiment
// AND have running JSON server (or other server)
// test('fetcher', async t => {
//   const authToken = 'secretToken';
//   const rv = await fetcher.post({
//     url: 'http://localhost:3000/users',
//     data: { email: 'some@eeeemaaail.com' },
//     authToken,
//   });
//   console.log('RV: ', rv);
//   t.pass();
// });
