// File: C:\gaon\2024\quantumfinai\src\main.tsx
// Component: main
// Description: StrictMode로 App 컴포넌트를 DOM에 렌더링하는 엔트리 포인트


import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
