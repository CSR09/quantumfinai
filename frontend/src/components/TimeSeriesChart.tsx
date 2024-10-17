// File: C:\gaon\2024\quantumfinai\frontend\src\components\TimeSeriesChart.tsx
// Component: TimeSeriesChart
// Description: 주어진 데이터로 시계열 차트를 렌더링하는 컴포넌트

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import styled from 'styled-components';
import { StockData } from '../utils/mockData';

interface TimeSeriesChartProps {
  data: StockData[];
}

const ChartContainer = styled.div`
  height: 400px;
  background-color: #1e1e1e;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const TimeSeriesChart = ({ data }: TimeSeriesChartProps) => {
  return (
    <ChartContainer>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#333" />
          <XAxis dataKey="date" stroke="#888" />
          <YAxis stroke="#888" />
          <Tooltip
            contentStyle={{ backgroundColor: '#333', border: 'none' }}
            labelStyle={{ color: '#fff' }}
            itemStyle={{ color: '#fff' }}
            formatter={(value: number) => [`$${value.toLocaleString()}`, "Price"]}
          />
          <Legend />
          <Line type="monotone" dataKey="price" stroke="#8884d8" dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};

export default TimeSeriesChart;