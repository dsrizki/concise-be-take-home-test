# concise-be-take-home-test

Concise Back End Take Home Test

Todo:

- Install packages

  `npm install`

- Install sequelize-cli on global (if you want to install locally, use `--save-dev` or `-D` and access with `npx sequelize-cli`)

  `npm install sequelize-cli -g`

- Run your local postgresql with these configurations:

  - username: `postgres`
  - password: `postgres`
  - database name: `project_db`
  - port: `5432`
  - host: `127.0.0.1` OR `localhost`
  - dialect: `postgres`

- Create and migrate database with sequelize-cli

  `sequelize-cli db:create`

  `seqeulize-cli db:migrate`

- Testing using `npm test`
