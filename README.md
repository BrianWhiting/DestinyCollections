# Destiny Sets

## Getting started

Prerequisites:

* A fairly recent installation of Node - I use v18.14.0

Steps:

1. Copy `.env.local-sample` to `.env.local` and fill in `REACT_APP_BUNGIE_API_KEY`, `REACT_APP_BUNGIE_OAUTH_CLIENT_ID` and `REACT_APP_BUNGIE_OAUTH_CLIENT_SECRET` with the values from your Bungie.net application (see below for instructions)
2. Install dependencies with `npm install`
3. Run the local dev server with `npm start`
4. You should see "Compiled successfully!"
5. Go to https://localhost:3000 in your browser
    * Note, as we're using HTTPS locally with a self-signed certificate, you'll get a security warning. You'll need to 'proceed anyway' to continue.

## Getting API access from Bungie.net

1. Create a new app at https://www.bungie.net/en/Application
    * OAuth Client Type: Confidential
    * Redirect URL: Enter the URL the site is running at. For local development, this will probably be https://localhost:3000
    * Scope: Check "Read your Destiny 2 information (Vault, Inventory, and Vendors), as well as Destiny 1 Vault and Inventory data"
    * Origin Header: Enter the URL the site is running at. For local development, use a value of `*`