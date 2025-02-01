export function drawWrappedText(
  ctx,
  text,
  x,
  y,
  maxWidth,
  maxHeight,
  fixFontSize,
  fontSize = 20,
) {
  let words = text.split(" ");
  let lines = [];
  let line = "";
  if (fixFontSize.length !== 0) {
    fontSize = fixFontSize[0];
  }
  ctx.font = `${fontSize}px Arial`;

  for (let word of words) {
    let testLine = line + word + " ";
    let testWidth = ctx.measureText(testLine).width;
    if (testWidth > maxWidth && line !== "") {
      lines.push(line);
      line = word + " ";
    } else {
      line = testLine;
    }
  }
  lines.push(line);

  let lineHeight = fontSize * 1.2;
  if (lines.length * lineHeight + 10 > maxHeight) {
    console.log("Text does not fit in the box");
    return drawWrappedText(
      ctx,
      text,
      x,
      y,
      maxWidth,
      maxHeight,
      fixFontSize,
      fontSize - 1,
    );
  } else {
    fixFontSize[0] = fontSize;
  }

  ctx.fillStyle = "black";
  ctx.textAlign = "center";

  let startY = y + (maxHeight - lines.length * lineHeight) / 2;
  for (let i = 0; i < lines.length; i++) {
    ctx.fillText(lines[i], x + maxWidth / 2, startY + i * lineHeight);
  }
}
