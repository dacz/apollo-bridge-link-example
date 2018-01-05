import { copyOnlyHeaders, dynamicContext } from '../src/context';
import { graphiqlExpress, graphqlExpress } from 'graphql-server-express';

import bodyParser from 'body-parser';
import config from './config';
import cors from 'cors';
import express from 'express';
import schema from './schema';

export default () => {
  // app
  const app = express();

  // middleware
  const corsSetting = {
    origin: 'http://localhost:3003',
    methods: 'GET,HEAD,POST,OPTIONS',
    allowedHeaders: 'Content-Type,Authorization,X-extend-me',
    // allowedHeaders: '*',
    credentials: true,
    preflightContinue: false,
    optionsSuccessStatus: 204,
  };
  app.use(cors(corsSetting));

  // app setup
  app.use(
    config.GRAPHQL_API_PATH,
    bodyParser.json(),
    graphqlExpress(async req => {
      const context = dynamicContext({
        // req,
        headers: copyOnlyHeaders(req.headers),
      });
      return {
        schema,
        context,
      };
    })
  );

  // graphiql
  if (process.env !== 'test') {
    app.use(
      config.GRAPHIQL_PATH,
      graphiqlExpress({
        endpointURL: `http://localhost:${config.GRAPHQL_SERVER_PORT}${
          config.GRAPHQL_API_PATH
        }`,
      })
    );
  }

  // txt schema
  if (process.env !== 'test') {
    app.get(config.GRAPHQL_SCHEMA_PATH, (req, res) =>
      res.type('txt').send(schema)
    );
  }

  return { app };
};
