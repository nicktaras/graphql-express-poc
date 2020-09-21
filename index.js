var express = require('express');
const { graphqlHTTP } = require('express-graphql');
var { buildSchema } = require('graphql');

// This is for Proof of Concept only.

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  type Query {
    createUser(name: String, pass: String): String
    updateUser(name: String, pass: String): String
    readUser: String
    deleteUser: String
  }
`);

// Temp Storage in memory
let application = {};

// The root provides a resolver function for each API endpoint
var root = {
  createUser: ({ name, pass }) => {
    // CreateUser(name, pass);
    if (application['user']) return 'User exists';
    application['user'] = name;
    return `User Profile for ${application.user} has been Created`;
  },
  readUser: () => {
    return application.user;
  },
  updateUser: ({ name, pass }) => {
    application['user'] = name;
    return `User Profile for ${application.user} has been Updated`;
  },
  deleteUser: () => {
    return `User Profile for ${application.user} has been Deleted`;
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
