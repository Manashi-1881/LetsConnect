# LetsConnect


## Installation and Run


```bash
npm install
npm start
```

## User Api

```
Signup: https://localhost:3000/v1/api/user 
{
    "name": "kashish",
    "email": "kashish@gmail.com",
    "password": "kashish@123"
}
login: https://localhost:3000/v1/api/login
{
     "email": "kashish@gmail.com",
    "password": "kashish@123"
}
```


## Todo Api

```
Create: https://localhost:3000/v1/api/todo 
{
    "title": "Todo 3"
}
delete: https://localhost:3000/v1/api/todo/:id
mark: https://localhost:3000/v1/api/complete/:id
update: https://localhost:3000/v1/api/todo/:id
todos: https://localhost:3000/v1/api/todos
todo: https://localhost:3000/v1/api/todo/:id
```

## Post Api

```
Create: https://localhost:3000/v1/api/post 
{
    "title": "Post 2",
    "body": "morning is awesome"
}
delete: https://localhost:3000/v1/api/post/:id
update: https://localhost:3000/v1/api/post/:id
{
    "body": "morning is awesome"
}
posts: https://localhost:3000/v1/api/post
post: https://localhost:3000/v1/api/post/:id
comment: https://localhost:3000/v1/api/post/:id/comment
```

## Comment Api

```
Create: https://localhost:3000/v1/api/comment 
{
    "postId": "xxxxxxx",
    "body": "wohoooo"
}
```
