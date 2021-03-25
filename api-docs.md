# Kanban App
This Kanban App is an application to control one's progress in certain tasks. 
These apps have : 
* RESTful endpoints for authentication, authorization and getting APIs
* JSON formatted response
* List of Errors and its Responses

&nbsp;

## RESTful endpoints
```
POST /login
POST /google-login
POST /register
GET /tasks
GET /tasks/:id
POST /tasks
PUT /tasks/:id
DELETE /tasks/:id
```

---
## 1. POST /login

> Log into an existing user's account

_Request Header_
```
not needed
```

_Request Body_
```
{
  "email": "<your email>",
  "password": "<your password>",
}
```

_Response (200)_
```
{
  "access_token": "<access_token>",
  "email": "<email>",
}
```

_Errors_
```
{
  400 - Login Authentication Error,
  500 - Internal Server Error
}
```

---
## 2. POST /google-login

> Create or log into an existing user's account through Google

_Request Header_
```
not needed
```

_Request Body_
```
{
  "token": "<token>"
}
```

_Response (200)_
```
{
  "id": "<id>",
  "email": "<email>",
  "access_token": "<access_token>",
}
```

_Errors_
```
{
  500 - Internal Server Error
}
```

---
## 3. POST /register

> Create a new account for a user

_Request Header_
```
not needed
```

_Request Body_
```
{
  "email": "<your email>",
  "password": "<your password>",
}
```

_Response (201)_
```
{
  "id": "<id>",
  "email": "<email>"
}
```

_Errors_
```
{
  400 - Validation Error(s),
  500 - Internal Server Error
}
```

---
## 4. GET /tasks

> Get all tasks.

_Request Header_
```
{
  "access_token": "<access_token>"
}
```

_Request Body_
```
not needed
```

_Response (200)_
```
[
  {
    "id": "<id>",
    "detail": "<detail>",
    "category": "<category>",
    "UserId": "<UserId>",
    "User": {
      "id": "<id>",
      "email": "<email>"
    }
  },
  {
    "id": "<id>",
    "detail": "<detail>",
    "category": "<category>",
    "UserId": "<UserId>",
    "User": {
      "id": "<id>",
      "email": "<email>"
    }
  },
  {
    "id": "<id>",
    "detail": "<detail>",
    "category": "<category>",
    "UserId": "<UserId>",
    "User": {
      "id": "<id>",
      "email": "<email>"
    }
  },
  ...
]
```

_Errors_
```
{
  401 - Access Token Error,
  500 - Internal Server Error
}
```

---
## 5. GET /tasks/:id

> Get on task.

_Request Header_
```
{
  "access_token": "<access_token>"
}
```

_Request Body_
```
not needed
```

_Response (200)_
```
{
  "id": "<id>",
  "detail": "<detail>",
  "category": "<category>",
  "UserId": "<UserId>",
  "createdAt": "<createdAt>",
  "updatedAt": "<updatedAt>"
}
  
```

_Errors_
```
{
  401 - Access Token Error,
  403 - Access Denied Error,
  404 - Resource Not Found Error,
  500 - Internal Server Error
}
```

---
## 6. POST /tasks

> Add a new task

_Request Header_
```
{
"access_token" = "<access_token>"
}
```

_Request Body_
```
{
  "detail": "<detail>",
  "category": "<category>",
}
```

_Response (201)_
```
{
  "id": "<id>",
  "detail": "<detail>",
  "category": "<category>",
  "UserId": "<UserId>",
  "createdAt": "<createdAt>",
  "updatedAt": "<updatedAt>"
}
```

_Errors_
```
{
  400 - Validation Error(s),
  401 - Access Token Error,
  500 - Internal Server Error
}
```

---
## 7. PUT /tasks/:id

> Edit an existing task's information

_Request Header_
```
{
  "access_token" = "<access_token>"
}
```

_Request Body_
```
{
  "detail": "<detail>",
  "category": "<category>",
}
```

_Response (200)_
```
[
  {
    "id": "<id>",
    "detail": "<detail>",
    "category": "<category>",
    "UserId": "<UserId>",
    "createdAt": "<createdAt>",
    "updatedAt": "<updatedAt>"
  }
]
```

_Errors_
```
{
  400 - Validation Error(s),
  401 - Access Token Error,
  403 - Authorization Error,
  404 - Resource Not Found Error,
  500 - Internal Server Error
}
```

---
## 8. DELETE /tasks/:id

> Delete an existing task 

_Request Header_
```
{
  "access_token" = "<access_token>"
}
```

_Request Body_
```
not needed
```

_Response (200)_
```
{
  "message": "Task has been successfully deleted."
}
```

_Errors_
```
{
  401 - Access Token Error,
  403 - Authorization Error,
  404 - Resource Not Found Error,
  500 - Internal Server Error
}
```

&nbsp;

---
## Errors

_Response (400 - Login Authentication Error)_
```
{
  "message": "Invalid email/password"
}
```

_Response (400 - Validation Error(s))_
```
{
  "message": "<list of validation errors>"
}
```

_Response (401 - Access Token Error)_
```
{
  "message": "Please log in"
}
```

_Response (403 - Authorization Error)_
```
{
  "message": "Access Denied"
}
```

_Response (404 - Resource Not Found Error)_
```
{
  "message": "Resource not found"
}
```

_Response (500 - Internal Server Error)_
```
{
  "message": "Internal server error"
}
```