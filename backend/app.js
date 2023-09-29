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
server.get("/products", function (req, res) {
  var pageNumber = +req.query.pageNumber;
  var pageSize = +req.query.pageSize;
  var requiredProducts = Product.find();
  var fetchedProducts;
  if (pageNumber && pageSize) {
    requiredProducts.skip(pageSize * (pageNumber - 1)).limit(pageSize);
  }
  requiredProducts
    .then((productsData) => {
      fetchedProducts = productsData;
      return Product.count();
    })
    .then((productsCount) => {
      res.send({
        totalProducts: productsCount,
        products: fetchedProducts,
      });
    })
    .catch((err) => {
      res.send({
        error: "Error getting product",
      });
    });
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

server.get("/search/:searchTerm", 
  async (req, res) => {
    const searchRegex = new RegExp(req.params.searchTerm, 'i');
    const data = await Product.find({name: {$regex:searchRegex}})
    return res.status(200).json(data);
  }
)

server.get('/productCategory',function(req,res){
  var category = req.query.category;
  console.log(category);
  Product.find({type:category})
  .then(products=>{
    res.send(products)
    console.log(products);
  }).catch(err=>{
    console.log(err);
  })
})


server.get("/productCategory/:searchTerm", 
  async (req, res) => {
    var category = req.query.category
    var search = req.params.searchTerm
    const searchRegex = new RegExp(req.params.searchTerm, 'i');
    const data = await Product.find({type:category , name: {$regex:searchRegex}})
    res.send(data);
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

server.get('/',function(req,res){
  //find({"likes":{$gt:50}})
  Product.find({rating:{$gte:4.8}})
  .then(products=>{
    res.send(products)
  }).catch(err=>{
    console.log(err);
  })
})


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
