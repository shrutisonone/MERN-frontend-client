import  { useState, useEffect } from 'react';
import axios from 'axios';
import TransactionTable from './components/TransactionTable';
import BarChart from './components/barChart';
import Statistics from './components/statistics';

function App() {
  const [transactions, setTransactions] = useState([]);
  const [month, setMonth] = useState('03'); // Default March
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchTransactions();
  }, [month, search]);

  const fetchTransactions = async () => {
    const response = await axios.get(`http://localhost:5000/api/transactions?month=${month}&search=${search}`);
    setTransactions(response.data);
  };

  return (
    <div className="App">
      <h1>Transactions Table</h1>
      <select onChange={(e) => setMonth(e.target.value)}>
        <option value="01">January</option>
        <option value="02">February</option>
        <option value="03" selected>March</option>
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
      <TransactionTable transactions={transactions} />
      <Statistics month={month} />
      <BarChart month={month} />
    </div>
  );
}

export default App;
