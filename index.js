var express = require('express');
const { graphqlHTTP } = require('express-graphql');
var { buildSchema } = require('graphql');

// Simple for Proof of concept.

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  type Query {
    createEntity(entity: String, name: String): String
    readEntity(entity: String, id: Int): String
    updateEntity(entity: String, name: String, id: Int): String
    deleteEntity(entity: String, name: String, id: Int): String
  }
`);

let application = {
  'appKeys': ['user', 'post', 'blog'],
  'user': [],
  'post': [],
  'blog': [],
};

// The root provides a resolver function for each API endpoint
var root = {
  createEntity: ({ entity, name }) => {
    if (application.appKeys.indexOf(entity) <= -1) { return 'This type of entity cannot be created' }
    application[entity].push(
      { name }
    );
    return `${entity} ${application[entity][application[entity].length - 1].name} has been Created`;
  },
  readEntity: ({ entity, id }) => {
    return application[entity][id].name;
  },
  updateEntity: ({ entity, name, id }) => {
    application[entity][id] = { name };
    return `${entity} has been updated to ${application[entity][id].name}`;
  },
  deleteEntity: ({ entity, id }) => {
    application[entity][id].name = "PROFILE WAS DELETED";
    return `${entity} has been deleted`;
  }
};

var app = express();

app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));

app.listen(4000);
console.log('Running a GraphQL API server at localhost:4000/graphql');
