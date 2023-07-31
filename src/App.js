

import DataTable from "./DataTable";


function App() {

  const columns = [
    { label: "Name", dataKey: "name" },
    { label: "Age", dataKey: "age" },
    { label: "Email", dataKey: "email" },
  ];

  const data = [
    { name: "John Doe", age: 30, email: "john@example.com" },
    { name: "Jane Smith", age: 25, email: "jane@example.com" },
    { name: "Benjamin Taylor", age: 27, email: "benjamin@example.com" },
    { name: "Samantha Hall", age: 28, email: "samantha@example.com" },
    { name: "Matthew Wilson", age: 29, email: "matthew@example.com" },
    { name: "Chloe Martinez", age: 25, email: "chloe@example.com" },
    { name: "Samuel Rodriguez", age: 26, email: "samuel@example.com" },
    { name: "Grace Lewis", age: 30, email: "grace@example.com" },
    { name: "David Harris", age: 31, email: "david@example.com" },
    { name: "Lily Lee", age: 22, email: "lily@example.com" },
    { name: "Christopher Davis", age: 33, email: "christopher@example.com" },
    { name: "Anna Johnson", age: 34, email: "anna@example.com" },
    // Add more data here...
  ];

  const handleEditRow = (rowData) => {
    // Implement the logic to open a modal for editing the row data
    console.log("Editing row:", rowData);
  };

  const handleViewRow = (rowData) => {
    // Implement the logic to open a modal for viewing the row data
    console.log("Viewing row:", rowData);
  };

  const handleDeleteRow = (rowData) => {
    // Implement the logic to open a modal for viewing the row data
    console.log("Deleteing row:", rowData);
  };


  return (
    <div className="App">
      <DataTable columns={columns} data={data} onEditRow={handleEditRow}
        onViewRow={handleViewRow} onDeleteRow={handleDeleteRow} />
    </div>
  );
}

export default App;
