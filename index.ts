import * as dayjs from 'dayjs'
import * as utc from 'dayjs/plugin/utc'
import * as timezone from 'dayjs/plugin/timezone'
dayjs.extend(utc)
dayjs.extend(timezone)
const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 5000;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
import { imageCreator } from "./helpers/createImage";
import { FIELD_TYPES } from "./utils/constants";
import { type Battle } from "./utils/types";
import { upload } from "./helpers/uploadImage";
app.head("/", (req, res) => {
  res.status(200).send("OK");
});

app.post("/start", async (req, res) => {
  try {
    const { competitors, fields, options }: Battle = req.body;
    if(!fields || fields.length === 0){
      return res.status(400).send("Invalid Fields Array");
    }
    if (!fields.every((field) => FIELD_TYPES.includes(field))) {
      return res.status(400).send("Invalid field type");
    }
    if (!competitors || competitors.length === 0 || competitors.length > 3) {
      return res.status(400).send("Invalid competitors");
    }
    const {base64Imag,base64Image} = await imageCreator({ competitors, fields });
    let response={
      image:base64Image,
      timeStamp:dayjs(new Date()).format('YYYY-MM-DD')
    }
    if (options) {
      if (options.format === "url") {
        const url=await upload(base64Imag);
        response.image=url.data.data.url;
      }
    }
    return res.status(200).send(response);
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal Server Error");
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
