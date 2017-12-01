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

It is barebone, unstyled, ugly (webpage).

## The article about the demo is [here](https://medium.com/@dadc/using-graphql-client-with-rest-api-9c332e5c8eb3)

## Run demo

```shell
# start wihh fresh data
cp db.json.dist db.json

# in one console - start JSON mock server
npm run server

# in another console - start client
npm run dev
```

## Parts

* [`apollo-bridge-link` library](https://github.com/dacz/apollo-bridge-link) for
  setting up the client with possibility to define resolvers on the client
* [dataloader](https://github.com/facebook/dataloader) for optimizing/batching
  requests
* [json-server](https://github.com/typicode/json-server) for mocking up REST api

## Data

Your data will be in `db.json` file (with your changes).

## ToDo

* [ ] demo handling login & authorization (jwt token in header)
* [ ] write blogpost about this example to explain little bit more

## Sponsors

**LiveAndCode** - passionate group of javascript developers (contact
juraj@liveandcode.cz). Thanks!!
