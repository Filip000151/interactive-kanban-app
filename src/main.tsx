import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import ModalProvider from './shared/providers/ModalProvider.tsx'
import TasksProvider from './shared/providers/TasksProvider.tsx'
import DragProvider from './shared/providers/DragProvider.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <DragProvider>
      <TasksProvider>
        <ModalProvider>
          <App />
        </ModalProvider>
      </TasksProvider>
    </DragProvider>
  </StrictMode>,
)
