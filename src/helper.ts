export const heightEstimator = (items: (string | number)[]): number => {
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

export function getRandomId(): string {
  return Math.random().toString(36).substring(2, 9);
}

export function isObject(item: any): boolean {
  return item && typeof item === "object" && !Array.isArray(item);
}
