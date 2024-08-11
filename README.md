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
- PG 12.0 or above
- Node.js 14.0 or above
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

Follow these steps to set up and run the Rails backend server and the React frontend.

1. Create the .env by using .env.example as a reference: cp .env.example .env

2. Update the /config/database.yml file with your correct local information

3. Clone the Repository
   ```
   git clone https://github.com/bhood239/Readr.git
   cd Readr
   ```
4. Set Up the Rails Backend
   Install the required gems:

```
bundle install
```

Set up the database:

```
rails db:create
rails db:migrate
rails db:seed
```

Start the Rails server:

```
rails server
```

The backend server will run on http://localhost:3001 by default.

5. Set Up the React Frontend
   Navigate to the client directory:

```
cd client
```

Install the dependencies:

```
npm install
```

Start the React development server:

```
npm start
```

The frontend will run on http://localhost:3000.

6. Access the Application
   Open your browser and navigate to http://localhost:3000 to access the application.

## Contributors

- Holina Millington - https://github.com/Millington-Holi7
- Vyshnavi Doulagar - https://github.com/vyshudoulagar
- Ben Hood - https://github.com/bhood239
- Laraib Shaikh - https://github.com/laraibsshaikh10

## Final Product Screenshots

- Desktop views

![01-desktop-scroll](./lib/screenshots/01-desktop-scroll.gif)
![02-desktop-view-pin](./lib/screenshots/02-desktop-view-pin.gif)
![03-desktop-login](./lib/screenshots/03-desktop-login.gif)
![04-desktop-favorite](./lib/screenshots/04-desktop-favorite.gif)
