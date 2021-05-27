# Periodic Table: A Restaurant Reservation System

Thank you for taking a look at my work. This app is designed to help users in a restaurant setting manage reservations for their customers.



 
![" Dashboard: The Apps Entry Point"](Screen%20Shot%202021-05-26%20at%204.36.28%20PM.png) 
  
![" Search Screen"](Screen%20Shot%202021-05-26%20at%204.37.52%20PM.png)

![" Create Reservation Screen" ](Screen%20Shot%202021-05-26%20at%204.38.16%20PM.png)

!["Create Table Screen"](Screen%20Shot%202021-05-26%20at%204.38.30%20PM.png)

!["Edit Reservation Screen"](Screen%20Shot%202021-05-26%20at%204.43.45%20PM.png)



## Application's Functional Summary:
  
  The Dashboard is the entry point of the online application. A restaurant's reservations are listed by date, which the user is able to change,
  create and edit.
  The user is able to create custom tables for seating parties of any size by utilizing the Create Table screen.
  The main task of assigning a table is performed by going to the Dashboard screen and clicking the seat button.
  Once the party is done, the user simply selects the Finish button on the Dashboard screen to close out the reservation.
  The user can easily perform a Search for a reservation by mobile number.
  Lastly, the user has the ability to Cancel a reservation.
  
  
## Technology in play:
  The frontend was developed with HTML5, CSS3, Javascript, Bootstrap, and React. For the backend, I used Node.js, Express, and Knex.


## Basic Installation 
1. Fork and clone this repository.
1. Run `cp ./back-end/.env.sample ./back-end/.env`.
1. Update the `./back-end/.env` file with the connection URL's to your  database instance.
1. Run `cp ./front-end/.env.sample ./front-end/.env`.
1. You should not need to make changes to the `./front-end/.env` file unless you want to connect to a backend at a location other than `http://localhost:5000`.
1. Run `npm install` to install project dependencies.
1. Run `npm run start:dev` to start your server in development mode. to run the application locally.

## Existing files

This repository is set up as a *monorepo*, meaning that the frontend and backend projects are in one repository. This allows you to open both projects in the same editor.

As you work through the user stories listed later in this document, you will be writing code that allows your frontend and backend applications to talk to each other. You will also write code to allow your controllers and services to connect to, and query, your PostgreSQL database via [Knex](http://knexjs.org/).

The table below describes the folders in this starter repository:

| Folder/file path | Description                                                      |
| ---------------- | ---------------------------------------------------------------- |
| `./back-end`     | The backend project, which runs on `localhost:5000` by default.  |
| `./front-end`    | The frontend project, which runs on `localhost:3000` by default. |



## API

| Endpoint                               | Method | Description                                                                                           |
| -------------------------------------- | ------ | ----------------------------------------------------------------------------------------------------- |
| `/reservations`                        | GET    | Gets all of the reservations.  |
| `/reservations`                        | POST   | Creates a new reservation.                                                                            |
| `/reservations/:reservation_id`        | GET    | Gets the reservation corresponding to 'reservation_id'.                                               |
| `/reservations/:reservation_id`        | PUT    | Updates the reservation corresponding to 'reservation_id'.                                            |
| `/reservations/:reservation_id/status` | PUT    | Updates the reservation status.                                                                       |
| `/tables`                              | GET    | Gets all of the tables.                                                                               |
| `/tables`                              | POST   | Creates a custom table.                                                                                      |
| `/tables/:tableId/seat`                | PUT    | Assigns a reservation to a table.                                                                     |
| `/tables/:tableId/seat`                | DELETE | Resets a table's availability for future reservations.                                                                |