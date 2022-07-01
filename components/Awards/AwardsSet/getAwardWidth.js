const getAwardWidth = (bodyWidth) => {
  if (bodyWidth <= 230) return bodyWidth;
  else if (bodyWidth <= 400) return (bodyWidth - 10) / 2;
  else if (bodyWidth <= 600) return (bodyWidth - 20) / 3;
  else if (bodyWidth <= 700) return (bodyWidth - 30) / 4;
  else if (bodyWidth <= 850) return (bodyWidth - 40) / 5;
  return (bodyWidth - 50) / 6;
}

export default getAwardWidth
