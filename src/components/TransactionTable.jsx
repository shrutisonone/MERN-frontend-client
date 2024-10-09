import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import Statistics from './statistics'; 
import BarChart from './barChart';     

function TransactionTable() {
  const [transactions, setTransactions] = useState([]);
  const [month, setMonth] = useState('03'); // Default March
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1); // For pagination
  const [totalPages, setTotalPages] = useState(1); // Total number of pages
  const itemsPerPage = 10; // Number of items per page

  const fetchTransactions = useCallback(async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/transactions`, {
        params: {
          month,
          search,
          page,
          perPage: itemsPerPage
        }
      });
      setTransactions(response.data.transactions);
      setTotalPages(response.data.totalPages); // Total pages from API
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  }, [month, search, page, itemsPerPage]);

  // Fetch transactions on month, search, or page change
  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);  // Use fetchTransactions as a dependency

  // Handle month selection
  const handleMonthChange = (e) => {
    setMonth(e.target.value);
    setPage(1); // Reset to page 1 when month changes
  };

  // Handle search input
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setPage(1); // Reset to page 1 when search changes
  };

  // Handle pagination: next and previous page
  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  return (
    <div>
      <h1>Transactions Table</h1>

      {/* Month selection */}
      <select onChange={handleMonthChange} value={month}>
        <option value="01">January</option>
        <option value="02">February</option>
        <option value="03">March</option>
        <option value="04">April</option>
        <option value="05">May</option>
        <option value="06">June</option>
        <option value="07">July</option>
        <option value="08">August</option>
        <option value="09">September</option>
        <option value="10">October</option>
        <option value="11">November</option>
        <option value="12">December</option>
      </select>

      {/* Search input */}
      <input
        type="text"
        placeholder="Search by title, description, or price..."
        value={search}
        onChange={handleSearchChange}
      />

      {/* Statistics box */}
      <Statistics month={month} />  {/* Displaying statistics for the selected month */}

      {/* Transactions table */}
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Price</th>
            <th>Description</th>
            <th>Sold</th>
            <th>Date of Sale</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction._id}>
              <td>{transaction.title}</td>
              <td>{transaction.price}</td>
              <td>{transaction.description}</td>
              <td>{transaction.sold ? 'Yes' : 'No'}</td>
              <td>{new Date(transaction.dateOfSale).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination controls */}
      <div>
        <button onClick={handlePrevPage} disabled={page === 1}>
          Previous
        </button>
        <span> Page {page} of {totalPages} </span>
        <button onClick={handleNextPage} disabled={page === totalPages}>
          Next
        </button>
      </div>

      {/* Bar chart displaying price ranges */}
      <h2>Price Range Distribution for {month}</h2>
      <BarChart month={month} />  {/* Displaying bar chart for the selected month */}
    </div>
  );
}

export default TransactionTable;
