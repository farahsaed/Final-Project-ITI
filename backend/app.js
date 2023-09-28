// const asyncHandler = require('express-async-handler');
const mongoose = require("mongoose");
const express=require ("express"); 
var cors = require("cors");
const Product=require("./models/product");
const User = require("./models/user");
const bcrypt = require("bcryptjs")

const server = express()
server.use(express.urlencoded({extended:true}));
server.use(express.json());
server.use(cors());


mongoose.connect("mongodb+srv://pharmacy:mnh123@cluster1.jjj0nxo.mongodb.net/test")
.then(()=>{
    console.log("Connected successfully")
}).catch(()=>{
    console.log("Failed");
});

//pharmacy products
server.get("/products",function(req,res){
    Product.find().then((productData)=>{
        res.send(productData);
    }).catch((err)=>{
        res.send({
            error:"Error Getting all products"
        })
    })
});

server.get('/product/:id',function(req,res){
  let id = req.params.id;
  Product.findById(id)
  .then((product)=>{
    res.send(product)
  }).catch(err=>{
    console.log(err);
  })
})

var cat = []
server.get("/productCategory/:cat",async function(req,res){
  const searchRegex = new RegExp(req.params.cat, 'i');
      let data = await Product.find({type: {$regex:searchRegex}})
      cat = res.send(data);
      res.send(data)
});

// server.get("/productCategory/:cat/:searchTerm", 
//   async (req, res) => {
//     var search = req.params.searchTerm
//     const searchRegex = new RegExp(req.params.searchTerm, 'i');
//     const categoty = cat.filter((items) => {
//       if(items.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())){
//         return items
//       }
//     })
//     res.send(categoty);
//   }
// )
server.get("/search/:searchTerm", 
  async (req, res) => {
    const searchRegex = new RegExp(req.params.searchTerm, 'i');
    const data = await Product.find({name: {$regex:searchRegex}})
    return res.status(200).json(data);
  }
)

server.delete("/products/:id", function (req, res) {
    let prodId = req.params.id;
    Product.deleteOne({ _id: prodId })
      .then((msg) => {
        res.send({
          msg: "product deleted successfuly",
        });
      })
      .catch((err) => {
        console.log(err);
      });
});


server.put("/product/edit/:id",function(req,res){
  let data = req.body;
  let pid = data.id;
  Product.updateOne({
    _id: pid
  },{
    name:data.name,
    manufaturer:data.manufaturer,
    type:data.type,
    usage:data.usage,
    description:data.description,
    photo_link:data.photo_link,
    price: +data.price,
    rating: +data.rating,
  }).then((msg)=>{
    msg:"Updated successfully";
  }).catch(err=>{
    err:"Error updating";
  });
});


//user
server.post('/sign-up', (req,res) => {

  bcrypt.hash(req.body.password, 10)
      .then(hash => {
          const user = new User({
              name: req.body.name,
              password: hash
          })

          user.save()
          .then(result => {
              res.status(201).json({
                  message: 'User created',
                  result: result
              })
          })
          .catch(err => {
              res.status(500).json({
                  error: err
              })
          })
      })
})
server.post('/login', async (req, res) => {
  try{
    const user = await User.findOne({ name: req.body.name });
  if (user && (await bcrypt.compare(req.body.password,user.password))) {
    return res.status(200).json(user);
  }
  res.status(404).json({message: 'Invalid username or password'})
  }catch(err){
    res.status(500).json({message: err.message})
  }
})

server.get("/user",function(req,res){
  User.find()
  .then((data)=>res.send(data))
    .catch(res.send({
        Error: "Error Getting users data"
    }))
})
server.listen(4000, () => {
   console.log("Server is listening on port 4000");
  });
// const mongoose = require("mongoose");
// const express = require("express");
// const bodyParser = require("body-parser"); // Add body-parser middleware

// const Product = require("./models/product");
// const User = require("./models/user");

// const server = express();

// server.use(bodyParser.urlencoded({ extended: true }));
// server.use(bodyParser.json());

// mongoose
//   .connect("mongodb+srv://pharmacy:mnh123@cluster1.jjj0nxo.mongodb.net/test", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => {
//     console.log("Connected successfully");
//   })
//   .catch(() => {
//     console.log("Failed");
//   });

// // Pharmacy products
// server.get("/products", function (req, res) {
//   Product.find()
//     .then((productData) => {
//       res.send(productData);
//     })
//     .catch((err) => {
//       res.status(500).send({
//         error: "Error Getting all products",
//       });
//     });
// });

// server.delete("/products/:id", function (req, res) {
//   let prodId = req.params.id; // Use req.params.id directly
//   Product.deleteOne({ _id: prodId }) // Use _id instead of id
//     .then((msg) => {
//       res.send({
//         msg: "Product deleted successfully",
//       });
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(500).send({
//         error: "Error deleting product",
//       });
//     });
// });

// server.post("/addProduct", function (req, res) {
//   let data = req.body;
//   let newProduct = new Product({
//     name: data.name,
//     brand: data.brand,
//     type: data.type,
//     usage: data.usage,
//     description: data.description,
//     photo_link: data.photo_link,
//     price: +data.price,
//     rating: +data.rating, // Define the rating variable
//   });

//   newProduct
//     .save()
//     .then(() => {
//       res.send({
//         msg: "Product added successfully",
//       });
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(500).send({
//         error: "Error adding product",
//       });
//     });
// });

// server.put("/product/edit/:id", function (req, res) {
//   let data = req.body;
//   let pid = data.id;
//   Product.updateOne(
//     {
//       _id: pid,
//     },
//     {
//       name: data.name,
//       brand: data.brand,
//       type: data.type,
//       usage: data.usage,
//       description: data.description,
//       photo_link: data.photo_link,
//       price: +data.price,
//       rating: +data.rating,
//     }
//   )
//     .then(() => {
//       res.send({
//         msg: "Updated successfully",
//       });
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(500).send({
//         error: "Error updating product",
//       });
//     });
// });

// // User
// server.get("/user", function (req, res) {
//   User.find()
//     .then((data) => res.send(data))
//     .catch(() => {
//       res.status(500).send({
//         Error: "Error Getting users data",
//       });
//     });
// });

// server.listen(4000, () => {
//   console.log("Server is listening on port 4000");
// });
