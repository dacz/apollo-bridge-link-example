# Use GraphQL with Rest API - demo

[![travis.ci](https://img.shields.io/travis/dacz/apollo-bridge-link-example.svg?style=flat-square)](https://travis-ci.org/dacz/apollo-bridge-link-example)
[![Greenkeeper badge](https://badges.greenkeeper.io/dacz/apollo-bridge-link-example.svg)](https://greenkeeper.io/)
[![license](https://img.shields.io/github/license/dacz/apollo-bridge-link-example.svg)](https://github.com/dacz/apollo-bridge-link-example/blob/master/LICENSE)

**Develop with GraphQl on the client facing server with REST API.**

This demo uses
[`apollo-bridge-link` library](https://github.com/dacz/apollo-bridge-link)
(build on top of Apollo).

_I use the core functionality (apollo-bridge-link) for production code for
clients and it works ok. But it's work in progress as the requirements arise and
I implement them and then find a time to put them into this demo._

It is barebone, minimally styled.

## The article about the demo is [here](https://medium.com/@dadc/using-graphql-client-with-rest-api-9c332e5c8eb3)

## Run demo

```shell
# start wihh fresh data
cp db.json.dist db.json

# in one console - start JSON mock server
npm run rest-server

# in another console - start client
npm run dev

# ----
# if you want develop against GraphQL server before switching to Bridge
# (see below)
# run in another termina window:
npm run graphql-server
```

## Develop as with GraphQL server

When you are developing on the client side (and especially with React Native), it's handy just to talk to GraphQL server with standard HTTP link and then switch to Bridge Link and keep all your work done.

This example contains demostrate, how to do this with sharing all the code (and only minor configuration of apollo link).

Basically in the `App.js` comment or uncomment which link you want to use.

If you choose **Bridge**, run only `npm run rest-server`.

If you choose **HttpLink**, run (in two opened teerminals `npm run rest-server` and in the second one `npm run graphql-server`).

Basically - your app will talk to GraphQL server (that uses all your resolvers, dataloaders etc.) and this server will talk to REST API server.


## Parts

* [`apollo-client` library](https://github.com/apollographql/apollo-client)
  GraphQL client
* [`apollo-bridge-link` library](https://github.com/dacz/apollo-bridge-link) for
  setting up the client with possibility to define resolvers on the client
* [dataloader](https://github.com/facebook/dataloader) for optimizing/batching
  requests
* [json-server](https://github.com/typicode/json-server) for mocking up REST api

## Data

Your data will be in `db.json` file (with your changes).

## ToDo

* [x] demo handling authorization token
* [x] write blogpost about this example to explain little bit more
      ([here](https://medium.com/@dadc/using-graphql-client-with-rest-api-9c332e5c8eb3))
* [x] graphql server for easier developing (using all logic, resolvers, etc., just switching apollo link)

## Sponsors

**LiveAndCode** - passionate group of javascript developers (contact
juraj@liveandcode.cz). Thanks!!
