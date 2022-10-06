# Vectara Docs

Welcome to the repo for the Vectara API Documentation!  This documentation uses
the [Docusaurus](https://docusaurus.io/) framework and is hosted at
[docs.vectara.com](https://docs.vectara.com)

## Local Development and Contributions

For anything other than minor changes, clone the repository onto your local machine
and build the documentation locally.  It's often helpful to see the changes you make
live, which can be done by running the following command:

```
$ yarn start
```

This command starts a local development server and open up a browser window.
Most changes are reflected live without having to restart the server.

After you've validated the content looks correct, please run the following once:

```
$ yarn build
```

This command generates static content into the `build` directory and can be
served using any static contents hosting service.  Importantly, it will do
things like link checking to ensure all of the links are valid.

Once you've got the updates in a good shape, feel free to submit a pull
request!

## Deployment
When code/new docs are merged to the `main` branch on GitHub, the entire repo
will automatically be deployed within a few minutes to
[docs.vectara.com](https://docs.vectara.com)