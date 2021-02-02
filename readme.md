# MERN Stack Web App Starter Kit

This is starter kit that helps the quick start to developing small-medium sized content based web apps. I included only some basic dependencies for MERN stack development with Typescript. More detailed documentation explained in docs folder about how to system works and file structures.

**Caution:** This project isn't fully completed. So some features may be buggy. You can send pull request and fix the bugs.

Additional integrations are provided:

* Typescript
* Server Side Rendering for User App side
* React Router
* React Redux
* CLI

Some extra features:

* Database Seeding
* Theme Supported Admin Panel (CMS)
* Entry Level Secured API and Error Logging
* Multi Language Support

## Installation

1. Install all dependencies

    ```shellscript
    npm install  
    ```

1. Required npm packages globally for every environments:

   * migrate-mongo - migrating data for mongodb
   * pm2 - deploying nodejs application

    For development environment, we use some npm packages globally that helps the development:

   * nodemon

1. Copy the .env.example file to .env and set your environment variables.

1. (OPTIONAL) Migrate the database:

    ```shellscript
    migrate-mongo up
    ```

## Development

You can easily start the web app. Start the listeners

```shellscript
npm run dev  
```

## CLI

This kit includes its cli system.

```shellscript
node cli <command>
```

To view a list of all available commands, you may use the list command:

```shellscript
node cli --help
```

You can generate your own commands. For more detail, see the cli.md file in docs folder.

## Deployment

1. (OPTIONAL) If you will deploy on production environment, set your NODE_ENV to "production" in .env file.

1. Run the build command

    ```shellscript
    npm run build
    ```

    This will generate the js files for both client and server side separately.

1. You can start the pm2 at the project's root directory:

    ```shellscript
    pm2 start
    ```

## Roadmap

Project is close to completion, but I have some plans for better development.

* Testing Tools integrations and samples
