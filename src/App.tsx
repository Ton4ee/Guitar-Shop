import { Routes, Route } from 'react-router-dom';
import BrandListPage from './pages/BrandListPage';
import ModelListPage from './pages/ModelListPage';
import ModelDetailsPage from './pages/ModelDetailsPage';
import Layout from './components/Layout';
import { GlobalStyle } from './styles/GlobalStyle';

function App() {
  return (
    <>
      <GlobalStyle />
      <Layout>
        <Routes>
          <Route path="/" element={<BrandListPage />} />
          <Route path="/brands/:brandId" element={<ModelListPage />} />
          <Route
            path="/brands/:brandId/models/:modelId"
            element={<ModelDetailsPage />}
          />
        </Routes>
      </Layout>
    </>
  );
}

export default App;
