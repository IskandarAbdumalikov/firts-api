const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json());


const Users = require("./routes/users");
const Products = require("./routes/products");


app.use("/products", Products);
app.use("/users", Users);

const PORT = 8000;

app.listen(PORT, () => console.log(`server is running on port ${PORT}`));

