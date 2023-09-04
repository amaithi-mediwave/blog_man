
# Blog Man

Node JS and Express JS Based Blogging Back-End Server with JWT Token Integration

----------------------------------------------
### Key Points:
RESTful CRUD API

User Authentication using JWT Tokens

Password Hashing with Bcrypt

Sign/ verify JWT Token

Registration & Login

Express JS - Server, Protected Routes, Controllers

Express Middleware, Error Handling & Async Handler

MongoDB Setup, Mongoose Schema, Atlas and DB operations on Mongo Cloud

Handle NoSQL Relationships

API Testing - Postman

-----------------------------------------

## Getting Started with API Endpoints & Functionalities:

1. Root
2. About
3. Register a New User
4. Login
5. Get the Current User (for verifying)
6. Create/ Update the User Info
7. Get the User Info
8. Get all the Articles (Public [visibility: true]) - Authentication Not Needed
9. Get Personal Articles (both [visibility: true or false])
10. Get Single Article (both [visibility: true or false])
11. Create a New Article
12. Update An Existing Article
13. Delete An Article





## API Documentation:

 - [POSTMAN Documentation](https://documenter.getpostman.com/view/29432364/2s9Y5eMz7f)
 

## Tech Stack

**Server:** Node, Express





## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`CONNECTION_STRING` - for MongoDB Connection

`ACCESS_TOKEN_SECRET` - JWT Token Secret


## Run Locally

Clone the project

```bash
  git clone https://github.com/amaithi-mediwave/blog_man.git
```

Go to the project directory

```bash
  cd blog_man
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start 
```


## Get Started

- Default Port is `PORT: 5000`

- Host Maybe like this `http://localhost:5000/`




## POSTMAN Setup:

- Go to the `Login` request and go to `tests` tab and enter the following lines to automate the environment variable setting.
```bash
  var res = JSON.parse(responseBody);
postman.setEnvironmentVariable("access_Token", res.accessToken);

```
- Make sure the *Environment* `Blog_man` is set active.



## API Reference : 
###### (sample API References)

### *GET - Root*

```http
  GET /api/
```
Get the Root of the Server.

### *GET - About*

```http
  GET /api/about
```
Get the About of the Server.

### *POST - Register a New User*
```http
  POST /api/users/register
```


| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `username`      | `string` | **Required**.  |
| `email`      | `string` | **Required**.  |
| `password`      | `string` | **Required**.  |

This will Create a New User Account.


### *POST - Login User*
```http
  POST /api/users/login
```


| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `email`      | `string` | **Required**.  |
| `password`      | `string` | **Required**.  |

This will login to your User Account.


### *GET - Current Logged-In User*
```http
  POST /api/users/current
```
Need to provide the JWT token(done by postman itself)

This will get the currntly login User Account details.



*For Further Documentation follow the Link Below.*

- [POSTMAN - Documentation](https://documenter.getpostman.com/view/29432364/2s9Y5eMz7f)
## Feedback

If you have any feedback, please reach out to me - [mail](amaithi_chirasan.s@mindwaveventures.com)


## License

[MIT](https://choosealicense.com/licenses/mit/)


## Authors

- [@Amaithi Chirasan](https://www.github.com/amaithi_mediwave)

