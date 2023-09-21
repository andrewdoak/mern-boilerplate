const Order = require("../../models/order.cjs");

module.exports = {
  history,
};

async function history(req, res) {
  res.json("history");
}
