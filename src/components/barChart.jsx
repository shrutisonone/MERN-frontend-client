import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import PropTypes from 'prop-types';

function BarChart({ month }) {
  const [barData, setBarData] = useState({});

  // Wrap fetchBarChartData in useCallback to memoize the function
  const fetchBarChartData = useCallback(async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/barchart?month=${month}`);
      setBarData(response.data);
    } catch (error) {
      console.error("Error fetching bar chart data:", error);
    }
  }, [month]);  // Include `month` in the dependency array as it's used in the function

  useEffect(() => {
    fetchBarChartData();
  }, [fetchBarChartData]);  // Now include `fetchBarChartData` in the dependency array

  const data = {
    labels: Object.keys(barData),
    datasets: [
      {
        label: 'Number of items in price range',
        data: Object.values(barData),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true, // Start the y-axis at 0
      },
    },
    responsive: true,
    maintainAspectRatio: false, // Allows the chart to resize properly
  };

  return (
    <div style={{ height: '400px', width: '100%' }}>
      <Bar data={data} options={options} />
    </div>
  );
}

BarChart.propTypes = {
  month: PropTypes.string.isRequired, 
};

export default BarChart;
