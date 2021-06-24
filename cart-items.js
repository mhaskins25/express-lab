const express = require("express");
const cart = express.Router();

let cartItems = [
    {
        id: 1,
        product: "book",
        price: 15,
        quantity: 4
    },
    {
        id: 2,
        product: "journal",
        price: 25,
        quantity: 2
    },
    {
        id: 3,
        product: "pen",
        price: 10,
        quantity: 5
    },
    {
        id: 4,
        product: "magazine",
        price: 12,
        quantity: 8
    },
    {
        id: 5,
        product: "sketchbook",
        price: 27,
        quantity: 10
    }
];

cart.get("/", (req, res) => {
    let cart = req.query["cartItems"]
    console.log("");
    let maxPrice = req.query.maxPrice;
    let returnCart = cartItems;
    if (maxPrice){
      returnCart = cartItems.filter((item)=> item.price.toLowerCase() === item.maxPrice.toLowerCase())
    }
    let prefix = req.query.prefix;
    if(prefix){
      returnCart = cartItems.filter((item)=> item.product.toLowerCase() === item.prefix.toLowerCase())
    }
    let pageSize = req.query.pageSize;
    if(pageSize){
      returnCart = cartItems.slice(0, pageSize);
      
    }
    res.json(returnCart);
  });

  cart.get("/:id", (req, res) => {
    let id = req.params.id;
    console.log("Getting ", id);
    let found = cartItems.find((item) => {
        return item.id == id
    })
    if(found){

    }else{
      return res.status(404).send('ID Not Found');
    }
    res.json(found);
  });

  cart.post("/", (req, res) => {
      console.log(req.body);
      let test = req.body.test
      console.log("Test results:", test )
      let x = cartItems.length + 1;
      // let newItems = {
      //   id: x,
      //   product:
      // }
    res.json("Adding new item..");
  });
  

  cart.put("/:id", (req, res) => {
    let id = req.params.id;
    let found = cartitems.find((item) => item.id === id);
    if(found){

    }else{

    }
    let updatedCart = req.body;
    cartItems[req.params.id] = {...cartItems[req.params.id], ...updatedCart};
    res.json(cartItems[req.params.id]);


    //id is not an index number in this case
    //find index that matches id passed in
    //use index to do something like this {...cartItems[req.params.id], ...updatedCart}
    //create logic to find the id

  });

  cart.delete("/:id", (req, res) => {
      //logic to delete a student
      let id = req.params.id;
      let index = cartItems.findIndex(item => item.id == id);
      cartItems.splice(index, 1);
      console.log(cartItems)
      res.status(204).json(cartItems);
  });

  module.exports = cart;
