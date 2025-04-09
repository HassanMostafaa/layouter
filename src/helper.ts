const heightEstimator = (items: (string | number)[]): number => {
  let totalHeight: number = 0;
  items.forEach((item: string | number) => {
    if (typeof item === "string") {
      totalHeight += item.length * 0.35;
    } else if (typeof item === "number") {
      totalHeight += item;
    }
  });
  return totalHeight;
};

export { heightEstimator };
