// File: C:\gaon\2024\quantumfinai\frontend\src\data\dataPreparation.ts
// Module: dataPreparation
// Description: 주식 데이터를 정규화하고 학습에 필요한 형식으로 준비하는 모듈

import { StockData } from "../utils/mockData";
import { normalizeData, calculateStandardDeviation } from "../utils/dataProcessing";

const LOOKBACK = 60;

// 데이터 준비 함수
export const prepareData = (data: StockData[]) => {
  const prices = data.map((d) => d.price);
  const { normalizedData, mean, std } = normalizeData(prices);

  const X: number[][] = [];
  const y: number[] = [];

  for (let i = LOOKBACK; i < normalizedData.length; i++) {
    const pastPrices = normalizedData.slice(i - LOOKBACK, i);
    const priceChange = pastPrices[pastPrices.length - 1] - pastPrices[0];
    const volatility = calculateStandardDeviation(pastPrices);
    X.push([...pastPrices, priceChange, volatility]);
    y.push(normalizedData[i]);
  }

  return { X, y, mean, std };
};
