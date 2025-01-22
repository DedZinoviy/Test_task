import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from './pages/MainPage';
import DocumentPage from './pages/DocumentPage';

/**
 * Функциональный компонент приложения.
 */
function App() {
  return (
    <>
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/comment/:id" element={<DocumentPage />} />
          </Routes>
        </div>
      </Router>
    </>
  )
}

export default App
