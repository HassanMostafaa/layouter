import * as React from "react";

export type LayouterProps<T = any> = {
  cols: number;
  items: T[];
  render: React.FC<{ item: T }> | ((props: { item: T }) => React.ReactNode);
  gap?: number;
  getId?: (item: T) => string | number;
  getHeight?: (item: T) => number;
  estimateHeight?: (item: T) => number;
  mediaHeight?: number;
  breakpoints?: {
    [width: number]: {
      cols: number;
    };
  };
};

// Recursive function to estimate the total text length in an item
function estimateTextLengthFromItem(item: any): number {
  let length = 0;

  if (typeof item === "string") return item.length;

  if (Array.isArray(item)) {
    return item.reduce((acc, val) => acc + estimateTextLengthFromItem(val), 0);
  }

  if (typeof item === "object" && item !== null) {
    for (const key in item) {
      length += estimateTextLengthFromItem(item[key]);
    }
  }

  return length;
}

// Estimate height from text length and optional media
function estimateHeightFromItem(item: any, mediaHeight?: number): number {
  const textLength = estimateTextLengthFromItem(item);
  const baseHeight = 40 + textLength * 0.35;
  return mediaHeight ? baseHeight + mediaHeight : baseHeight;
}

export default function Layouter<T>({
  cols,
  items,
  render: RenderItem,
  gap = 16,
  getId,
  getHeight,
  estimateHeight,
  mediaHeight,
  breakpoints,
}: LayouterProps<T>) {
  const [currentCols, setCurrentCols] = React.useState(cols);

  React.useEffect(() => {
    function handleResize() {
      if (!breakpoints) return setCurrentCols(cols);

      const width = window.innerWidth;
      const matchingBreakpoint = Object.keys(breakpoints)
        .map(Number)
        .sort((a, b) => a - b)
        .reverse()
        .find((bp) => width >= bp);

      if (matchingBreakpoint) {
        setCurrentCols(breakpoints[matchingBreakpoint].cols);
      } else {
        setCurrentCols(cols);
      }
    }

    if (typeof window !== "undefined") {
      handleResize();
      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }

    // Return a noop function in case it's running in a non-window env (like SSR)
    return () => {};
  }, [breakpoints, cols]);

  const colItems: any[][] = Array.from({ length: currentCols }, () => []);
  const colHeights: number[] = Array.from({ length: currentCols }, () => 0);

  items.forEach((item) => {
    const height =
      getHeight?.(item) ??
      estimateHeight?.(item) ??
      estimateHeightFromItem(item, mediaHeight);

    const shortestColIndex = colHeights.indexOf(Math.min(...colHeights));
    colItems[shortestColIndex]!.push(item);
    colHeights[shortestColIndex]! += height;
  });

  return (
    <div style={{ display: "flex", gap }}>
      {colItems.map((column, colIndex) => (
        <div
          key={`col-${colIndex}`}
          style={{ flex: 1, display: "flex", flexDirection: "column", gap }}
        >
          {column.map((item, i) => (
            <RenderItem
              key={`col-${colIndex}id-${
                getId?.(item) ?? item.id ?? `index-${i}`
              }`}
              item={item}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
