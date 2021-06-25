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
    },
    {
        id: 6,
        product: "paint brush",
        price: 22,
        quantity: 4
    },
    {
        id: 7,
        product: "paint",
        price: 40,
        quantity: 1
    },
    {
        id: 8,
        product: "canvas",
        price: 50,
        quantity: 15
    },
    {
        id: 9,
        product: "markers",
        price: 14,
        quantity: 2
    },
    {
        id: 10,
        product: "posters",
        price: 65,
        quantity: 8
    }
    
];

cart.get("/", (req, res) => {
    let cart = req.query["cartItems"]
    console.log("");
    let maxPrice = req.query.maxPrice;
    let returnCart = cartItems;
    if (maxPrice){
      returnCart = cartItems.filter((item)=> item.price <= maxPrice)
    }
    let prefix = req.query.prefix;
    if(prefix){
      returnCart = returnCart.filter((item)=> item.product.startsWith(prefix))
    }
    let pageSize = req.query.pageSize;
    if(pageSize){
      returnCart = returnCart.slice(0, pageSize);
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
      let test = req.body.test
      console.log("Test results:", test )
      let x = cartItems.length + 1;
      let newItem = req.body;
      newItem.id = x;
      cartItems.push(newItem);
      res.status(201).json(cartItems);
      res.json("Adding new item..");
  });
  

  cart.put("/:id", (req, res) => {
    let id = req.params.id;
    let updatedCart = req.body;
    let found = cartItems.findIndex((item) => item.id == id);
    if(found){
      cartItems[found] = {...cartItems[found], ...updatedCart};
      res.json(cartItems[found]);
    }else{
      res.json("No item updates");

    }

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
