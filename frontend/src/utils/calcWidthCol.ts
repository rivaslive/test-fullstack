export default function calcWidthCol(colWidth: number, colNumber = 24) {
  const col = 100 / (colNumber / colWidth);

  return col.toFixed(4);
}
