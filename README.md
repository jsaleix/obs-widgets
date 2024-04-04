# WIDGETS

A project using NextJS with the recent AppRouter, it main purpose is to provide various widgets overlay to implement on a stream using web browser.

## Stack

-   Docker
-   Typescript
-   NextJS AppRouter
-   NextAuth
-   TailwindCSS
-   DaisyUI
-   React Hook Form
-   Zod
-   Jest
-   Firebase admin sdk
-   Github Actions
-   Vercel (it may changes)

## Requirements

-   `docker` and `docker-compose`
-   `node` (if you want to run the app manually without docker)

## Starting the project

First you need to set up a .env file based on .env.example as:

    cp apps/front/.env.example apps/front/.env

In the .env.example file the var `FIRESTORE_EMULATOR_HOST` is disabled, if you plan to use the project fully in local, enable it in order for the app to use the firebase emulator.
However you must fill the remaining fields such as `TWITCH_CLIENT_ID` and `TWITCH_CLIENT_SECRET`, you can do it in https://dev.twitch.tv/console/apps. If you don't you won't be able to use authentication.

After all that, run the following commands at the root of the project:

    docker compose up -d --build

The app should be available at http://localhost:3000.

## Widgets

-   [Counters](/doc/widgets/counters.md)
