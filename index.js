import express from 'express';
import cors from 'cors';
import { ApolloServer, gpl } from 'apollo-server-express';

const app = express();

app.use(cors());

const schema = gpl`
    type Query {
        me: User
    }

    type User {
        username: String!
    }
`;
const resolvers = {
    Query: {
        me: () => ({username: 'fesaza'}),
    },
};

const server = new ApolloServer({
    typeDefs: schema,
    resolvers,
});

server.applyMiddleware({ app, path: '/graphql'});
app.listen({ port: 8000}, () => {
    console.log('Apollo server running on http://localhost:8000/grahpql');
});