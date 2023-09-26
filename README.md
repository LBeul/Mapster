# Mapster: Coursework for WAD2023 @ HTW Berlin

Team **Mapster**: [@lbeul](https://github.com/lbeul) & [@bettinaju](https://github.com/Bettinaju) :octocat:

Mapster is a Single Page Application (SPA) written in pure JavaScript without any frontend frameworks.
It's powered by a Node/Express backend connected to a remote MongoDB instance.

### Setup

- `frontend/...` runs in the browser without special requirements 
- `backend/...` is an npm project that has to be kicked-off:
  - Enter with `cd backend/` and run `npm i` to install dependencies
  - Run `npm start` to run the backend using [nodemon](https://www.npmjs.com/package/nodemon)

### Backend Dependencies

- **express** to streamline node server development
- **morgan** to add simple & concise server logs
- **cors** to enable local cross-origin development
- **mongoose** as an ORM for mongoDB
- **nodemon** as local dev environment with hot-reloading
- **eslint** for linting & formatting

### Environment Variables

In order to get a locally working dev environment, you first need to setup the env variables.
To do this, simply create a new file called `.env` in the root directory and copy the content of `.env.example` into it.

It contains the `PORT` for express to listen to, as well as the MongoDB Atlas URL.
In order to use this Atlas instance, you need a username && password.

### Setup local MongoDB using Docker

- Install `docker`
- Pull the free mongodb image: `docker pull mongodb/mongodb-community-server`
- Run image as container and expose the default port: `docker run -d -p 27017:27017 --name my-mongo -d mongodb/mongodb-community-server:latest`
- Verify that container is running via `docker ps`
- Open the database in mongoDB Compass using the default connection settings
- After this setup, you can start & stop your container using `docker start my-mongo` and `docker stop my-mongo`

### Git Flow

1. Never work directly on `main` -- new feature, new branch
2. We use a `merge`-based flow, so avoid `rebase` on main
3. No local merge&push -- Pull Requests only
4. Ideally, have your PR approved before merging
5. Keep your commit message short, expand to multi-line if necessary

### Miscellanious

- The `/.gitignore` was created using [gitignore.io](https://gitignore.io) and ignores all binary/config files related vim, vscode, nodeJS, and macOS.
