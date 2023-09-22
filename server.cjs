// DOTENV
require("dotenv").config();
// EXPRESS
const express = require("express");

// Core Node Module
const path = require("path");
// Other Dependencies (we just downloaded)
const favicon = require("serve-favicon");
const logger = require("morgan");
// Protected routes
const ensureLoggedIn = require("./config/ensureLoggedIn.cjs");

// DB Connection (through file)
// Formerly done in the server.js
// Runs code before it actually imports it
require("./config/database.cjs");

const app = express();

// MIDDLEWARE
// LOGGER
// For more info: documentation
app.use(logger("dev"));

// EXPRESS JSON
// Parses JSON
app.use(express.json());

// MIDDLEWARE FROM checkToken (need file extension)
// sets req.user and req.exp on request object
app.use(require("./config/checkToken.cjs"));

// FAVICON
// Need to feed it an favicon file (later)
// app.use(favicon(path.join(__dirname, 'build', 'favicon.ico')));

// EXPRESS STATIC
// Serves from build (or dist in our case) folder
// __dirname is a reserved variable
app.use(express.static(path.join(__dirname, "dist")));
// Don't need urlencoded() method for form submission
// Because AJAX will be handling, not Express

///////////////////
// API ROUTES
// Put API routes here, before the "catch all" route
///////////////////
// USER ROUTER
const userRouter = require("./routes/api/users.cjs");
app.use("/api/users", userRouter);

// ORDERS
// Required login status to hit routes (protected routes)
app.use("/api/orders", ensureLoggedIn, require("./routes/api/orders.cjs"));

// ITEMS
app.use("/api/items", ensureLoggedIn, require("./routes/api/items.cjs"));

// CATCH ALL
// The following "catch all" route (note the *) is necessary
// to return the index.html on all non-AJAX requests
// Needs "dist" not build argument (Vite vs CRA)
// Serves the REACT front end/build/index from /dist
// NOTE: this will NOT update REACT updates
// Because it's serving from /dist and we'd need to build
app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

// PORT
// 3001 TO NOT CONFLICT WITH 3000 (though vite uses 5173)
// env.PORT or 3001
const PORT = process.env.PORT || 3001;

// LISTENING PORT
app.listen(PORT, function () {
  console.log(`(server.cjs) Your Express Server is up at -P: (${PORT})`);
});

/* 
SETTING UP A NEW APP
Use notes App for process here
Use CodeAlong for the rest of the front-end code.

GIT COMMIT NOTES 9/21 (BIG STROKES)
touch models/categories.cjs (copy code from slack)
touch models/itemSchema.cjs (copy code from slack)
touch models/item.cjs (copy code from slack)
touch models/order.cjs (copy code from slack)
* mkdir routes/api (copy code from slack)
touch orders.cjs (requires express.Router & orderCtrl from controllers/api/orders.cjs)
* server.cjs (ADD A ROUTE COPY FROM SLACK)
* touch controllers/api/orders.cjs (copy code from slack)
touch config/seed.cjs (copy code from slack)

CATEGORY Schema: 
name type string required true
sortOrder: Number
timestamps: true

exports model("category", categorySchema)

ITEM Schema (separate from model per ERD):
name: type string required true
emoji: String (not required)
category: type Schema.Types.ObjectID (mongoose method)
ref: "Category" (see above model)
price: type Number required true default 0
module.exports = itemSchema
THIS WILL ALSO BE USED IN THE ORDERS MODEL

ITEM Schema
require ./category.cjs
require ./itemSchema.cjs
(need the extension)
(Need requires in order to run the file)
module.exports = model('Item', itemSchema)
ANY time you use a REF, need to load the file/require it

ORDER Model
import { Schema, model }
import itemSchema
orderSchema
user: type: Schema.Types.ObjectID, ref: "User", required: true
isPaid: type: Boolean, default: false
lineItems: [] // Object and quantity of objects (subSchema above: LineItem)
timestamps: true
toJson {virtuals: true}

LINEITEM Subdocument Schema
(this is an object, so lineItems will be an array of objects)
lineItems is an object, that is contained in the order array under lineItems
qty: type: number, default: 1
item: itemSchema
timestamps: true
toJson {virtuals: true}

NEW STUFF (VIRTUALS, still in LINEITEM)
// https://mongoosejs.com/docs/tutorials/virtuals.html
// NOT stored in MongoDB, but computed from other Schema fields
// Eliminates having to do updates every time we do something

lineItemSchema.virtual("extPrice").get(function () {return.this.qty * this.item.price})
We give this a function for mongoose to calculate the exit price from the item.cjs 
which embeds itemSchema and orderSchema
Access quantity and price from 

orderSchema.virtual

totalQty

orderID

All orderSchema Virtuals

module.exports = model("Order", )

ORDERS.CJS (routes/api/orders.cjs)
(copy from slack)

SERVER.CJS
(add route, copy from slack)

CONTROLLERS/API/ORDERS.CJS

ERD (Entity Relational Diagram)
Shows how models are connecting to one another
https://drive.google.com/file/d/1UAqYL055QM7bL2J1f9yrQX_XZ1wMOuoy/view?usp=sharing

FRONT END FINISH NOTES



CODE ALONG 6:
https://pscohorts.slack.com/archives/C056A692JAX/p1695323706296799

REPO
https://github.com/andrewdoak/mern-boilerplate

SLIDES:
https://ps-rtt-sei.herokuapp.com/15-week/mod-3/week-13/day-3/slides/
https://ps-rtt-sei.herokuapp.com/15-week/mod-3/week-14/day-1/slides/

CODE ALONG 1: 
https://pscohorts.slack.com/archives/C056A692JAX/p1694545078282019?thread_ts=1694545069.253979&cid=C056A692JAX

CODE ALONG 2:
https://pscohorts.slack.com/archives/C056A692JAX/p1694703713453679

CODE ALONG 3:
https://pscohorts.slack.com/archives/C056A692JAX/p1694795108467469

CODE ALONG 5: 
https://pscohorts.slack.com/archives/C056A692JAX/p1695136396082119


// DAY 5
// =============
Created user token in back end.
Need to persist the JWT on front end through localStorage
We're gonna do that in utilities/users-service.js
  const-res receives token from controllers/api/users.js
  the res.json in the async function there


// DAY 3
// =============
// Create a CRUD-HELPER to test your models
// touch crud-helper.cjs

// Helps with playing with DB without hitting Expresss (a bit like console logging or inspecting)
// Can use it to connect
// Run by node crud-helper.cjs
// Don't run with nodemon because nodemon uses Mongoose and you should only run that once

// LOTS OF TODAY WILL BE AUTHENTICATION
// THIS WILL BE FRONT-END


DAY 2
===============
Setting up user auth
Using service and API modules

SET UP
mkdir config routes models controllers
npm i dotenv
Require it: require("dotenv").config();
touch .env

Set up a new Collection in MongoDB
mernCafe
update your .env file
DATABASE_URL=
update the URL with the 

npm i mongoose
touch config/database.cjs
.cjs is Common JS (Vite needs)
Require it: 
require("./config/database.cjs");
// DB Connection (through file)
// Formerly done in the server.js
// Runs code before it actually imports it
// Needs .cjs here
// Use autocomplete and you'll get the right imports/file extensions

STOPPED AT STEP 6





DAY 1
===============
RUNNING SERVER: 
Here, you have to run 
nodemon server.cjs
OR
node server.cjs

KILL ALL PORTS
pkill node 

PRODUCTION SERVER
3001 Server is the Production Server
npm run dev spins up Vite (Dev Server)
DON'T GO TO 3001 during development
If you DO go there, run BUILD first.

UPDATE PRODUCTION CODE
npm run build 
DON'T GO TO 3001 during development
If you DO go there, run BUILD first. (yes, this is duplicated for emphasis)

DEV SERVER
PORT 5173

DURING DEV
Run both servers
Make two terminals, rename and recolor them in VSCode
npm run dev for 5173 (DEV/Vite)
nodemon server.cjs for 3001 (Production/Express)

TWO TERMINALS (simpler script/process to run both)
npm i -D concurrently
-D for dev dependency
(CHECK: Yes, it's in package.json under dev-dependencies)

    PACKAGE.json
    "dev": "concurrently \"nodemon server.cjs\" \"vite\"",
    "frontend": "vite",
    "backend": "nodemon server.cjs",

    FRONTEND COMMAND
    npm run frontend

    BACKEND COMMAND
    npm run backend

    FRONT & BACK COMMAND
    npm run dev

    
*/
