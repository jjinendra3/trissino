const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 5000;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
import { imageCreator } from "./helpers/createImage";
import { uploadToImgur } from "./helpers/uploadImage";
import { FIELD_TYPES } from "./utils/constants";
import { type Battle } from "./utils/types";

app.post("/start", async (req, res) => {
  try {
    const { competitors, fields, options }: Battle = req.body;
    if (!fields.every((field) => FIELD_TYPES.includes(field))) {
      return res.status(400).send("Invalid field type");
    }
    if (!competitors || competitors.length === 0 || competitors.length > 3) {
      return res.status(400).send("Invalid competitors");
    }
    const imageBase64 = await imageCreator({ competitors, fields });
    if (options !== undefined) {
      console.log(options);
      if (options.format === "url") {
        console.log("Uploading image to storage");
      }
    }
    return res.status(200).send(imageBase64);
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal Server Error");
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
