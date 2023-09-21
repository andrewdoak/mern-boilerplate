const { Schema, model } = require("mongoose");
const itemSchema = require("./itemSchema.cjs");

//sub-document schema
const lineItemSchema = new Schema(
  {
    qty: {
      type: Number,
      default: 1,
    },
    item: itemSchema,
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  }
);

lineItemSchema.virtual("extPrice").get(function () {
  // 'this' is bound to the lineItem subdoc
  return this.qty * this.item.price;
});

const orderSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    isPaid: { type: Boolean, default: false },
    lineItems: [lineItemSchema],
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  }
);

orderSchema.virtual("orderTotal").get(function () {
  return this.lineItems.reduce((total, item) => total + item.extPrice, 0);
});

orderSchema.virtual("totalQty").get(function () {
  return this.lineItems.reduce((total, item) => total + item.qty, 0);
});

orderSchema.virtual("orderId").get(function () {
  return this._id.slice(-6).toUpperCase();
});

module.exports = model("Order", orderSchema);
