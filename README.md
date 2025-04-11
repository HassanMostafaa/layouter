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
- 🛠️ Utility functions for common tasks

## Environment Compatibility

This component is primarily designed for client-side use in React applications. While it doesn't use React hooks, it relies on client-side calculations for optimal layout and height estimation.

### Recommended Usage

- ✅ Client-side React applications
- ✅ Browser environments
- ✅ React 17+ and React 18+
- ✅ Next.js client components (with 'use client' directive)
- ✅ Client-side rendered pages

### Server Component Usage

For server components, you can use this component with the following considerations:

1. Add the 'use client' directive at the top of the file where you import and use the Layouter:

```tsx
"use client";
import Layouter from "react-broken-layouter";
```

2. Provide explicit heights via `getHeight` or `estimateHeight` props to ensure consistent layout:

```tsx
<Layouter
  cols={3}
  items={items}
  render={Item}
  getHeight={(item) => item.height} // Provide explicit heights
/>
```

### Not Recommended

- ❌ Server Components without 'use client' directive
- ❌ Server-side rendering without proper client-side hydration
- ❌ Static site generation without client-side JavaScript

### Considerations

- ⚠️ Height estimation is most accurate in client environments
- ⚠️ For server-side rendering, consider providing explicit heights via `getHeight` or `estimateHeight` props
- ⚠️ Dynamic content may require client-side re-rendering for optimal layout

## Installation

```bash
npm install react-broken-layouter
# or
yarn add react-broken-layouter
```

## Usage

### Basic Layout Usage

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

### Utility Functions

The library provides several utility functions that can be helpful in your application:

#### `heightEstimator`

Estimates the total height based on an array of strings or numbers. Useful for calculating content heights.

```tsx
import { heightEstimator } from "react-broken-layouter";

// Example usage
const content = ["Hello", "World", 100];
const estimatedHeight = heightEstimator(content);
// Returns: (5 * 0.35) + (5 * 0.35) + 100 = 103.5
```

#### `getRandomId`

Generates a random string ID. Useful for creating unique keys when none are provided.

```tsx
import { getRandomId } from "react-broken-layouter";

// Example usage
const uniqueId = getRandomId();
// Returns something like: "x7f9k2m"
```

#### `isObject`

Checks if a value is a plain object (not an array or null).

```tsx
import { isObject } from "react-broken-layouter";

// Example usage
isObject({}); // true
isObject([]); // false
isObject(null); // false
isObject("string"); // false
```

## Props

| Prop             | Type                            | Required | Default | Description                                             |
| ---------------- | ------------------------------- | -------- | ------- | ------------------------------------------------------- |
| `cols`           | number                          | Yes      | -       | Number of columns in the layout                         |
| `items`          | any[]                           | Yes      | -       | Array of items to be displayed                          |
| `render`         | React.FC<{ item: any }>         | Yes      | -       | Component to render each item                           |
| `gap`            | number                          | No       | 16      | Gap between items in pixels                             |
| `getId`          | (item: any) => string \| number | No       | -       | Function to get unique ID for each item                 |
| `getHeight`      | (item: any) => number           | No       | -       | Function to get exact height for an item (Experimental) |
| `estimateHeight` | (item: any) => number           | No       | -       | Custom function to estimate item height (Experimental)  |
| `mediaHeight`    | number                          | No       | -       | Additional height to account for media content          |

## Experimental Features

### Height Estimation

The height estimation features (`getHeight` and `estimateHeight`) are currently experimental and may be subject to change in future versions. These features provide ways to control the height of items in the layout:

- `getHeight`: Allows you to provide exact heights for items
- `estimateHeight`: Lets you implement custom height estimation logic

These features are still being refined and may not work perfectly in all scenarios. We recommend testing thoroughly with your specific use case.

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
