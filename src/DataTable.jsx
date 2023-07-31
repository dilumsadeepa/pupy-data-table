import React, { useState } from 'react';
import jsPDF from 'jspdf';
import * as XLSX from 'xlsx';

const DataTable = ({ columns, data, onEditRow, onViewRow, onDeleteRow }) => {
    const [filteredData, setFilteredData] = useState(data);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    //   const [showModal, setShowModal] = useState(false);
    //   const [formData, setFormData] = useState({});

    const handleSearch = (event) => {
        const term = event.target.value.trim().toLowerCase();
        setSearchTerm(term);

        const filteredData = data.filter(
            (row) =>
                columns.some(
                    (col) =>
                        row[col.dataKey].toString().toLowerCase().includes(term)
                )
        );
        setFilteredData(filteredData);
    };

    //   const handleEditRow = (index) => {
    //     setShowModal(true);
    //     // setFormData(filteredData[index]);
    //   };

    //   const handleViewRow = (index) => {
    //     // Implement view logic here
    //   };

    const generatePDFContent = () => {
        const pdf = new jsPDF();
        const columnHeaders = columns.map((col) => col.label);

        pdf.setFontSize(12);

        columnHeaders.forEach((header, index) => {
            pdf.text(20 + 60 * index, 20, header);
        });

        filteredData.forEach((row, rowIndex) => {
            const rowData = columns.map((col) => row[col.dataKey].toString());
            rowData.forEach((data, colIndex) => {
                pdf.text(20 + 60 * colIndex, 30 + 10 * (rowIndex + 1), data);
            });
        });

        return pdf;
    };

    const downloadAsPDF = () => {
        const pdf = generatePDFContent();
        pdf.save('data_table.pdf');
    };

    const generateCSVContent = () => {
        const columnHeaders = columns.map((col) => col.label);
        let csvContent = columnHeaders.join(",") + "\n";

        filteredData.forEach((row) => {
            const rowData = columns.map((col) => row[col.dataKey]);
            csvContent += rowData.join(",") + "\n";
        });

        return csvContent;
    };

    const downloadAsCSV = () => {
        const csvContent = generateCSVContent();
        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });

        if (navigator.msSaveBlob) {
            navigator.msSaveBlob(blob, "data_table.csv");
        } else {
            const link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            link.download = "data_table.csv";
            link.click();
        }
    };

    const generateExcelContent = () => {
        const columnHeaders = columns.map((col) => col.label);
        const excelContent = [columnHeaders];

        filteredData.forEach((row) => {
            const rowData = columns.map((col) => row[col.dataKey]);
            excelContent.push(rowData);
        });

        return excelContent;
    };

    const downloadAsExcel = () => {
        const excelContent = generateExcelContent();
        const worksheet = XLSX.utils.aoa_to_sheet(excelContent);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Data Table");
        XLSX.writeFile(workbook, "data_table.xlsx");
    };

    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentRows = filteredData.slice(indexOfFirstRow, indexOfLastRow);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleEditButtonClick = (index) => {
        if (onEditRow) {
            onEditRow(filteredData[index]);
        }
    };

    // Function to handle view button click
    const handleViewButtonClick = (index) => {
        if (onViewRow) {
            onViewRow(filteredData[index]);
        }
    };

    const handleDeleteButtonClick = (index) => {
        if (onDeleteRow) {
            onDeleteRow(filteredData[index]);
        }
    };

    //   const handleCloseModal = () => {
    //     setShowModal(false);
    //   };

    //   const handleFormChange = (event) => {
    //     const { name, value } = event.target;
    //     setFormData({
    //       ...formData,
    //       [name]: value,
    //     });
    //   };

    //   const handleSaveChanges = () => {
    //     const updatedData = filteredData.map((row, index) => {
    //       if (index === indexOfFirstRow + editRowIndex) {
    //         return { ...row, ...formData };
    //       }
    //       return row;
    //     });

    //     setFilteredData(updatedData);
    //     setShowModal(false);
    //   };

    const renderPagination = () => {
        const pageNumbers = Math.ceil(filteredData.length / rowsPerPage);
        return (
            <ul className="pagination">
                {Array.from({ length: pageNumbers }, (_, index) => index + 1).map(
                    (pageNumber) => (
                        <li
                            key={pageNumber}
                            className={`page-item ${currentPage === pageNumber ? "active" : ""
                                }`}
                        >
                            <button
                                className="page-link"
                                onClick={() => handlePageChange(pageNumber)}
                            >
                                {pageNumber}
                            </button>
                        </li>
                    )
                )}
            </ul>
        );
    };

    return (
        <div className="container mt-5 mb-5">
            <div className="d-flex justify-content-between mb-3">
                <div>
                    <button
                        className="btn btn-primary mr-3"
                        onClick={downloadAsPDF}
                    >
                        Download as PDF
                    </button>
                    <button className="btn btn-primary mr-3" onClick={downloadAsCSV}>
                        Download as CSV
                    </button>
                    <button className="btn btn-primary mr-3" onClick={downloadAsExcel}>
                        Download as Excel
                    </button>
                </div>
                <div className="form-inline ml-3">
                    <label className="mr-2">Rows per page:</label>
                    <select
                        className="form-control"
                        value={rowsPerPage}
                        onChange={(e) => setRowsPerPage(Number(e.target.value))}
                    >
                        <option>5</option>
                        <option>10</option>
                        <option>25</option>
                        <option>50</option>
                    </select>
                </div>
                <div className="search-container">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search"
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                </div>
            </div>

            <div className="table-responsive">
                <table className="table table-bordered table-hover">
                    <thead className="thead-dark">
                        <tr>
                            {columns.map((col) => (
                                <th key={col.dataKey}>{col.label}</th>
                            ))}
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentRows.map((row, index) => (
                            <tr key={index}>
                                {columns.map((col) => (
                                    <td key={col.dataKey}>{row[col.dataKey]}</td>
                                ))}
                                <td>
                                    <button
                                        className="btn btn-primary btn-sm mr-2"
                                        onClick={() => handleEditButtonClick(index)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="btn btn-secondary btn-sm"
                                        onClick={() => handleViewButtonClick(index)}
                                    >
                                        View
                                    </button>
                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => handleDeleteButtonClick(index)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="pagination-container d-flex justify-content-end mt-3">
                {renderPagination()}
            </div>

            {/* Modal for editing row
            {showModal && (
                <div
                    className="modal"
                    tabIndex="-1"
                    role="dialog"
                    style={{ display: 'block' }}
                >
                    
                </div>
            )} */}
        </div>
    );
};

export default DataTable;
