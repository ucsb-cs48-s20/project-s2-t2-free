# Deployment Instructions for FreeFromClass App

Fork the project repo to your own personal GitHub account by clicking on the "Fork" button at the upper right hand of the repo's page on GitHub.  This creates a personal copy of the repo under your own GitHub account.  This is necessary because you can't deploy an app to Heroku unless you have admin access to the repo.
Create a new Heroku app, and link it to you forked copy, so that you are ready to deploy the master branch.

# Configuration of `.env`

Before this app will work, you need to:

- copy `.env.SAMPLE` to `.env`
  - note that `.env` is in the `.gitignore`
- fill in correct values in the `.env` file according to the instructions below.

# Auth0 Setup (configured in `.env`)

The Auth0 Setup for this application is the same as that for this app. Follow the instructions in the `README.md` and linked documents to obtain values
for the `.env` values that start with `AUTH0_`

- <https://github.com/ucsb-cs48-s20/demo-nextjs-app>

# MongoDB Setup (configured in `.env`)

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

If your tests cases are passing locally (when you run `npm test`) but
are failing when run as Continuous Integration (CI) tests on GitHub Actions
then it may be because you need to set up secrets for GitHub Actions.

That process is explained here:
[docs/auth0-github-actions.md](./docs/github-actions.md).
