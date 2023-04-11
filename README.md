# Flexpa work sample from Turborepo Docker starter

https://www.flexpa.com/docs/about/work-sample

## What's inside?

This turborepo uses [Yarn](https://classic.yarnpkg.com/lang/en/) as a package manager. It includes the following packages/apps:

### Apps and Packages

- `apps/web`: a [Next.js](https://nextjs.org/) app;
  To work with the Flexpa API you will need a `.env.local` file with the

  ```
  NEXT_PUBLIC_FLEXPA_PUBLISHABLE_KEY=
  ```

  variable set.

- `apps/api`: an [Express](https://expressjs.com/) server;
  To work with the Flexpa API you will need a `.env` file with the:

  ```
  FLEXPA_SECRET_KEY=
  ```

  variable set.

- `packages/ui`: ui: a React component library
- `packages/eslint-config-custom`: `eslint` configurations for client side applications (includes `eslint-config-next` and `eslint-config-prettier`)
- `packages/eslint-config-custom-server`: `eslint` configurations for server side applications (includes `eslint-config-next` and `eslint-config-prettier`)
- `packages/jest-presets`: Jest configurations
- `packages/logger`: Isomorphic logger (a small wrapper around console.log)
- `packages/tsconfig`: tsconfig.json files used throughout the monorepo

### Docker

This repo is configured to be built with Docker, and Docker compose. To build all apps in this repo:

```
# Create a network, which allows containers to communicate
# with each other, by using their container name as a hostname
docker network create app_network

# Build prod using new BuildKit engine
COMPOSE_DOCKER_CLI_BUILD=1 DOCKER_BUILDKIT=1 docker-compose -f docker-compose.yml build

# Start prod in detached mode
docker-compose -f docker-compose.yml up -d
```

Open http://localhost:3000.

To shutdown all running containers:

```
# Stop all running containers
docker kill $(docker ps -q) && docker rm $(docker ps -a -q)
```

### Utilities

This Turborepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Jest](https://jestjs.io) test runner for all things JavaScript
- [Prettier](https://prettier.io) for code formatting
