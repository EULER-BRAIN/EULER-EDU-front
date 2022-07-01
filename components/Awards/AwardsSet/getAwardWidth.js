const getAwardWidth = (bodyWidth) => {
  if (bodyWidth <= 170) return bodyWidth;
  else if (bodyWidth <= 340) return (bodyWidth - 10) / 2;
  else if (bodyWidth <= 510) return (bodyWidth - 20) / 3;
  else if (bodyWidth <= 680) return (bodyWidth - 30) / 4;
  else if (bodyWidth <= 850) return (bodyWidth - 40) / 5;
  return (bodyWidth - 50) / 6;
}

export default getAwardWidth
