const express = require('express');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const path = require('path');
const { authMiddleware } = require('./utils/auth');
const { requireHTTPS } = require('./utils/httpsRedirect')

const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');

const PORT = process.env.PORT || 3001;
const app = express();
const apolloServer = new ApolloServer({
  typeDefs,
  resolvers
});

async function runServer() {
  await apolloServer.start();
  
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());
  app.use(requireHTTPS);

  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, "../client/dist")));

    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '../client/dist/index.html'));
    });
  }

  app.use('/graphql', expressMiddleware(apolloServer, {
    context: authMiddleware
  }));

  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}`);
      console.log(`Use GraphQL at http://<host>:${PORT}/graphql`);
    });
  });
}

runServer();