// File: C:\gaon\2024\quantumfinai\src\App.styles.ts
// Module: App.styles

import styled from 'styled-components';

export const AppContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  background-color: #121212;
  min-height: 100vh;
  color: #fff;
  font-family: 'Arial', sans-serif;
`;

export const Title = styled.h1`
  color: #61dafb;
  text-align: center;
  margin-bottom: 30px;
`;

export const PredictionInfo = styled.div`
  margin-top: 20px;
  text-align: center;
  font-size: 18px;
  color: #61dafb;
`;

export const ControlPanel = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

export const Button = styled.button`
  background-color: #61dafb;
  color: #282c34;
  border: none;
  padding: 10px 20px;
  margin: 0 10px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #4fa8d5;
  }

  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;

export const LoadingOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const ProgressBarContainer = styled.div`
  width: 80%;
  background-color: #f3f3f3;
  border-radius: 25px;
  overflow: hidden;
  height: 20px;
`;

export const ProgressBar = styled.div<{ width: number }>`
  height: 100%;
  background-color: #4caf50;
  width: ${({ width }) => width}%;
  transition: width 0.3s;
  border-radius: 25px;
`;
