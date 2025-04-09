import * as React from "react";

export type LayouterProps = {
  cols: number;
  items: any[];
  render: React.FC<{ item: any }>;
  gap?: number;
  getId?: (item: any) => string | number;
  getHeight?: (item: any) => number;
  estimateHeight?: (item: any) => number;
  mediaHeight?: number;
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
  const baseHeight = 180 + textLength * 0.35;
  return mediaHeight ? baseHeight + mediaHeight : baseHeight;
}

export default function Layouter({
  cols,
  items,
  render: RenderItem,
  gap = 16,
  getId,
  getHeight,
  estimateHeight,
  mediaHeight,
}: LayouterProps) {
  // Step 1: Setup columns and height trackers
  const colItems: any[][] = Array.from({ length: cols }, () => []);
  const colHeights: number[] = Array.from({ length: cols }, () => 0);

  // Step 2: Distribute itemsl
  items.forEach((item, i) => {
    const height =
      getHeight?.(item) ??
      estimateHeight?.(item) ??
      estimateHeightFromItem(item, mediaHeight);

    const shortestColIndex = colHeights.indexOf(Math.min(...colHeights));

    colItems[shortestColIndex]!.push(item);
    colHeights[shortestColIndex]! += height;
  });

  // Step 3: Render columns
  return (
    <div style={{ display: "flex", gap }}>
      {colItems.map((column, colIndex) => (
        <div
          key={`col-${colIndex}`}
          style={{ flex: 1, display: "flex", flexDirection: "column", gap }}
        >
          {column.map((item, i) => (
            <>
              <RenderItem
                key={`col-${colIndex}id-${
                  getId?.(item) ?? item.id ?? `index-${i}`
                }`}
                item={item}
              />
            </>
          ))}
        </div>
      ))}
    </div>
  );
}
