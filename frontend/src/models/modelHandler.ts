// File: C:\gaon\2024\quantumfinai\frontend\src\models\modelHandler.ts
// Module: modelHandler
// Description: 주식 데이터 예측 모델을 생성, 훈련, 예측하는 모듈

import * as tf from "@tensorflow/tfjs";
import { calculateStandardDeviation, normalizeData, denormalizeValue } from "../utils/dataProcessing";
import { StockData } from "../utils/mockData";
import { prepareData } from "../data/dataPreparation";
import { progressCallback } from "../utils/callbacks";

const LOOKBACK = 60;

// 모델 생성 함수
export const createModel = () => {
  const model = tf.sequential();
  model.add(
    tf.layers.lstm({
      units: 64,
      inputShape: [LOOKBACK + 2, 1],
      returnSequences: false,
    })
  );
  model.add(tf.layers.dense({ units: 1 }));
  model.compile({ optimizer: tf.train.adam(0.001), loss: "meanSquaredError" });
  return model;
};

// 전역 변수로 훈련된 모델과 정규화에 사용된 mean, std 값 저장
let trainedModel: tf.LayersModel | null = null;
let globalMean: number;
let globalStd: number;

// 모델 훈련 함수
export const trainModel = async (
  data: StockData[],
  setProgress: (progress: number) => void
) => {
  console.log("Training model...");

  if (trainedModel) {
    return { model: trainedModel, mean: globalMean, std: globalStd };
  }

  if (data.length < LOOKBACK + 1) {
    throw new Error("Not enough data points for training");
  }

  const { X, y, mean, std } = prepareData(data);
  globalMean = mean;
  globalStd = std;

  const model = createModel();

  const xTensor = tf.tensor3d(X.map((arr) => arr.map((val) => [val])));
  const yTensor = tf.tensor2d(y, [y.length, 1]);

  const totalEpochs = 30;
  const earlyStoppingCallback = tf.callbacks.earlyStopping({
    monitor: "val_loss",
    patience: 10,
    minDelta: 0.001,
    mode: "min",
    verbose: 1,
  });

  await model.fit(xTensor, yTensor, {
    epochs: totalEpochs,
    batchSize: 32,
    validationSplit: 0.2,
    callbacks: [earlyStoppingCallback, progressCallback(setProgress, totalEpochs)],
    verbose: 1,
  });

  trainedModel = model;

  tf.dispose([xTensor, yTensor]);

  return { model: trainedModel, mean: globalMean, std: globalStd };
};

// 예측 함수
export const makePrediction = (data: StockData[]) => {
  if (!trainedModel) {
    throw new Error("Model not trained yet");
  }

  const prices = data.slice(-LOOKBACK).map((d) => d.price);
  const { normalizedData } = normalizeData(prices);

  const priceChange =
    normalizedData[normalizedData.length - 1] - normalizedData[0];
  const volatility = calculateStandardDeviation(normalizedData);

  const input = [...normalizedData, priceChange, volatility];
  const inputTensor = tf.tensor3d([input.map((val) => [val])]);

  const predictionTensor = trainedModel.predict(inputTensor) as tf.Tensor;
  const normalizedPrediction = predictionTensor.dataSync()[0];

  tf.dispose([inputTensor, predictionTensor]);

  return Math.round(denormalizeValue(normalizedPrediction, globalMean, globalStd) * 100) / 100;
};
