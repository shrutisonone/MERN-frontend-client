import { useState, useEffect } from 'react';
import axios from 'axios';
import TransactionTable from './components/TransactionTable';
import BarChart from './components/barChart'; 
import Statistics from './components/statistics'; 
import './App.css';


function App() {
  const [transactions, setTransactions] = useState([]);
  const [month, setMonth] = useState('03'); // Default March
  const [search, setSearch] = useState(''); 
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // New state for error handling


  const fetchTransactions = async () => {
    try {
      setLoading(true);
      setError(null); // Reset error before fetching
      const response = await axios.get(`http://localhost:5173/api/transactions?month=${month}&search=${search}`);
      console.log('response', response);
      setTransactions(response.data.transactions); // Ensure correct data structure
    } catch (error) {
      console.error("Error fetching transactions:", error);
      setError("Failed to load transactions. Please try again."); // Set error message
    } finally {
      setLoading(false); // Set loading to false once fetching is done
    }
  };

  useEffect(() => {
    let isMounted = true; // Track if the component is still mounted
    if (isMounted) {
      fetchTransactions();
    }
    
    return () => {
      isMounted = false; // Cleanup function to prevent memory leaks
    };
  }, [month, search]);

 
  return (
    <div className="App">
      <h1>Transactions Table</h1>
      <select onChange={(e) => setMonth(e.target.value)} value={month}>
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

      <input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      
      {error && <p style={{ color: 'red' }}>{error}</p>}  {/* This is where we display the error */}

     {loading ? ( 
        <p>Loading...</p>
      ) : (
        <>
          <TransactionTable transactions={transactions} />
          <Statistics month={month} />
          <BarChart month={month} />
        </>
      )}
    </div>
  );
}

export default App;

