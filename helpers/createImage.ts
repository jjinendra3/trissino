import { createCanvas } from "canvas";
import { Battle } from "../utils/types";
import { drawWrappedText } from "./textWriting";
const fs = require("fs");
const text = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
//Character Limit of the assignment
export const imageCreator = async ({ competitors, fields }: Battle) => {
  const columns = ["Anchor", ...competitors];

  const cols = columns.length;
  const rows = fields.length;
  const cellWidth = 1280 / (cols + 1);
  const cellHeight = 720 / rows;
  const minWidth = 1280;
  const minHeight = 720;

  let width = minWidth;
  let height = minHeight;

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
  await ctx.fillText("Headings", 20, 20);
  fields.forEach((field, i) => {
    ctx.fillText(field, 20, i * cellHeight + 50);
  });
  columns.forEach((comp, i) => {
    ctx.fillText(comp, (i + 1) * cellWidth + 10, 20);
  });
  let fixFontSize = [];
  columns.forEach((comp, i) => {
    fields.forEach((field, j) => {
      drawWrappedText(
        ctx,
        text,
        (i + 1) * cellWidth + 5,
        j == 0 ? j * cellHeight + 40 : j * cellHeight + 10,
        cellWidth - 5,
        cellHeight - 20,
        fixFontSize,
      );
    });
  });

  const base64Image = canvas.toDataURL("image/png");
  let base64Imag = base64Image.split(";base64,").pop();
  await fs.writeFileSync(
    "image.png",
    base64Imag,
    { encoding: "base64" },
    function (err) {
    },
  );
  return {base64Imag,base64Image};
};
