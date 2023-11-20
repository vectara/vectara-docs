# Vectara Docs

Welcome to the repo for the Vectara API Documentation! This documentation is
built with [Docusaurus 2](https://docusaurus.io/) and is hosted at
[docs.vectara.com](https://docs.vectara.com)

## Local Development and Contributions

For anything other than minor changes, clone the repository onto your local machine
and build the documentation locally. It's often helpful to see the changes you make
live.

**Before executing the following commands, please ensure you are in the `www/` directory.**

### Running the app locally

First, install dependencies:

```
$ npm install
```

You can run the app on your machine by issuing the following command.

```
$ npm run start
```

This command starts a local development server and open up a browser window.
Most changes are reflected live without having to restart the server.

After you've validated the content looks correct, please run the following once:

```
$ npm run build
```

This command generates static content into the `build` directory and can be
served using any static contents hosting service. Importantly, it will do
things like link checking to ensure all of the links are valid.

Once you've got the updates in a good shape, feel free to submit a pull
request!

### Advanced

```
$ npm run gen-api-docs
```

This will regenerate docs/rest-api from the static/vectara-oas.yaml file.
Note that this only regenerates a subset of files, and files need to be manually
deleted before they're regenerated. To regenerate all files, delete all existing
files in that directory except for:

- sidebar.js
- vectara-rest-api.info.mdx

```
$ npm run serve
```

This serves the "build" directory at: [http://localhost:3000/](http://localhost:3000/).
This is useful for mimicking the behavior of a production server.

## Deployment

When code/new docs are merged to the `main` branch on GitHub, the entire repo
will automatically be deployed within a few minutes to
[docs.vectara.com](https://docs.vectara.com)
