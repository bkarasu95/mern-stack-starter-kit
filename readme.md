# MERN Stack Web App Starter Kit

This is starter kit that helps the quick start to developing small-medium sized content based web apps. I just added some basic dependencies for MERN stack development with Typescript. More detailed documentation explained in docs folder about how to system works and file structures.

**Caution:** This project hasn't finished yet. So some features may be buggy.

Additional integrations are provided:

* Typescript
* Server Side Rendering for User App side
* React Router
* React Redux
* CLI

Install all dependencies

```shellscript
    npm install  
```

Required npm packages globally for every environments:

1. migrate-mongo - migrating data for mongodb
2. pm2 - deploying nodejs application

For development environment, we use some npm packages globally that helps the development:

1. nodemon

Migrate the database:

```shellscript
    migrate-mongo up
```

Copy the .env.example file to .env and set your environment variables.

## DEVELOPMENT

You can easily start the web app. Start the listeners

```shellscript
    npm run dev  
```

## CLI

This kit includes its cli system.

You may execute with:

```shellscript
    node cli <command>
```

To view a list of all available commands, you may use the list command:

```shellscript
    node cli --help
```

You may generate your own commands. For more detail, see the cli.md file in docs folder.

## DEPLOYMENT

Run the build command

```shellscript
    npm run build
```

This will generate the js files for both client and server side separately.

You can start the pm2 at the project's root directory:

```shellscript
    pm2 start
```

## Roadmap

Project is close to completion, but I have some plans for better development.

* ~~Database Seeding System~~
* Changable Language System
* Testing Tools integrations and samples
* Error,system etc. logging and showing in admin panel
* App monitoring in admin panel
* ~~Content Editor and Dynamic and Configurable Forms~~
* Admin Full Theme Support
* SEO support for contents
* Thumbnail Image Making
* DB transaction support
