// File: C:\gaon\2024\quantumfinai\frontend\src\utils\dataProcessing.ts
// Module: dataProcessing
// Description: 데이터의 정규화, 역정규화 및 통계 계산 함수 제공

// 표준편차 계산 함수
export const calculateStandardDeviation = (arr: number[]): number => {
    const mean = arr.reduce((acc, val) => acc + val, 0) / arr.length;
    return Math.sqrt(
      arr.map((x) => Math.pow(x - mean, 2)).reduce((acc, val) => acc + val, 0) /
        arr.length
    );
  };
  
  // 데이터 정규화 함수 (Z-score 정규화)
  export const normalizeData = (
    data: number[]
  ): { normalizedData: number[]; mean: number; std: number } => {
    const mean = data.reduce((sum, val) => sum + val, 0) / data.length;
    const std = calculateStandardDeviation(data);
    const normalizedData = data.map((value) => (value - mean) / (std + 1e-8)); // 0으로 나누는 오류 방지
    return { normalizedData, mean, std };
  };
  
  // 정규화된 값을 원래 값으로 되돌리기
  export const denormalizeValue = (
    value: number,
    mean: number,
    std: number
  ): number => {
    return value * std + mean;
  };
  