// File: C:\gaon\2024\quantumfinai\src\utils\generateMockData.ts
// Module: generateMockData
// Description: 주식 가격의 모의 데이터를 생성하는 모듈

import { StockData } from './mockData';

const generateRandomPrice = (min: number, max: number): number => {
  const randomValue = Math.random() * (max - min) + min;
  return parseFloat(randomValue.toFixed(2));
};

export const generateMockData = (startYear: number = 2015, months: number = 108): StockData[] => {
  const mockData: StockData[] = [];
  let currentDate = new Date(startYear, 0, 1);
  
  // 초기 가격을 10,000~12,000 사이에서 랜덤하게 설정 (더 좁은 범위)
  let previousPrice = generateRandomPrice(10000, 12000);
  
  // 연간 트렌드를 설정, 더 작은 범위로 조정
  let annualTrend = 0;

  for (let i = 0; i < months; i++) {
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    
    // 매년 트렌드를 재계산, -0.05 ~ 0.05 범위로 변동하도록 설정 (더 작은 변동)
    if (i % 12 === 0) {
      annualTrend = (Math.random() - 0.5) * 0.1;
    }
    
    // 월간 변동성 추가 (   작은 범위)
    const monthlyVolatility = (Math.random() - 0.5) * 0.03;
    
    // 트렌드와 변동성을 고려한 가격 변동
    const priceChange = previousPrice * (annualTrend + monthlyVolatility);
    let price = previousPrice + priceChange;
    
    // 극단적인 변동 방지
    price = Math.max(price, previousPrice * 0.95);  // 최대 5% 하락
    price = Math.min(price, previousPrice * 1.05);  // 최대 5% 상승
    
    // 5% 확률로 약간 더 큰 변동 추가 (뉴스 영향 등을 시뮬레이션)
    if (Math.random() < 0.05) {
      price *= Math.random() < 0.5 ? 0.98 : 1.02; // 2% 하락 또는 상승
    }
    
    // 가격을 소수점 2자리로 반올림
    price = parseFloat(price.toFixed(2));
    
    mockData.push({
      date: `${year}-${month}`,
      price: price
    });

    // 다음 달로 넘어가고, 현재 가격을 다음 회차의 이전 가격으로 설정
    currentDate.setMonth(currentDate.getMonth() + 1);
    previousPrice = price;
  }

  return mockData;
};