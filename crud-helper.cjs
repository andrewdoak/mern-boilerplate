// Connect to the database
require("dotenv").config();
const db = require("./config/database.cjs");

// Require the Mongoose models
// const User = require('./models/user');
// const Item = require('./models/item');
// const Category = require('./models/category');
const Order = require("./models/order.cjs");

// Local variables will come in handy for holding retrieved documents
let user, item, category, order;
let users, items, categories, orders;

// Run in a clear terminal
// node crud-helper.cjs
Order.create({
  user: "650cb125ef6a747bf161ffe6",
  isPaid: true,
  lineItems: [
    {
      qty: 1,
      item: {
        name: "Hamburger",
        emoji: "🍔",
        price: 5.95,
      },
    },
    {
      qty: 2,
      item: {
        name: "Turkey Sandwich",
        emoji: "🥪",
        price: 6.95,
      },
    },
  ],
})
  .then((order) => {
    console.log(order);
  })
  .finally(() => {
    db.close();
  });

// setTimeout(() => {
//   db.close();
// }, 5000);

/* 
JOSH USED THIS WHEN WE CREATED THE BCRYPT IN users/model
Commented out setTimeout

To use it. A new terminal.
type node
then .load crud-helper.cjs

FOLLOW NOTES at "Feel free sit back and observe..."
*/
