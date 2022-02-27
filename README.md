# Open-Store-Server

[Project live](https://open-store-server.herokuapp.com/ "https://open-store-server.herokuapp.com/")
<br>

Application built for listing products, insipared offerup app. Backend Api has been deployed on heroku.
In the backend api has bjilt with express, node JS and as a dbs MongoDB ATLAS has been applied.

## Routes
___


| USER Funtionalites   | Product CRUD          | SAVED CRUD          | 
| -------------        |:-------------:        |-----:               |
| *url/sign-in*        | *url/create-item*     | *url/create-saved*  |
| *url/sign-up*        | *url/index-item*      | *url/index-saved*   |
| *url/change-password*| *url/show-item/:id*   |                     |
| *url/sign-out*       | *url/create-item/:id* |  *url/delete-saved* |

 <br>
 

## ERD
---
 ![appscreen](./public/frames.png)


# Planning to todos
- Add SocketIo server for owner-customer relations
- Add backend to run on AWS serverless server
- Add image upload functionality with AWS S3 bucket options





