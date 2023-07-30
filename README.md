# pupy-data-table
The react js data table works easily.


## DataTable Package

The DataTable package is a reusable React component that provides a customizable and interactive data table. It allows you to display tabular data, perform searches, pagination, and export data in various formats.

## Installation

To use the DataTable component in your React project, you can install it via npm:

  ```bash
npm install pupydatatable
```
  
## Usage
 
```bash
import React from 'react';
import DataTable from 'my-datatable';
  
const columns = [
    { label: 'Name', dataKey: 'name' },
    { label: 'Age', dataKey: 'age' },
    { label: 'Email', dataKey: 'email' },
    // Add more columns here...
];
  
const data = [
    { name: 'John Doe', age: 30, email: 'john@example.com' },
    { name: 'Jane Smith', age: 25, email: 'jane@example.com' },
    // Add more data here...
];
  
const handleEditRow = (rowData) => {
    // Implement the logic to edit the row data
};
  
const handleViewRow = (rowData) => {
    // Implement the logic to view the row data
};
  
const handleDeleteRow = (rowData) => {
    // Implement the logic to delete the row data
};
  
const App = () => {
    return (
      <div>
        <DataTable
          columns={columns}
          data={data}
          onEditRow={handleEditRow}
          onViewRow={handleViewRow}
          onDeleteRow={handleDeleteRow}
        />
      </div>
    );
};
  
export default App;
```


## Props

### columns: 
 An array of column definitions. Each column should have a label and a corresponding data key.

### data: 
 An array of data objects representing the rows to be displayed in the table.

### onEditRow: 
 A function that will be called when the "Edit" button is clicked for a row.

### onViewRow: 
 A function that will be called when the "View" button is clicked for a row.

### onDeleteRow: 
 A function that will be called when the "Delete" button is clicked for a row.


## Exporting Data

The DataTable component allows you to export the data in different formats such as PDF, CSV, and Excel. Use the respective buttons provided to trigger the export.


## Pagination

By default, the DataTable shows 5 rows per page. You can change the number of rows per page using the dropdown menu.


## Searching

The DataTable provides a search box to filter rows based on the entered search term.


## License

This package is open-source and available under the MIT License.
