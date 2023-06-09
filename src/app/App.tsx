import { Route, Routes } from 'react-router-dom';

import CoinDetailsPage from './pages/CoinDetailsPage';
import HomePage from './pages/HomePage';

import './App.css';
import Title from './components/Title';

function App() {
  return (
    <div className='App' style={{ padding: '5rem' }}>
      <Title />
      <Routes>
        <Route index element={<HomePage />} />
        <Route path='/details/:id' element={<CoinDetailsPage />} />
      </Routes>
    </div>
  );
}

export default App;
