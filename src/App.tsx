// src/App.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthProvider';
import Login from './components/pages/Login';
import Recursos from './components/ui/Recursos';
import Duvidas from './components/ui/Duvidas';
import Contato from './components/ui/Contato';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Rota principal - Mapa público */}
          {/* <Route path="/" element={<PublicHeatMap />} /> */}
          
          {/* Rota de perfil (quando criar) */}
          <Route
          path='/login'
          element={<Login/>}
          />
          <Route
            path="/"
            element={
                <div>Em desenvolvimento</div>
            }
          />

          <Route
            path="/recursos"
            element={
                <Recursos></Recursos>
            }
          />

          <Route
            path="/duvidas"
            element={
                <Duvidas></Duvidas>
            }
          />

          <Route
            path="/contato"
            element={
                <Contato></Contato>
            }
          />

          
          {/* Rota para acesso não autorizado */}
          <Route 
            path="/unauthorized" 
            element={
              <div style={{ 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center', 
                height: '100vh',
                flexDirection: 'column',
                gap: '20px'
              }}>
                <h1>Acesso Negado</h1>
                <p>Você não tem permissão para acessar esta página.</p>
              </div>
            } 
          />
          
          {/* Rota 404 */}
          <Route 
            path="*" 
            element={
              <div style={{ 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center', 
                height: '100vh',
                flexDirection: 'column',
                gap: '20px'
              }}>
                <h1>404</h1>
                <p>Página não encontrada</p>
              </div>
            } 
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
