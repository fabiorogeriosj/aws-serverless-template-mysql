# AWS Serverless template

This template was created to facilitate the start of a project with serverless framework + MySQL.

In this template we already have a `/users` CRUD route and tests for these routes.

If you find improvements, please help and improve this tempalte ;)


## How to use

create an `.env` file in the project root with the MongoDB database settings, for example:

```
MYSQL_HOST=localhost
MYSQL_USER=root
MYSQL_PASSWORD= 
MYSQL_PORT= 3306
MYSQL_DB=mydb

MYSQL_HOST_TEST=localhost
MYSQL_USER_TEST=root
MYSQL_PASSWORD_TEST= 
MYSQL_PORT_TEST= 3306
MYSQL_DB_TEST=mydbtest
```

## Test

For execute test you need create a table below:

```
CREATE DATABASE mydbtest;
USE mydbtest;
CREATE TABLE users (
    id int(11) NOT NULL AUTO_INCREMENT,
    name varchar(255) DEFAULT NULL,
    email varchar(255) DEFAULT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
```

Run `npm test`

## Deploy

You can use continuous integration or manual deploy, for CI you need configure `.yml` file, this template is configured for gitlab CI, for this you need add variables in Gitlab:

settings > ci_cd > Variables:

```
AWS_ACCESS_KEY_ID=xxxxxxxxxxxxxx
AWS_SECRET_ACCESS_KEY=xxxxxxxxxxxxx
MYSQL_HOST=ds01010101.mlab.com
...
```


For execute manual deploy just `serverless deploy`