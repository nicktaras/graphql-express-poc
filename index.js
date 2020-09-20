var express = require('express');
const { graphqlHTTP } = require('express-graphql');
var { buildSchema } = require('graphql');

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  type Query {
    createUser(name: String, pass: String): String
    readUser: String
    updateUser: String
    deleteUser: String
  }
`);

let user = "";

// The root provides a resolver function for each API endpoint
var root = {
  createUser: ({ name, pass }) => {
    // CreateUser(name, pass);
    user = name;
    return `User Profile for ${user} has been Created`;
  },
  readUser: () => {
    return user;
  },
  updateUser: () => {
    return user;
  },
  deleteUser: () => {
    return `User Profile for ${user} has been Deleted`;
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
