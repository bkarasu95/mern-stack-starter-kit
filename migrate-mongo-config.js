// In this file you can configure migrate-mongo

const config = {
  mongodb: {
    url: "mongodb://127.0.0.1:27017",

    databaseName: "mernt",

    options: {
      useNewUrlParser: true, // removes a deprecation warning when connecting
      useUnifiedTopology: true, // removes a deprecating warning when connecting
      //   connectTimeoutMS: 3600000, // increase connection timeout to 1 hour
      //   socketTimeoutMS: 3600000, // increase socket timeout to 1 hour
    },
  },

  // The migrations dir, can be an relative or absolute path. Only edit this when really necessary.
  migrationsDir: "src/server/database/migrations",

  // The mongodb collection where the applied changes are stored. Only edit this when really necessary.
  changelogCollectionName: "migrations",

  // The file extension to create migrations and search for in migration dir
  migrationFileExtension: ".js",
};

// Return the config as a promise
module.exports = config;
