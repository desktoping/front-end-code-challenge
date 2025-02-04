# Drone Challenge

## Introduction

Bigdatr has an aerial drone which it uses to take photographs of billboards. Instructions are sent to the drone in a simple language that tells the drone which direction to move and when to take a photo. Moves are always exactly 1 km to the north (^), south (v), east (>) or west (<) or take a photograph (x).

Unfortunately the instruction processor is not perfect yet so the drone may photograph the same billboard multiple times.

For example:

-   `x^xv` takes photos of 2 unique billboards and ends up back at the starting location
-   `x^^x>>xvvx<<x` takes photos of 4 unique billboards, however the first billboard has 2 photos of it since the drone comes back to the starting position
-   `xx` takes 2 photos of the same billboard and does not move

## Setting up the project

Fork or download this project, then:

```sh
# install dependencies
yarn install

# Run the api
yarn watch:api
```

The api will start running at `http://localhost:4001`.

It consists of 2 GET endpoints

1. `/instruct-drone` - accepts a list of instructions for the drone, and returns all bilboards found with their details. Example usage: `http://localhost:4001/instruct-drone?instructions=x^xv`

2. `/get-billboard` - accepts an ID of a billboard and returns details of a single billboard. Example usage: `localhost:4001/get-billboard?id=5aba7bffddc4ecbbb81e7fad`

## Requirements

For this code challenge, you are required to setup and create a simple React app:

-   add a way to send drone instructions via a UI to the `/instruct-drone` endpoint, and display its results
-   add a way to retrieve and display billboard details via the UI by using the `/get-billboard` endpoint.
-   you are NOT expected to modify the API - only to build a frontend with React
-   please allocate 2 - 3 hours for this challenge
-   please add clear instructions on how to run the React app
-   please note down improvements in your instructions you would like to implement, or a list of things that need to be done to productionise this app
