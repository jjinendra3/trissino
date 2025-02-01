import axios from "axios";
const dotenv=require("dotenv");
dotenv.config();
export async function upload(base:string) {
    const formdata = new FormData();    
    formdata.append("image", base);
    formdata.append("key", process.env.API);
    const response=await axios.post("https://api.imgbb.com/1/upload", formdata, {});
    return response;
}