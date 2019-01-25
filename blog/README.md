## HW5 Blog
### To install
```
    npm install
```
### To start
1. In the terminal:
```
    mysql -u root -p
    create database blog;
    use blog;
    create table posts(
        id varchar(255),
        date varchar(20),
        title varchar(255),
        content varchar(1000),
        authorID varchar(100),
        author varchar(50),
        images varchar(255)
    );

    create table users(
        id varchar(100),
        name varchar(50),
        password varchar(50)
    );
```
2. Add environment variable: 
```
    export SQL_PASSWORD=<YOUR_SQL_PASSWORD>
```
3. In the terminal:
```
   npm run dev
```