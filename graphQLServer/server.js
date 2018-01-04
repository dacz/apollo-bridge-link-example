import appFactory from './app';
import config from './config';

const { app } = appFactory();

app.listen(config.GRAPHQL_SERVER_PORT, () => {
  // eslint-disable-next-line no-console
  console.log(
    `Running a GraphQL server:
--> api: http://localhost:${config.GRAPHQL_SERVER_PORT}${
  config.GRAPHQL_API_PATH
}
--> graphiql: http://localhost:${config.GRAPHQL_SERVER_PORT}${
  config.GRAPHIQL_PATH
}
--> txt schema: http://localhost:${config.GRAPHQL_SERVER_PORT}${
  config.GRAPHQL_SCHEMA_PATH
}
     `
  );
});
