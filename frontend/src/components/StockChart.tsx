// File: C:\gaon\2024\quantumfinai\src\components\StockChart.tsx
// Component: StockChart
// Description: Renders a stock price chart using Recharts

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import styled from 'styled-components'
import { mockStockData } from '../utils/mockData'

const ChartContainer = styled.div`
  height: 400px;
  margin-top: 20px;
`

const StockChart = () => {
  return (
    <ChartContainer>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={mockStockData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="price" stroke="#8884d8" activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}

export default StockChart
