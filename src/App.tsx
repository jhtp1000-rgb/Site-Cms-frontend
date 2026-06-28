// src/App.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Rota principal - Mapa público */}
          <Route path="/" element={<PublicHeatMap />} />
          
          {/* Rota de perfil (quando criar) */}
          <Route
            path="/"
            element={
                <div>Em desenvolvimento</div>
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
