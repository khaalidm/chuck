const {ApolloServer} = require('apollo-server');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');

const ChuckNorrisApi = require('./datasources/chuck');

const server = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources: () => ({
        chuckNorrisApi: new ChuckNorrisApi()
    })
})

server.listen().then(({ url }) => {
 console.log(`server ready @ ${url}`);   
});