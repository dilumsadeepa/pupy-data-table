# pupy-data-table
The react js data table to work easily.


<h1>DataTable Package</h1>

The DataTable package is a reusable React component that provides a customizable and interactive data table. It allows you to display tabular data, perform searches, pagination, and export data in various formats.

<h2>Installation</h2>

To use the DataTable component in your React project, you can install it via npm:

  <code>npm install my-datatable</code>
  
<h2>Usage</h2>
<code>
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
</code>

<h2>Props</h2>

<h3>columns: </h3> An array of column definitions. Each column should have a label and a corresponding data key.

<h3>data: </h3> An array of data objects representing the rows to be displayed in the table.

<h3>onEditRow: </h3> A function that will be called when the "Edit" button is clicked for a row.

<h3>onViewRow: </h3> A function that will be called when the "View" button is clicked for a row.

<h3>onDeleteRow: </h3> A function that will be called when the "Delete" button is clicked for a row.


<h2>Exporting Data</h2>

The DataTable component allows you to export the data in different formats such as PDF, CSV, and Excel. Use the respective buttons provided to trigger the export.


<h2>Pagination</h2>

By default, the DataTable shows 5 rows per page. You can change the number of rows per page using the dropdown menu.


<h2>Searching</h2>

The DataTable provides a search box to filter rows based on the entered search term.


<h2>License</h2>

This package is open-source and available under the MIT License.
