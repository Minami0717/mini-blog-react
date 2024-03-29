import './App.css';
import styled from 'styled-components';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainPage from './component/page/MainPage';
import PostWritePage from './component/page/PostWritePage';
import PostViewPage from './component/page/PostViewPage';
import PostModifyPage from './component/page/PostModifyPage';

const MainTitleText = styled.p`
  font-size: 24px;
  font-weight: bold;
  text-align: center;
`;

function App() {
  return (
    <BrowserRouter>
      <MainTitleText>よしグランドシーズン</MainTitleText>
      <Routes>
        <Route index element={<MainPage />} />
        <Route path='post-write' element={<PostWritePage />} />
        <Route path='post/:postId' element={<PostViewPage />} />
        <Route path='post-modify/:postId' element={<PostModifyPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
