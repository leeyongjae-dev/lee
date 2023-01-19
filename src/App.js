import './App.css';
import { Routes, Route } from 'react-router-dom';
import BottomLayout from './components/layout/BottomLayout';
import NavLayout from './components/layout/NavLayout';
import Main from './pages/Main';
import NotFound from './pages/NotFound';
import BoardList from './pages/board/BoardList';
import BoardDetail from './pages/board/BoardDetail';
import BoardReg from './pages/board/BoardReg';

function App() {
  return (
    <div id="wrap">
      <NavLayout />
      <Routes>
        <Route path="/" element={<Main />} />
        
        <Route path="/board/boardList" element={<BoardList />} />
        <Route path="/board/boardDetail" element={<BoardDetail />} />
        <Route path="/board/boardReg" element={<BoardReg />} />
        
        <Route path="*" element={<NotFound />} />
      </Routes>
      <BottomLayout />
    </div>
  );
}

export default App;
