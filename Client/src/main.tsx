import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'react-redux';
import { store } from '../src/redux/store';

// Экземпляр QueryClient
const queryClient = new QueryClient();

// Проверка наличия элемента в DOM перед рендерингом
const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Не удалось найти элемент с id "root" в DOM');
}

createRoot(rootElement).render(
  <StrictMode>
    {/* Провайдеры для redux и react-query */}
    <Provider store={store}> {/* Провайдер Redux */}
      <QueryClientProvider client={queryClient}> {/* Провайдер react-query */}
        <App />
      </QueryClientProvider>
    </Provider>
  </StrictMode>
);
