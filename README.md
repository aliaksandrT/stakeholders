Prerequisitions:
node, angular/cli, docker

To run the demo do these steps first:

1) Open the project folder and run:
```docker-compose up --build```
2) wait for the next messages in the console:
```
db_1      | 2021-01-25T23:55:22.380359Z 0 [Note] mysqld: ready for connections.
db_1      | Version: '5.7.33'  socket: '/var/run/mysqld/mysqld.sock'  port: 3306  MySQL Community Server (GPL)
server_1  | 
server_1  | > shareholders_server@1.0.0 start /usr/src/app
server_1  | > node src/index.js
server_1  | 
server_1  | Express server listening on port 8080
server_1  | connected as id 2
```
3) open the 'client' directory and run next commands:
```
$ npm install
$ npm run start
``` 
4) and finally open the http://localhost:4200 page to open the application