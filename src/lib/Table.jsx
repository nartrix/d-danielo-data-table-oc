/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState }  from "react";
import './style.css';

const Table = ({ data }) => {
  const [tableHeaders, setTableHeaders] = useState(
    data.length ? Object.keys(data[0]) : []
  );
  const [sortOrder, setSortOrder] = useState({});
  const [numberOfRowsDisplayed, setNumberOfRowsDisplayed] = useState(2);
  const [searchWord, setSearchWord] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortedData, setSortedData] = useState(
    data.length ? data.slice(0, numberOfRowsDisplayed) : []
  );

  const totalPages = Math.ceil(data.length / numberOfRowsDisplayed);

  const handleSort = (column) => {
    const sortDirection = sortOrder[column] === "asc" ? "desc" : "asc";
    const sorted = data.sort((a, b) => {
      if (a[column] < b[column]) {
        return sortDirection === "asc" ? -1 : 1;
      }
      if (a[column] > b[column]) {
        return sortDirection === "asc" ? 1 : -1;
      }
      return 0;
    });
    setSortOrder({ [column]: sortDirection });
    setSortedData(sorted.slice(0, numberOfRowsDisplayed));
  };

  const handleSearch = (event) => {
    const searchedWord = event.target.value;
    setSearchWord(searchedWord);
    const filtered = data.filter((item) =>
      Object.values(item).some((value) =>
        value.toString().toLowerCase().includes(searchedWord.toLowerCase())
      )
    );
    setSortedData(filtered);
  };

  const handleNumberOfRowsDisplayed = (event) => {
    const selectedValue = parseInt(event.target.value);
    const sliced = data.slice(0, selectedValue);
    setNumberOfRowsDisplayed(selectedValue);
    setSortedData(sliced);
    setCurrentPage(1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      const start = (currentPage - 2) * numberOfRowsDisplayed;
      const end = start + numberOfRowsDisplayed;
      setSortedData(data.slice(start, end));
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      const start = currentPage * numberOfRowsDisplayed;
      const end = start + numberOfRowsDisplayed;
      setSortedData(data.slice(start, end));
    }
  };

  const handleInputPage = (event) => {
    event.preventDefault();
    const inputValue = parseInt(event.target.value);
    if (inputValue > 0 && inputValue <= totalPages) {
      setCurrentPage(inputValue);
      const start = (inputValue - 1) * numberOfRowsDisplayed;
      const end = start + numberOfRowsDisplayed;
      setSortedData(data.slice(start, end));
    }
  };

  return (
    <div className="allTable">
      <div className="accessoriesDisplay">
        <div className="numberOfPagesSelector">
          <p>Show</p>
          <select
            value={numberOfRowsDisplayed}
            onChange={handleNumberOfRowsDisplayed}
            className="selectEntriesAndSearchBarInput"
          >
            <option value="2">2</option>
            <option value="4">4</option>
            <option value="6">6</option>
          </select>
          <p>entries</p>
        </div>
        <div className="searchBar">
          <p>Search:</p>
          <input
            type="text"
            value={searchWord}
            onChange={handleSearch}
            className="selectEntriesAndSearchBarInput"
          />
        </div>
      </div>
      <table>
        <thead>
          <tr>
            {tableHeaders.map((column) => (
              <th key={column} onClick={() => handleSort(column)}>
                {column}
                {sortOrder[column] === "asc" ? (
                  <span>&#9650;</span>
                ) : (
                  <span>&#9660;</span>
                )}
              </th>
            ))}
          </tr>
        </thead>
        {sortedData && sortedData.length > 0 ? (
          <tbody>
            {sortedData.map((item, index) => (
              <tr key={index}>
                {Object.keys(item).map((key) => (
                  <td key={key}>{item[key]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        ) : (
          <tbody>
            <tr>
              <td colSpan={tableHeaders.length}>
                There is no data to display.
              </td>
            </tr>
          </tbody>
        )}
      </table>
      <div className="accessoriesDisplay">
        <div className="showingEntriesText">
          Showing {currentPage} to {totalPages} of {totalPages} entries
        </div>
        <div className="pagesChanger">
          <button onClick={() => handlePrevPage()}>Previous</button>
          <input
            type="text"
            placeholder={currentPage}
            value={currentPage}
            onChange={handleInputPage}
          />
          <button onClick={() => handleNextPage()}>Next</button>
        </div>
      </div>
    </div>
  );
};

Table.defaultProps = {
  data: JSON,
};

export default Table;