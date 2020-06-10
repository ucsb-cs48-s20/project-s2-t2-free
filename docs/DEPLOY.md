# Deployment Instructions for FreeFromClass App

Fork the project repo to your own personal GitHub account by clicking on the "Fork" button at the upper right hand of the repo's page on GitHub. This creates a personal copy of the repo under your own GitHub account. This is necessary because you can't deploy an app to Heroku unless you have admin access to the repo.

## Configuration of `.env`

Before this app will work, you need to:

- copy `.env.SAMPLE` to `.env`
  - note that `.env` is in the `.gitignore`
- fill in correct values in the `.env` file according to the instructions below.

## Auth0 Setup for Localhost (configured in `.env`)

The Auth0 Setup for this application to run on Localhost.
Follow the instructions in the `auth0-localhost.md` to obtain values
for the `.env` values that start with `AUTH0_`:
[auth0-localhost.md](./auth0-localhost.md).

## MongoDB Setup (configured in `.env`)

This application requires a connection to a MongoDB database.

The required `.env` value is `MONGODB_URI`, which should be set to the connection
string for the MongoDB Cluster you will use for development.

Follow the instructions at
<https://ucsb-cs48.github.io/topics/mongodb_cloud_atlas_setup/> to set
up a MongoDB database on Mongo Cloud Atlas. You'll need to put the
specific MongoDB URI for your database (copying in the correct
password) into your `.env` file, e.g.

```
MONGODB_URI=mongodb+srv://db-user-here:actual-password-here@cluster0-6c3fw.mongodb.net/test?retryWrites=true&w=majority
```

NOTE: This URI above is _only an example_ and is _totally
fake_. All of the parts of the URI will be _specific_ to the MongoDB
cluster you create, not just the user and password. So please go
through the setup instructions in detail to generate your own proper
MongoDB Connection String.

## Configuring secrets for GitHub Actions

You will need to set up secrets for GitHub Actions.

That process is explained here:
[auth0-github-actions.md](./auth0-github-actions.md).

## Running Test Cases (optional)

In order to run `npm test` to see if the provided test cases are passing
locally, you will need to create another MongoDB database. The same process
can be followed for the initial MongoDB Setup above, with the only change
being naming the new value in `.env` as `MONGODB_URI_TEST`.

- Note: If `npm test` does not work, run `npm install` first
- Note: Running `npm test` without `MONGODB_URI_TEST` being properly set up
  in `.env` will result in your application's MongoDB data to be overwritten by
  the test cases.

## Running on localhost

To run on localhost, run:

```
npm run dev
```

The app will run on <http://localhost:3000>.

While the app is running in development mode, any changes you make to
the codebase will automatically be reflected in the browser.

## Heroku Setup

Create a new Heroku app, and link it to your forked copy of this app, so that you are ready to deploy the master branch.
Instructions on how to set up your app on Heroku can be found here:
[heroku.md](./heroku.md)

# [Deployment Instructions Video](https://www.youtube.com/watch?v=0RYbwrxzuvQ)
