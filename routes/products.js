const { products } = require("../server");
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  if (!products.length) {
    return res.status(404).json({
      msg: "Products not found",
      variant: "error",
      payload: null,
    });
  }
  res.status(200).json({
    msg: "Products successfully found",
    variant: "success",
    payload: products,
    total: products.length,
  });
});

router.post("/", (req, res) => {
  const { title, category, price, url } = req.body;
  if (products.find((item) => item.title === title)) {
    return res.status(400).json({
      msg: "Product title already exists",
      variant: "warning",
      payload: null,
    });
  }
  products.push({ id: new Date().getTime(), title, category, price, url });

  res.status(201).json({
    msg: "Product successfully created",
    variant: "success",
    payload: products,
  });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const index = products.findIndex((item) => item.id === +id);
  if (index < 0) {
    return res.status(404).json({
      msg: "Product not found",
      variant: "error",
      payload: null,
    });
  }
  products.splice(index, 1);
  res.status(200).json({
    msg: "Product successfully deleted",
    variant: "success",
    payload: products,
  });
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const index = products.findIndex((item) => item.id === +id);
  if (index < 0) {
    return res.status(404).json({
      msg: "Product not found",
      variant: "error",
      payload: null,
    });
  }
  const { title, category, price, url } = req.body;

  products[index] = { id: +id, title, category, price, url };
  res.status(200).json({
    msg: "Product successfully updated",
    variant: "success",
    payload: products[index],
  });
});

module.exports = router;
