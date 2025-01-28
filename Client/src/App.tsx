import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { MainPage, CommentPage } from './pages';
import './App.css';
import { Box } from '@mui/material';
import { NavBar } from './components';
import { useState } from 'react';

/**
 * Функциональный компонент приложения.
 */
function App() {
  const [mode, setMode] = useState<'json' | 'table'>('table');
  return (
    <>
      <Box sx={{
        bgcolor: 'background.default',
        color: 'text.primary',
        minHeight: '100dvh'
      }}>
        <NavBar viewMode={mode} onViewModeChanged={setMode}></NavBar>
        <Router>
          <Routes>
            <Route path="/" element={<MainPage viewMode={mode}/>} />
            <Route path="/comment/:id" element={<CommentPage viewMode={mode}/>} />
          </Routes>
        </Router>
      </Box >
    </>
  )
}

export default App
