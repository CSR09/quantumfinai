// File: C:\gaon\2024\quantumfinai\frontend\src\utils\callbacks.ts
// Module: callbacks
// Description: 모델 훈련 진행률을 업데이트하는 콜백을 제공하는 모듈

import * as tf from "@tensorflow/tfjs";

// 진행률 콜백 함수 생성
export const progressCallback = (
  setProgress: (progress: number) => void,
  totalEpochs: number
) => {
  return new tf.CustomCallback({
    onEpochEnd: (epoch, logs) => {
      const progress = Math.round(((epoch + 1) / totalEpochs) * 100);
      setProgress(progress);
      console.log(`Epoch ${epoch + 1}: ${progress}% completed, loss: ${logs?.loss}`);
    },
  });
};
