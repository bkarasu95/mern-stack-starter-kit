# File Structure

```bash

├───dist/                               # compiled files and other files that can used by users
│   ├───public/                         # where that user can access via url
│   │   ├───assets/
│   │   │   └───css/                    # css files
│   │   │   └───images/
│   │   │       └───uploads/            # image repo that can upload from server
│   │   ├───admin.js                    # react app for admin
│   │   └───app.js                      # react app for users
│   └───server.js                       # main server file that ready to run
├───docs/                               # documentations about project
├───src/                                # all development files are there
│   ├───client/                         # files that using in client
│   │   ├───admin/                      # admin client side
│   │   │   ├───components/             # reusable components
│   │   │   ├───layouts/                # component that almost every page
│   │   │   ├───pages/                  # admin pages
│   │   │   ├───scss/                   # scss files, it compiles and writes to react app file
│   │   │   ├───store/                  # redux store
│   │   │   │   ├───authenticate/       # example of redux store usage
│   │   │   │   │   ├───actions.ts
│   │   │   │   │   ├───reducers.ts
│   │   │   │   │   └───types.ts        # redux types for typescript
│   │   │   │   └───index.ts            # main store file, we combine reducers in there
│   │   │   ├───App.tsx
│   │   │   └───index.tsx
│   │   ├───app/                        # user client side
│   │   │   ├───components/             # reusable components
│   │   │   ├───layouts/                # component that almost every page
│   │   │   ├───pages/                  # user app pages
│   │   │   ├───scss/                   # scss files, it compiles and writes to react app file
│   │   │   ├───store/                  # redux store
│   │   │   │   ├───products/           # example of redux store usage
│   │   │   │   │   ├───actions.ts
│   │   │   │   │   ├───reducer.ts
│   │   │   │   │   └───types.ts        # redux types for typescript
│   │   │   │   └───index.ts            # main store file, we combine reducers in there
│   │   │   ├───App.tsx
│   │   │   └───index.tsx
│   │   └───resources/
│   │       └───strings/
│   │           ├───actions.ts
│   │           └───apiURL.ts           # predefined urls, define the endpoints in there so if endpoint url change, you won't suffer changing urls that depend on that endpoint
│   ├───common/                         # shared files that uses by both client and server side
│   │   ├───config/                     # configuration files
│   │   │   └───app.json
│   │   ├───models/                     # model interfaces
│   │   └───resources/
│   │       ├───lang/                   # language files
│   │       ├───types/                  # typescript
│   │       └───routes.ts               # definition routes can for ssr
│   └───server/                         # server files
│       ├───config/                     # configuration files that uses only on server, you can store sensitive data in there, but be very very careful
│       ├───database/                   # database management
│       │   ├───migrations/             # migrations for inserting required data or modify exists data
│       │   └───seeds/                  # Populating database with dummy data
│       ├───exceptions/                 # customized exceptions
│       │   └───api/                    # exceptions for only api
│       │   └───web/                    # exceptions for only web
│       ├───helpers/                    # helper functions
│       ├───http/
│       │   ├───controllers/            # Controllers in MVC pattern
│       │   │   ├───admin/              # admin controllers
│       │   │   │   ├───api/            # admin controllers for api
│       │   │   │   └───web/            # admin controllers for web pages
│       │   │   └───app/                # user controllers
│       │   │       ├───api/            # user controllers for api
│       │   │       └───web/            # user controllers for web pages
│       │   └───middlewares/            # server side middlewares
│       │       └───api/
│       │       └───web/
│       ├───libraries/                  # useful libraries for project, also we extend the 3rd party libraries in there and use on project
│       ├───models/                     # db models
│       ├───routes/
│       │   ├───admin/                  # routes for admin
│       │   │   ├───api.ts
│       │   │   └───web.ts
│       │   └───app/                    # routes for users
│       │       ├───api.ts
│       │       └───web.ts
│       ├───services/                   # that using especially for db transactions, we use these in controllers, this is Service Layer
│       └───index.ts                    # server index file
├───.env.example                        # copy this to .env file and configure your environment
├───.gitignore
├───ecosystem.config.js                 # config file for pm2
├───license.txt
├───migrate-mongo-config.js             # mongo migrate config file
├───package.json
├───readme.md
├───tsconfig.client.json                # typescript config for client app
├───tsconfig.server.json                # typescript config for server
└───webpack.config.js                   # config file for webpack

```
