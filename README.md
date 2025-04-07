# Layouter

Layouter is a lightweight and flexible React utility that intelligently arranges components into a responsive, masonry-style layout using a column-based strategy. It supports dynamic content heights and is ideal for building Pinterest-like grids, content dashboards, and flexible multi-column interfaces.

---

## Features

- 📐 Dynamic column balancing based on item height
- 🧱 Supports 1 to 4 columns
- 🎨 Accepts any custom React component as a render prop
- 🧠 Optional `getHeight` and `getId` functions for data flexibility
- ⚡ Fast and minimal — no dependencies
- 💅 Fully customizable and styled by you

---

## Installation

```bash
npm install @your-namespace/layouter
```

or

```bash
yarn add @your-namespace/layouter
```

---

## Usage

```tsx
import { Layouter } from "@your-namespace/layouter";

const items = [
  { id: 1, title: "Card 1", height: 120 },
  { id: 2, title: "Card 2", height: 220 },
  { id: 3, title: "Card 3", height: 80 },
  // ... more items
];

const MyCard = ({ item }: { item: any }) => (
  <div style={{ height: item.height, background: "#f1f1f1", padding: 16 }}>
    <h4>{item.title}</h4>
  </div>
);

export default function MyPage() {
  return <Layouter cols={3} items={items} render={MyCard} gap={16} />;
}
```

---

## Props

### `cols: number` (required)

Number of columns to distribute items across (max: 4).

### `items: any[]` (required)

Array of items to render.

### `render: React.FunctionComponent<{ item: any }>` (required)

A React component or element that takes a single `item` prop and renders it.

### `gap?: number`

Spacing (in pixels) between columns and rows. Defaults to `16`.

### `getId?: (item: any) => string | number`

Optional function to extract a unique ID for each item (used as the React key).

### `getHeight?: (item: any) => number`

Optional function to extract the item height. If not provided, Layouter will use `item.height` directly.

---

## Example with JSX Render Prop

```tsx
<Layouter
  cols={2}
  items={data}
  getHeight={(item) => item.meta?.height}
  getId={(item) => item.uuid}
  render={(item) => (
    <div key={item.uuid} style={{ height: item.meta?.height }}>
      {item.title}
    </div>
  )}
/>
```

---

## How It Works

Layouter tracks the total height of each column and adds each new item to the shortest column available. This helps visually balance the layout even when items have varying heights. You can define the height either directly on the item (via `item.height`) or through a custom `getHeight` function.

---

## TypeScript Support

Layouter is fully typed and supports generics so you can strongly type your item data:

```tsx
interface MyCardData {
  id: string;
  title: string;
  height: number;
}

<Layouter<MyCardData>
  cols={3}
  items={myData}
  render={({ item }) => <MyCard item={item} />}
/>;
```

---

## Roadmap

- [ ] Auto-measure DOM heights (dynamic rendering)
- [ ] Drag-and-drop support
- [ ] SSR-safe dynamic layout (e.g., for Next.js)

---

## License

MIT © YourName or YourOrg
