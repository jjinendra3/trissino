const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 5000;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
import { FIELD_TYPES } from "./utils/constants";
import { type Battle } from "./utils/types";

app.post("/start", async (req, res) => {
  try {
    const { competitors, fields, options }:Battle = req.body;
    if(!fields.every(field => FIELD_TYPES.includes(field))){
        return res.status(400).send("Invalid field type");
    }
    if(!competitors || competitors.length === 0) {
        return res.status(400).send("Invalid competitors");
    }

    return res.status(200).json(req.body);
  } catch (error) {
    return res.status(500).send("Internal Server Error");
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
