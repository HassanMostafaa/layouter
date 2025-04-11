# React Broken Layouter

A lightweight React utility for creating responsive masonry-style layouts with automatic height estimation and column distribution.

## Table of Contents

- [Features](#features)
- [Environment Compatibility](#environment-compatibility)
  - [Recommended Usage](#recommended-usage)
  - [Server Component Usage](#server-component-usage)
  - [Not Recommended](#not-recommended)
  - [Considerations](#considerations)
- [Installation](#installation)
- [Usage](#usage)
  - [Basic Example](#basic-example)
  - [Custom Render](#custom-render)
- [Responsive Layout with `breakpoints`](#responsive-layout-with-breakpoints)
- [Props](#props)
- [Utility Functions](#utility-functions)
- [Experimental Features](#experimental-features)
- [How It Works](#how-it-works)
- [Development](#development)
- [License](#license)
- [Contributing](#contributing)

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

To use this component with server components in frameworks like Next.js, follow these guidelines:

- Use the `'use client'` directive at the top of the file where you import and use the Layouter:

  ```tsx
  "use client";
  import Layouter from "react-broken-layouter";
  ```

- Provide explicit heights via `getHeight` or `estimateHeight` props to ensure consistent layout:
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

### Basic Example

A simple setup with a fixed number of columns:

```tsx
import Layouter from "react-broken-layouter";

const items = [
  { id: 1, content: "Item 1" },
  { id: 2, content: "Item 2" },
  // ...
];

const Item = ({ item }) => (
  <div style={{ padding: "1rem", background: "#f0f0f0" }}>{item.content}</div>
);

export default function App() {
  return (
    <Layouter
      cols={3} // Fixed column count
      items={items}
      render={Item} // Render component
      gap={16} // Space between items
      getId={(item) => item.id} // Unique key for each item
    />
  );
}
```

### Custom Render

You can provide a custom render function that returns a component to display each item. The function receives an `item` prop, which you can pass to your component:

```tsx
const YourComponent = ({ item }) => (
  <div style={{ padding: "1rem", background: "#e0e0e0" }}>{item.content}</div>
);

<Layouter
  cols={3} // Fixed column count
  items={items}
  render={(props) => <YourComponent {...props} />} // Custom render function
  gap={16} // Space between items
  getId={(item) => item.id} // Unique key for each item
/>;
```

> **Note**: The `render` prop expects a component that accepts an `item` prop. Using a function allows dynamic rendering while maintaining compatibility.

## Responsive Layout with `breakpoints`

Use the `breakpoints` prop to override the default `cols` value based on screen width, ideal for responsive layouts:

```tsx
<Layouter
  cols={1} // Default to 1 column (e.g., for mobile)
  items={items}
  render={Item}
  gap={16}
  getId={(item) => item.id}
  breakpoints={{
    768: { cols: 2 },
    1024: { cols: 3 },
    1440: { cols: 4 },
  }}
/>
```

This dynamically sets:

- 1 column below 768px (using `cols`)
- 2 columns from 768px to 1023px
- 3 columns from 1024px to 1439px
- 4 columns at 1440px and above

## Props

| Prop             | Type                                  | Required | Default | Description                                                             |
| ---------------- | ------------------------------------- | :------: | :-----: | ----------------------------------------------------------------------- |
| `cols`           | number                                |    ✅    |    -    | Default number of columns (overridden by `breakpoints` if provided)     |
| `breakpoints`    | { [width: number]: { cols: number } } |    ❌    |    -    | Map of viewport widths to column counts for responsive behavior         |
| `items`          | any[]                                 |    ✅    |    -    | List of items to display                                                |
| `render`         | React.FC<{ item: any }>               |    ✅    |    -    | Component to render each item (can be a function returning a component) |
| `gap`            | number                                |    ❌    |   16    | Gap between items (px)                                                  |
| `getId`          | (item: any) => string \| number       |    ❌    |    -    | Optional function to get unique ID for each item                        |
| `getHeight`      | (item: any) => number                 |    ❌    |    -    | Exact item height (for layout optimization)                             |
| `estimateHeight` | (item: any) => number                 |    ❌    |    -    | Estimate item height if exact value isn't available                     |
| `mediaHeight`    | number                                |    ❌    |    -    | Additional height buffer (e.g., for images or media content)            |

## Utility Functions

These utility functions simplify common tasks like height estimation and ID generation:

- **`heightEstimator`**  
  Estimates the total height based on an array of strings or numbers. Useful for calculating content heights.

  ```tsx
  import { heightEstimator } from "react-broken-layouter";

  // Example usage
  const content = ["Hello", "World", 100];
  const estimatedHeight = heightEstimator(content);
  // Returns: (5 * 0.35) + (5 * 0.35) + 100 = 103.5
  ```

- **`getRandomId`**  
  Generates a random string ID. Useful for creating unique keys when none are provided.

  ```tsx
  import { getRandomId } from "react-broken-layouter";

  // Example usage
  const uniqueId = getRandomId();
  // Returns something like: "x7f9k2m"
  ```

- **`isObject`**  
  Checks if a value is a plain object (not an array or null).

  ```tsx
  import { isObject } from "react-broken-layouter";

  // Example usage
  isObject({}); // true
  isObject([]); // false
  isObject(null); // false
  isObject("string"); // false
  ```

## Experimental Features

> **Note**: These features are experimental and may not work perfectly in all scenarios. Test thoroughly with your use case.

### Height Estimation

The height estimation features (**`getHeight`** and **`estimateHeight`**) are currently experimental and may be subject to change in future versions. These features provide ways to control the height of items in the layout:

- **`getHeight`**: Allows you to provide exact heights for items
- **`estimateHeight`**: Lets you implement custom height estimation logic

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

MIT © [Hassan Mohamed](https://github.com/HassanMostafa)

## Contributing

We’d love to improve React Broken Layouter with your help! Contributions are welcome—please feel free to submit a Pull Request or open an issue to discuss your ideas.
