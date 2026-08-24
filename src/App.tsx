import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthProvider';
import { NotificationProvider } from './contexts/NotificationContext';
import PrivateRoute from './components/routes/PrivateRoute';
import Login from './pages/Login';
import PortfolioEditor from './pages/PortfolioEditor';
import TenantsAdmin from './pages/TenantsAdmin';
import AssinaturaPage from './pages/Assinatura';
import PortfolioPublico from './pages/PortfolioPublico';

function App() {
  return (
    <BrowserRouter>
      <NotificationProvider>
        <AuthProvider>
          <Routes>
            <Route path="/p/:paginaId" element={<PortfolioPublico />} />

            <Route path="/login" element={<Login />} />

            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <PortfolioEditor />
                </PrivateRoute>
              }
            />

            <Route
              path="/admin/assinatura"
              element={
                <PrivateRoute>
                  <AssinaturaPage />
                </PrivateRoute>
              }
            />

            <Route
              path="/admin/tenants"
              element={
                <PrivateRoute adminOnly>
                  <TenantsAdmin />
                </PrivateRoute>
              }
            />

            <Route path="/" element={<div>Em desenvolvimento</div>} />

            <Route
              path="/unauthorized"
              element={
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', flexDirection: 'column', gap: '20px' }}>
                  <h1>Acesso Negado</h1>
                  <p>Você não tem permissão para acessar esta página.</p>
                </div>
              }
            />

            <Route
              path="*"
              element={
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', flexDirection: 'column', gap: '20px' }}>
                  <h1>404</h1>
                  <p>Página não encontrada</p>
                </div>
              }
            />
          </Routes>
        </AuthProvider>
      </NotificationProvider>
    </BrowserRouter>
  );
}

export default App;
