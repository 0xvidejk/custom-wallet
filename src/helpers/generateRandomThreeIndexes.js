export const generateRandomThreeIndexes = () => {
  const indexes = new Set();
  while (indexes.size < 3) {
    const randomIndex = Math.floor(Math.random() * 12);
    indexes.add(randomIndex);
  }
  return Array.from(indexes);
};
