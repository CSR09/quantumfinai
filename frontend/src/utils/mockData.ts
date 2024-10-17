// File: src/utils/mockData.ts
// Component: MockData
// Description: 차트에 사용될 주식 모의 데이터를 제공하는 모듈

export interface StockData {
    date: string;
    price: number;
  }
  
  export const mockStockData: StockData[] = [
    { date: '2023-01', price: 3800 },
    { date: '2023-02', price: 3900 },
    { date: '2023-03', price: 4100 },
    { date: '2023-04', price: 4000 },
    { date: '2023-05', price: 4200 },
    { date: '2023-06', price: 4300 },
    { date: '2023-07', price: 4500 },
    { date: '2023-08', price: 4600 },
    { date: '2023-09', price: 4400 },
    { date: '2023-10', price: 4700 },
    { date: '2023-11', price: 4900 },
    { date: '2023-12', price: 5000 },
    { date: '2024-01', price: 4000 },
    { date: '2024-02', price: 3000 },
    { date: '2024-03', price: 5000 },
    { date: '2024-04', price: 4500 },
    { date: '2024-05', price: 4800 },
    { date: '2024-06', price: 5200 },
    { date: '2024-07', price: 5800 },
    { date: '2024-08', price: 6000 },
    { date: '2024-09', price: 5500 },
    { date: '2024-10', price: 6500 },
    { date: '2024-11', price: 6800 },
    { date: '2024-12', price: 7000 },
  ];