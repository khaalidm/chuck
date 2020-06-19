const {gql} = require('apollo-server');

const typeDefs = gql`

type Category {
    name: String
},
type Joke {
    id: ID!
    category: [String]
    content: String 
}
type Query {
  categories: [Category]!
  randomJoke(category: String!): Joke
}
`;

module.exports = typeDefs;