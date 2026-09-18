import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import ModalProvider from './shared/ModalProvider.tsx'
import TasksProvider from './shared/TasksProvider.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TasksProvider>
      <ModalProvider>
        <App />
      </ModalProvider>
    </TasksProvider>
  </StrictMode>,
)
