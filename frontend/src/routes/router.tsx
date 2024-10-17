// File: C:\gaon\2024\quantumfinai\frontend\src\routes\router.tsx
// Component: router
// Description: [Describe this component]

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import StockPredictionPage from '../pages/StockPredictionPage';
import MeasurementPage from '../pages/MeasurementPage';
import TestPage from '../pages/TestPage';
import Header from '../components/Header';
import NotFoundPage from '../pages/NotFoundPage';

// 라우터 생성
const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <>
        <Header />
        <StockPredictionPage />
      </>
    ),
  },
  {
    path: '/stock-prediction',
    element: (
      <>
        <Header />
        <StockPredictionPage />
      </>
    ),
  },
  {
    path: '/measurement',
    element: (
      <>
        <Header />
        <MeasurementPage />
      </>
    ),
  },
  {
    path: '/test',
    element: (
      <>
        <Header />
        <TestPage />
      </>
    ),
  },
  {
    path: '*',
    element: (
        <>
            <Header />
            <NotFoundPage />
        </>
    ),
  },
]);

// 라우터 컴포넌트
const Router = () => {
  return <RouterProvider router={router} />;
};

export default Router;
