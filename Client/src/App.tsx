import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { MainPage, CommentPage } from './pages';
import './App.css';
import DocumentPage from './pages/CommentPage'; // TODO: Поправить экспорты
import { Box, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, useColorScheme } from '@mui/material';

/**
 * Функциональный компонент приложения.
 */
function App() {
  const { mode, setMode } = useColorScheme();
  return (
    <>
      <Box sx={{
        bgcolor: 'background.default',
        color: 'text.primary',
        minHeight: '100dvh'
      }}>
         {/* TODO: Сделать Лого + переключатель темы + Переключатель вида + Юзер меню (история поисков) => Header.tsx = AppBar */}
        <FormControl>
          <FormLabel id="demo-theme-toggle">Theme</FormLabel>
          <RadioGroup
            aria-labelledby="demo-theme-toggle"
            name="theme-toggle"
            row
            value={mode}
            onChange={(event) =>
              setMode(event.target.value as 'system' | 'light' | 'dark')
            }
          >
            <FormControlLabel value="system" control={<Radio />} label="System" />
            <FormControlLabel value="light" control={<Radio />} label="Light" />
            <FormControlLabel value="dark" control={<Radio />} label="Dark" />
          </RadioGroup>
        </FormControl>

        <Router>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/comment/:id" element={<CommentPage />} />
          </Routes>
        </Router>
      </Box >
    </>
  )
}

export default App
