# Blogger Diaries - Backend

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

---

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