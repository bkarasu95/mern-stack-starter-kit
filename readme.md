# MERN Stack Web App Starter Kit

This is starter kit for developing content based web apps fastly. I also added some examples for showing how to system works. More detailed documentation explained in docs folder. 

**Caution:** This project hasn't finished yet. So some features may has bug, project structure can change etc. It would be better to wait for the release.

Additional integrations are provided:

* Typescript
* Server Side Rendering for User App side
* React Router
* React Redux

Install all dependencies

```shellscript
    npm install  
```

Required npm packages globally:

1. migrate-mongo - migrating data for mongodb
2. pm2 - deploying nodejs application

For development, we use some npm packages globally that helps the development:

1. nodemon
2. tree-extended - generating the project's folder structure, run in project's root directory

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

Project is close to completion, but i have some plans for better development.

* Database Seeding System
* Changable Language System
* Testing Tools integrations and samples
* Error logging and showing in admin panel
* App monitoring in admin panel
* Content Editor and Dynamic and Configurable Forms
* Admin Full Theme Support
* SEO support for contents