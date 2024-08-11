# Readr

Readr is a full-stack web application that allows users to find, review and browse their favorite books.

## Table of Contents

- [Readr](#readr)
  - [Table of Contents](#table-of-contents)
  - [About](#about)
  - [Features](#features)
  - [Dependencies](#dependencies)
  - [Installation](#installation)
  - [Contributors](#contributors)
  - [Final Product Screenshots](#final-product-screenshots)

## About

Readr has been planned and built collaboratively in a team of 4, to showcase our full-stack development abilities, address the hard and soft skills needed to succeed on the job, and to simulate a work environment. Given a list of application requirements, we planned out and built the application over a 3 week period.

## Features

The key features of Readr include:

- Users can search for a book by the title.
- Users can add books to a list of favorites.
- Users can move books between their list of books to be read, reading or read.
- Users can review books and share their reviews.
- Users can see other user's book reviews.
- Users can see follow their friends and see what they have posted and their lists of books.

## Dependencies

- Ruby 3.2.2
- Rails 7.1.1
- PG 1.1 or above
- Bcrypt 3.1.7
- Puma 5.0 or above
- Bootstrap 5.3.3 or above
- Sass 1.77.8 or above
- React 18.2.0 or above
- Axios 1.7.2 or above
- React-dom 18.2.0 or above
- React-bootstrap 2.10.4 or above
- React-router-bootstrap 0.26.3 or above
- React-router-dom 6.26.0 or above
- React-scripts 5.0.1 or above

## Installation

- Create the .env by using .env.example as a reference: cp .env.example .env

- Update the .env file with your correct local information

  - DB_HOST=localhost
  - DB_USER=YourUsername
  - DB_PASS=YourPassword
  - DB_NAME=YourDatabaseName
  - DB_PORT=5432
  - GOOGLE_MAPS_API=YourApiKey (You will need to acquire a google maps api key at: https://console.cloud.google.com/)

- Install dependencies: npm install

- Fix to binaries for sass: npm rebuild node-sass

- Reset database: npm run db:reset

- Check the db folder to see what gets created and seeded in the DB

- Run the server: npm run local

  - Note: nodemon is used, so you should not have to restart your server

- Visit http://localhost:8080/

- Use the npm run db:reset command each time there is a change to the database schema or seeds. This will run through each of the files, in order, and executes them against the database.

## Contributors

- Jeremiah Chua - https://github.com/Ametrysinine
- Vyshnavi Doulagar - https://github.com/vyshudoulagar
- Ben Hood - https://github.com/bhood239

## Final Product Screenshots

- Desktop views

![01-desktop-scroll](./lib/screenshots/01-desktop-scroll.gif)
![02-desktop-view-pin](./lib/screenshots/02-desktop-view-pin.gif)
![03-desktop-login](./lib/screenshots/03-desktop-login.gif)
![04-desktop-favorite](./lib/screenshots/04-desktop-favorite.gif)

- Mobile views

![05-mobile-dropdown](./lib/screenshots/05-mobile-dropdown.gif)
![06-mobile-login](./lib/screenshots/06-mobile-login.gif)
