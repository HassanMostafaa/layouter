# React Broken Layouter

A lightweight React utility for creating responsive masonry-style layouts with automatic height estimation and column distribution.

## Features

- 🎯 Simple and intuitive API
- 📱 Responsive column-based layout
- 📏 Automatic height estimation
- 🎨 Customizable gap between items
- 🔄 Support for dynamic content
- 🚀 Zero dependencies (except React)
- 📦 TypeScript support

## Installation

```bash
npm install react-broken-layouter
# or
yarn add react-broken-layouter
```

## Usage

```tsx
import Layouter from "react-broken-layouter";

// Example data
const items = [
  { id: 1, content: "Item 1" },
  { id: 2, content: "Item 2" },
  // ... more items
];

// Example render component
const Item = ({ item }) => (
  <div style={{ padding: "1rem", background: "#f0f0f0" }}>{item.content}</div>
);

function App() {
  return (
    <Layouter
      cols={3}
      items={items}
      render={Item}
      gap={16}
      getId={(item) => item.id}
    />
  );
}
```

## Props

| Prop             | Type                            | Required | Default | Description                                    |
| ---------------- | ------------------------------- | -------- | ------- | ---------------------------------------------- |
| `cols`           | number                          | Yes      | -       | Number of columns in the layout                |
| `items`          | any[]                           | Yes      | -       | Array of items to be displayed                 |
| `render`         | React.FC<{ item: any }>         | Yes      | -       | Component to render each item                  |
| `gap`            | number                          | No       | 16      | Gap between items in pixels                    |
| `getId`          | (item: any) => string \| number | No       | -       | Function to get unique ID for each item        |
| `getHeight`      | (item: any) => number           | No       | -       | Function to get exact height for an item       |
| `estimateHeight` | (item: any) => number           | No       | -       | Custom function to estimate item height        |
| `mediaHeight`    | number                          | No       | -       | Additional height to account for media content |

## How It Works

The Layouter component:

1. Estimates the height of each item based on content length
2. Distributes items across columns to maintain balanced heights
3. Renders items in a responsive grid layout

## Development

```bash
# Install dependencies
npm install

# Run development build
npm run dev

# Build for production
npm run build
```

## License

MIT © [Hassan Mohamed](https://github.com/HassanMostafaa)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
