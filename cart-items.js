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
    res.json(cartItems);
  });

  cart.get("/:id", (req, res) => {
      let id = req.params.id;
    console.log("Getting ", id);
    let found = cartItems.find((item) => {
        return item.id == id
    })
    res.json(found);
  });

  cart.post("/", (req, res) => {
      console.log(req.body);
      let test = req.body.test
      console.log("Test results:", test )
    res.json("Adding new item..");
  });
  

  cart.put("/", (req, res) => {
    res.json("Updating the cart..");
  });

  cart.delete("/", (req, res) => {
      //logic to delete a student
    res.json("Deleting cart item..");
  });

  module.exports = cart;
