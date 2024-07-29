const { users } = require("../server");
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  if (!users.length) {
    return res.status(404).json({
      msg: "Users not found",
      variant: "error",
      payload: null,
    });
  }
  res.status(200).json({
    msg: "Users successfully found",
    variant: "success",
    payload: users,
    total: users.length,
  });
});

router.post("/", (req, res) => {
  const { fname, username, password } = req.body;
  if (users.find((item) => item.username === username)) {
    return res.status(400).json({
      msg: "User already exists",
      variant: "warning",
      payload: null,
    });
  }
  users.push({ id: new Date().getTime(), fname, username, password });

  res.status(201).json({
    msg: "User successfully created",
    variant: "success",
    payload: users,
  });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const index = users.findIndex((item) => item.id === +id);
  if (index < 0) {
    return res.status(404).json({
      msg: "User not found",
      variant: "error",
      payload: null,
    });
  }
  users.splice(index, 1);
  res.status(200).json({
    msg: "User successfully deleted",
    variant: "success",
    payload: users,
  });
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const index = users.findIndex((item) => item.id === +id);
  if (index < 0) {
    return res.status(404).json({
      msg: "User not found",
      variant: "error",
      payload: null,
    });
  }
  const { fname, username, password } = req.body;

  users[index] = { id: +id, fname, username, password };
  res.status(200).json({
    msg: "User successfully updated",
    variant: "success",
    payload: users[index],
  });
});

module.exports = router;
