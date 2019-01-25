const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
const  multer  = require('multer')
const uuid = require('uuid/v4')
const fs = require('fs');
const  mysql = require('mysql')
const app = express();
const http = require('http');
const  blogsRouter = express.Router();

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1134',
  database: 'blog'
})
connection.connect(function(err) {
    if (err) throw err
    console.log('You are now connected to DB')
  })

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use('/images', express.static(__dirname + '/images'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
//use multer as middleware for diskstoreage.
const storage = multer.diskStorage({
  destination: path.join(__dirname, '/images'),
  filename(req, file, cb) {
    cb(null, `${uuid()}${path.extname(file.originalname)}`);
  },
});
// config multer middleware
const upload = multer({ storage });
// multer options
const postBlog = [{ name: 'images', maxCount: 1 }, { name: 'title', maxCount: 1 },{ name: ' content', maxCount: 1 }, { name: 'author', maxCount: 1 }, { name: 'date', maxCount: 1 }, { name: 'authorID', maxCount: 1 },  ];
const modifyBlog = [{ name: 'id', maxCount: 1}, { name: 'title', maxCount: 1}, { name: 'content', maxCount: 1}, { name: 'date', maxCount: 1}];
const registerFields = [{name: 'id', maxCount: 1}, {name: 'name', maxCount: 1}, {name: 'password', maxCount: 1}];
const loginFields = [{name: 'id', maxCount: 1}, {name: 'password', maxCount: 1}];
const deleteBlog = [{ name: 'id', maxCount: 1},];
/* ------Blog managenent------ */
// Add a new post

const blogRouter = express.Router();

blogsRouter.post('/upload', upload.fields(postBlog), async (req, res) => {
  let fileName = null;
  try {
     fileName = req.files.images[0].filename; // files passed from client        
  } catch (error) {
  }
    const meta = req.body; // all other values passed from the client, usally can deal with texts sent from client.
    const { title,  date, author, content , authorID} = meta;    
    let id = uuid();    
    const postNewBlog = `insert into posts values("${id}","${date}","${title}","${content}","${authorID}","${author}","${fileName}" )`;
    connection.query(postNewBlog, function (error, results, fields) {
       if (error) throw error;
     });
   
    res.status(200).json('blog posted successfully');
    /*
    // send the data to our REST API
    axios({
       url: `https://api.myrest.com/uploads`,
       method: 'post',
       data: {
         file,
         name: meta.name,      
       },
     })
      .then(response => res.status(200).json(response.data.data))
      .catch((error) => res.status(500).json(error.response.data));
      */
   });

   // Moldify a blog

   blogsRouter.post('/modify', upload.fields(modifyBlog), async (req, res) => {
    const meta = req.body; // all other values passed from the client, usally can deal with texts sent from client.
    const {id, title, content, date } = meta;
    const updateTheBlog = `update posts set title = "${title}", content = "${content}", date="${date}" where id = "${id}"`;
    // console.log('meta:', id, title, content, date);
    connection.query(updateTheBlog, function (error, results, fields) {
       if (error) { throw error; }
       else { 
        // console.log('update the blog successfully');
        // console.log('resullt:', results)
        res.status(200).json('update the blog successfully'); }
     });
    
   });
   // Delete a blog

   blogsRouter.delete('/blog', upload.fields(deleteBlog), async (req, res) => {
    const meta = req.body; // all other values passed from the client, usally can deal with texts sent from client.
    const {id} = meta;
    const findThePic = `select images from posts where id = "${id}"`;
    const deleteTheBlog = `delete from posts where id = "${id}"`;
     connection.query(findThePic, function (error, results, fields) {
      if (error) { throw error; }
      else {
          try {
            const picPath = path.join(path.join(__dirname, '/images'), results[0].images);
            // console.log('picName', results[0].images);
            fs.unlink(picPath, (err)=>{
              if(err) {throw err};
              // console.log('file deleted');
            })
            // console.log('delete the blog successfully');
          } catch (error) {
          //  console.log('no images');
          }
           }
    });
    connection.query(deleteTheBlog, function (error, results, fields) {
      if (error) { throw error; }
      else { 
          // console.log('delete the blog from db');
          res.status(200).json('delete the blog successfully');
           }
    });
   });

   //Client side fetch a new post

   blogsRouter.get('/', async (req, res) =>{
    const getAllBlogInfo = `select id, title, authorID, author,  images from posts`;
    connection.query(getAllBlogInfo, (err, results, fields) => {
      if (err) {
        throw err;
        res.status(401);
        res.send();
    }
      else{
        res.status(200).json(results);
        // console.log(results)
  
      }
    });
  
  });

// Client request for a specific blog
  blogsRouter.get('/blog', (req,res)=>{
    const postID = req.query.id;
    // console.log("post id:",postID)
    const getSpecificBlog = `select * from posts where id = "${postID}" `;
    connection.query(getSpecificBlog, (err, results, fields) =>{
      if (err) {
        throw err;
        res.status(401);
        res.send();
    }
    else{
      res.status(200).json(results);
      // console.log(results)
  
    }
    });
  });



//User Managemant
const userRouter = express.Router();
//Add new user
userRouter.post( '/register', upload.fields(registerFields), async (req, res)=>{
    const meta = req.body;
    const { id, name, password } = meta; 
    const queryForRegistration1 = `select id from users where id = "${id}" `;
    const queryForRegistration2 = `insert into users values("${id}", "${name}", "${password}")` ;

    if(id=='null' || name=='null' || password=='null' ){
      res.status(200).json('blank');
    }
    else{
      connection.query(queryForRegistration1,  function (error, results, fields) {
        if (error) {
            throw error;
            
        }
        else {
            if(results.length>0){
                // console.log('This id has already been used.')                               
                res.status(200).json('This id has already been used.')
               
            }
            else{
                connection.query(queryForRegistration2,  function (error, results, fields) {
                    if (error) {
                        throw error;
                        
                    }
                    else { 
                      // console.log('User added Successfully') 
                      res.status(200).json('User added Successfully!');
                  }
                  });
                  
            }

        }

      });
    }

});

//Login 
userRouter.post( '/login', upload.fields(loginFields), async (req, res)=>{
  const meta = req.body;
  console.log('in login')
  console.log('id, password', meta)
  const { id, password } = meta;  
  const  authenticateUser = `select password, name from users where id = "${id}" `;
    connection.query(authenticateUser,  function (error, results, fields) {
          if (error) {
              throw error;

          }
          else {
            if(id=='null' || password=='null' ){
              res.status(200).json({msg:'blank'});
            }
            else{
              if(results.length > 0){
                truePassword = results[0].password;
                if( password == truePassword){
                //console.log('login result',results[0]) result: [{ col1, col2}] 
                  console.log('successful authentication') 
                  res.status(200).json({msg:'successful authentication', userName:results[0].name})
                }
                else{
                  // console.log('unsuccessful authentication')
                  res.status(200).json({msg:'Wrong password!'})
                   
                }
               }
               else{
                // console.log('user id not found')
                res.status(200).json({msg: 'User ID not found!'})
               }
            }

              
          }

        });
});
// config the server
app.use('/blogs', blogsRouter);
app.use('/user', userRouter);
//http server
const server =  http.Server(app);
//https server
const port =  process.env.Port||8000;

server.listen(port, '0.0.0.0', ()=>{console.log(`now is listening to ${port} port`)})
