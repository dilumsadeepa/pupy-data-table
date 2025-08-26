# 📝 pupy-data-table

A lightweight, flexible JavaScript DataTable component with **search**, **pagination**, and **rows-per-page selector**.  
Works with **plain JavaScript**, no dependencies. Use via **npm** or **CDN**.

---

## 🚀 Features
- 🔍 Client-side search  
- 📑 Pagination  
- 📊 Rows-per-page selector  
- 🎨 Minimal default styles (customizable)  
- 🔌 Supports static arrays or async data functions  

---

### home page
https://github.com/dilumsadeepa/pupy-data-table

## 📦 Installation

### NPM
```bash
npm install pupy-data-table

```

### Import and use in your project:
```bash
import DataTable from "pupy-data-table";
```

### CDN

Just include it directly in your HTML:

```bash
<script src="https://unpkg.com/pupy-data-table/dist/datatable.umd.js"></script>

```

## Usage

### Basic Example (Static Data)


 
```bash
<div id="tableHeader"></div>
<table id="myTable" class="d-table"></table>
<div id="tableFooter"></div>

<script>
  const table = new DataTable("#myTable", {
    tableHeader: "#tableHeader",
    tableFooter: "#tableFooter",
    columns: [
      { key: "title", label: "Title" },
      { key: "category", label: "Category" },
      { key: "price", label: "Price" }
    ],
    data: [
      { title: "Wireless Mouse", category: "Electronics", price: "$15" },
      { title: "Leather Wallet", category: "Accessories", price: "$25" },
      { title: "Sports Shoes", category: "Footwear", price: "$45" },
      { title: "Bluetooth Speaker", category: "Electronics", price: "$30" }
    ]
  });
</script>
```

### Async Example (Fetch Data)

You can also use a function that returns data (useful for APIs):

```bash
const table = new DataTable("#myTable", {
  tableHeader: "#tableHeader",
  tableFooter: "#tableFooter",
  columns: [
    { key: "product", label: "Product", render: row => `<strong>${row.name}</strong>` },
    { key: "stock", label: "Stock" },
    { key: "rating", label: "Rating" }
  ],
  data: async ({ page, per_page, q }) => {
    // Fake API call
    const allData = [
      { product: "Gaming Laptop", stock: 12, rating: "⭐⭐⭐⭐" },
      { product: "Desk Lamp", stock: 30, rating: "⭐⭐⭐" },
      { product: "Backpack", stock: 18, rating: "⭐⭐⭐⭐⭐" },
      { product: "Smart Watch", stock: 10, rating: "⭐⭐⭐⭐" }
    ];

    const filtered = q
      ? allData.filter(row =>
          Object.values(row).some(v =>
            String(v).toLowerCase().includes(q.toLowerCase())
          )
        )
      : allData;

    const start = (page - 1) * per_page;
    const end = start + per_page;

    return {
      rows: filtered.slice(start, end),
      total: filtered.length
    };
  }
});

```

## ⚙️ Options

| Option                  | Type                             | Default | Description                                                                       |
| ----------------------- | -------------------------------- | ------- | --------------------------------------------------------------------------------- |
| `columns`               | `Array<{ key, label, render? }>` | `[]`    | Defines the table columns. `render(row)` lets you customize cell content.         |
| `data`                  | `Array` or `Function`            | `[]`    | Data source: either a static array or async function returning `{ rows, total }`. |
| `tableHeader`           | `string` (selector)              | `null`  | Element to render search & per-page controls.                                     |
| `tableFooter`           | `string` (selector)              | `null`  | Element to render pagination.                                                     |
| `perPage`               | `number`                         | `10`    | Default rows per page.                                                            |
| `enablePaginate`        | `boolean`                        | `true`  | Enable/disable pagination.                                                        |
| `enableSearch`          | `boolean`                        | `true`  | Enable/disable search.                                                            |
| `enablePerPageSelector` | `boolean`                        | `true`  | Enable/disable per-page dropdown.                                                 |


## License

This package is open-source and available under the MIT License.
