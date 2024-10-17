// File: C:\gaon\2024\quantumfinai\frontend\src\pages\MeasurementPage.tsx
// Component: MeasurementPage
// Description: [Describe this component]

import styled from 'styled-components';

const DataContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  background-color: #121212;
  color: #fff;
`;

const MeasurementPage = () => {
  const exampleData = [
    {
      Timestamp: '2024-10-10 10:00',
      SpindleSpeed: 1536,
      PowerConsumption: 5.2165,
      CuttingSpeed: 308.818,
      Vibration: 0.1913,
      ToolWear: 0.0108,
    },
  ];

  return (
    <DataContainer>
      <h2>측정 데이터</h2>
      <table>
        <thead>
          <tr>
            <th>Timestamp</th>
            <th>Spindle Speed (RPM)</th>
            <th>Power Consumption (kW)</th>
            <th>Cutting Speed (mm/min)</th>
            <th>Vibration (m/s)</th>
            <th>Tool Wear (mm)</th>
          </tr>
        </thead>
        <tbody>
          {exampleData.map((data, index) => (
            <tr key={index}>
              <td>{data.Timestamp}</td>
              <td>{data.SpindleSpeed}</td>
              <td>{data.PowerConsumption.toFixed(2)}</td>
              <td>{data.CuttingSpeed.toFixed(2)}</td>
              <td>{data.Vibration.toFixed(4)}</td>
              <td>{data.ToolWear.toFixed(5)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </DataContainer>
  );
};

export default MeasurementPage;
