// File: C:\gaon\2024\quantumfinai\src\App.tsx
// Component: App
// Description: 주가 예측 및 시각화를 위한 대시보드 컴포넌트

import { useState, useCallback, useMemo } from 'react';
import TimeSeriesChart from '../components/TimeSeriesChart';
import RangeSelector from '../components/RangeSelector';
import { StockData } from '../utils/mockData';
import { trainModel, makePrediction } from '../models/modelHandler';
import { generateMockData } from '../utils/generateMockData';
import {
  AppContainer,
  Title,
  PredictionInfo,
  ControlPanel,
  Button,
  LoadingOverlay,
  ProgressBarContainer,
  ProgressBar,
} from '../App.styles';

type Range = '1Y' | '5Y' | '10Y' | 'ALL';

const StockPredictionPage = () => {
  const [data, setData] = useState<StockData[]>(() => generateMockData());
  const [prediction, setPrediction] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);  // 로딩 상태
  const [error, setError] = useState<string | null>(null);
  const [isModelTrained, setIsModelTrained] = useState(false); // 모델 훈련 여부
  const [range, setRange] = useState<Range>('ALL');
  const [progress, setProgress] = useState(0);  // 훈련 진행도 상태 추가

  const filteredData = useMemo(() => {
    switch (range) {
      case '1Y':
        return data.slice(-12);
      case '5Y':
        return data.slice(-60);
      case '10Y':
        return data.slice(-120);
      default:
        return data;
    }
  }, [data, range]);

  // 예측 및 모델 훈련 실행 함수
  const runPrediction = useCallback(async () => {
    if (isLoading) return;
    setIsLoading(true);  // 훈련 시작 시 로딩 상태 true
    setError(null);

    try {
      if (!isModelTrained) {
        // 모델 훈련이 필요할 때만 프로그레스 바를 표시
        setProgress(0);  // 프로그레스 초기화
        console.log('Training the model...');
        await trainModel(filteredData, setProgress);  // 훈련 중 프로그레스 업데이트
        setIsModelTrained(true); // 모델이 훈련되었음을 표시
        console.log('Model trained successfully');
      }

      // 예측 실행 (모델 훈련이 완료된 후)
      const predictedValue = makePrediction(filteredData);  
      console.log('Prediction made:', predictedValue);
      setPrediction(predictedValue);

      // 예측 결과를 데이터에 추가
      const lastDate = new Date(data[data.length - 1].date);
      const nextDate = new Date(lastDate.setMonth(lastDate.getMonth() + 1));
      const nextDateString = nextDate.toISOString().slice(0, 7);
      setData(prevData => [...prevData, { date: nextDateString, price: predictedValue }]);
    } catch (error) {
      console.error('Prediction failed:', error);
      setError('예측에 실패했습니다. 다시 시도해 주세요.');
    } finally {
      setIsLoading(false);  // 훈련 또는 예측이 끝나면 로딩 상태 해제
      console.log('Finished loading.');
    }
  }, [filteredData, isModelTrained, isLoading, data]);

  const resetData = useCallback(() => {
    const newData = generateMockData();
    setData(newData);
    setPrediction(null);
    setError(null);
    setIsModelTrained(false);  // 모델 훈련 상태 초기화
    setProgress(0);  // 프로그레스 초기화
  }, []);

  return (
    <AppContainer>
      <Title>QuantumFin AI: 시계열 분석 및 예측 대시보드</Title>
      <ControlPanel>
        <Button onClick={runPrediction} disabled={isLoading}> {/* 로딩 중일 때 버튼 비활성화 */}
          {isModelTrained ? '새로운 예측' : '모델 훈련 및 예측'}
        </Button>
        <Button onClick={resetData} disabled={isLoading}>  {/* 로딩 중일 때 비활성화 */}
          초기화
        </Button>
      </ControlPanel>
      <RangeSelector onChange={setRange} />
      <TimeSeriesChart data={filteredData} />
      {error && <PredictionInfo style={{ color: 'red' }}>{error}</PredictionInfo>}
      {prediction !== null && !error && (
        <PredictionInfo>
          다음 달 예측 주가: ${prediction.toFixed(2)}
        </PredictionInfo>
      )}
      {/* 모델 훈련 중일 때만 프로그레스 바를 표시 */}
      {!isModelTrained && isLoading && (  // 모델이 훈련 중일 때만 프로그레스 바 표시
        <LoadingOverlay>
          <ProgressBarContainer>
            <ProgressBar width={progress} /> {/* 진행률에 따라 너비 변경 */}
          </ProgressBarContainer>
        </LoadingOverlay>
      )}
    </AppContainer>
  );
};

export default StockPredictionPage;
