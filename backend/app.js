const express = require("express");
const bodyParser = require("body-parser");
const path = require('path')

const issue = require("./routes/issue")



const app = express();
const mongoose=require('mongoose')


mongoose.connect("mongodb://localhost:27017/mydb").then(()=>{
  console.log('Connected to database')
}).catch((err)=>{  console.log('Connection failed',err)
})


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));




app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS, PUT"
  );
  next();
});

app.use('/',issue)


module.exports = app




// app.post("api/posts", (req, res, next) => {
//   const post = req.body;
//   console.log(post);
//   res.status(201).json({
//     message: 'Post added successfully'
//   });
// });



// app.put("/api/posts/:id", (req,res,next) => {
//   const post = new Post({
//     _id: req.body.id,
//     title: req.body.title,
//     content: req.body.content
//   })
//   console.log(post)
//   Post.updateOne({_id: req.params.id}, post).then(result => {
//     console.log(result);
//     res.status(200).json({
//       message: 'Update successfull'
//     })
//   }).catch((err)=>{console.log('Error',err)})
// });



// const express = require("express");
// const bodyParser = require("body-parser");

// const app = express();

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));

// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "GET, POST, PATCH, DELETE, OPTIONS"
//   );
//   next();
// });

// app.post("/api/posts", (req, res, next) => {
//   const post = req.body;
//   console.log(post);
//   res.status(201).json({
//     message: 'Post added successfully'
//   });
// });

// app.get("/api/posts", (req, res, next) => {
//   const posts = [
//     {
//       id: "fadf12421l",
//       title: "First server-side post",
//       content: "This is coming from the server"
//     },
//     {
//       id: "ksajflaj132",
//       title: "Second server-side post",
//       content: "This is coming from the server!"
//     }
//   ];
//   res.status(200).json({
//     message: "Posts fetched successfully!",
//     posts: posts
//   });
// });

// module.exports = app;

