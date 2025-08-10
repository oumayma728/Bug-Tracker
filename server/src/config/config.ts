export default () => ({
  jwt: {
    secret: process.env.TOKEN_SECRET || 'defaultsecret',
  },
  database: {
    connectionstring: process.env.mongo_uri || 'mongodb://localhost:27017/Bug--tracker',
  },
});
