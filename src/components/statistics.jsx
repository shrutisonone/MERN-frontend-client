import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

function Statistics({ month }) {
  const [statistics, setStatistics] = useState({
    totalSaleAmount: 0,
    totalSoldItems: 0,
    totalNotSoldItems: 0,
  });
const fetchStatistics = useCallback(async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/statistics?month=${month}`);
      setStatistics(response.data);
    } catch (error) {
      console.error("Error fetching statistics:", error);
    }
  }, [month]); // Include `month` as a dependency

  // Fetch statistics whenever the month changes
  useEffect(() => {
    fetchStatistics();
  }, [fetchStatistics]); // Include `fetchStatistics` as a dependency

  return (
    <div style={{ border: '1px solid #ccc', padding: '20px', marginBottom: '20px', borderRadius: '5px' }}>
      <h3>Statistics for Month: {month}</h3>
      <p><strong>Total Sales:</strong> ${statistics.totalSaleAmount}</p>
      <p><strong>Total Sold Items:</strong> {statistics.totalSoldItems}</p>
      <p><strong>Total Not Sold Items:</strong> {statistics.totalNotSoldItems}</p>
    </div>
  );
}

Statistics.propTypes = {
  month: PropTypes.string.isRequired,  // Expect month to be passed as a string
};

export default Statistics;
