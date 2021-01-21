Prerequisitions:
node, angular/cli, mysql

To run the demo do these steps first:

1) Install mysql and run it:
```mysql -u root -p```
2) create database:
```
$ create database shareholders;
$ use shareholders;
```
3) create user and grand him permissions:
```
$ create user 'shareholderUser1'@'localhost' identified by 'password';
$ grant all on shareholders.* to 'shareholderUser1'@'localhost';
$ ALTER USER 'shareholderUser1'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';
```
4) create table:
```
create table shareholdersTable (
  id INT AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  stocksCount FLOAT NOT NULL,
  stocksType VARCHAR(255) NOT NULL,
  PRIMARY KEY (id),
  INDEX (name)
);
```
5) open the 'client' and 'server' directories and run next commands in both of them:
```
$ npm install
$ npm run start
``` 
6) and finally open the http://localhost:4200 page to open the application