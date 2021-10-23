# Blogger Diaries - Backend
GitHub link of frontend for this application: https://github.com/tanishabisht/BloggerDiaries-frontend

## 1. Authentication 
- Meta Data
    - name
    - email
    - password
    - createdAt
    - updatedAt
    - createdBy
    - updatedBy
- APIs
    - POST: sign up 
    - PATCH: change password
    - POST: Login >> token

## 2. Blog (Auth)
- Meta Data
    - user id
    - title
    - description
    - content
- APIs
    - POST: create new message
    - PATCH: edit existing message by id
    - DELETE: delete message by id

## Deploying on Heroku
- Procfile
    ```
    web:node app.js
    ```
- package.json
    ```json
    "scripts": {
        "start": "node app.js"
    }
    ```
- app.js
    ```js
    require('dotenv').config()
    const PORT = process.env.PORT || 3000
    ```
- add the environment variables in settings of heroku project