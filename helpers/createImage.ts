import { createCanvas } from "canvas";
import { Battle } from "../utils/types";
const fs = require("fs");
export const imageCreator = async({ competitors, fields }: Battle) => {
  const columns = ["Anchor", ...competitors];
  const rowsArray=[...fields]
  const cols = columns.length;
  const rows = rowsArray.length;
  const cellWidth = 1280/(cols+1);
   const cellHeight = 720/rows;
  const minWidth = 1280;
   const minHeight = 720;

  let width = minWidth;
  let height =  minHeight;

  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext("2d");

  ctx.fillStyle = "#FFFFFF";
  ctx.fillRect(0, 0, width, height);

  ctx.strokeStyle = "#000000";
  ctx.lineWidth = 2;
  for (let i = 0; i <= cols; i++) {
    ctx.moveTo(i * cellWidth, 0);
    ctx.lineTo(i * cellWidth, height);
  }
  ctx.moveTo(0, 25);
ctx.lineTo(width, 25);
  for (let i = 0; i <= rows; i++) {
    ctx.moveTo(0, i * cellHeight);
    ctx.lineTo(width, i * cellHeight);
  }
  ctx.stroke();

  ctx.fillStyle = "#000000";
  ctx.font = "16px Arial";
  await ctx.fillText("Headings", 20,20);
 
  rowsArray.forEach((field, i) => {
    ctx.fillText(field, 20, (i) * cellHeight +50);
  });
  columns.forEach((comp, i) => {
    ctx.fillText(comp, (i + 1) * cellWidth + 10, 20);
  });
  const base64Image = canvas.toDataURL("image/png");
  let base64Imag = base64Image.split(';base64,').pop();
  await fs.writeFileSync(
    "image.png",
    base64Imag,
    { encoding: "base64" },
    function (err) {
      console.log("File created");
    },
  );
};
