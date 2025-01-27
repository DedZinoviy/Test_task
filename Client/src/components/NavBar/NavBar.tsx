import { AppBar, Toolbar, IconButton, useColorScheme } from '@mui/material';
import { ModeSelector } from '../ModeSelector';
import React from 'react';
import { Brightness4, Brightness7 } from '@mui/icons-material';

interface NavBarProps {
  viewMode: 'json' | 'table';
  onViewModeChanged: (mode: 'json' | 'table') => void;
}

/** Компонент Header'а (навигациооной панели) приложения. */
const NavBar: React.FC<NavBarProps> = ({ viewMode, onViewModeChanged }) => {
  const { mode, setMode } = useColorScheme();

  // Обработчик смены темы
  const handleThemeToggle = () => {
    const newMode = mode === 'dark' ? 'light' : 'dark';
    setMode(newMode);
  };

  return (
    <AppBar position="static" sx={{height: '60px'}}>
      <Toolbar sx={{height: '100%'}}>
        {/* Кнопка для переключения между темами */}
        <IconButton
          edge="start"
          color="inherit"
          aria-label="theme toggle"
          onClick={handleThemeToggle}
          sx={{ marginRight: 2 }}
        >
          {mode === 'light' ? <Brightness4 /> : <Brightness7 />}
        </IconButton>

        {/* Компонент для переключения между форматами отображения */}
        <ModeSelector mode={viewMode} onChangeMode={onViewModeChanged} />
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
