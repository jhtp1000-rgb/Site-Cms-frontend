// src/hooks/useTenantDashboard.ts
import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthProvider';

export function useTenantDashboard() {
  const { user } = useAuth();
  const [tenantData, setTenantData] = useState<any>(null);
  const [sectionsData, setSectionsData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Só busca os dados se o usuário já estiver carregado no contexto
    if (!user?.tenantId) return;

    async function fetchDashboardData() {
      try {
        setLoading(true);
        setError(null);
        
        const apiUrl = import.meta.env.VITE_API_URL || '';
        const token = localStorage.getItem('@App:token');

        // Configuração padrão dos cabeçalhos com o token JWT
        const headers = {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        };

        /* =========================================================================
           CHAMADAS DE API (AGUARDANDO ROTAS DO SWAGGER)
           ========================================================================= */

        // 1. ROTA: BUSCAR DADOS GERAIS DO TENANT (Cor, Nome, Plano, Estatísticas)
        // TODO: Enviar o JSON/YAML do Swagger referente à rota de informações do Tenant
        // Exemplo esperado: GET /api/tenant/{user.tenantId}/dashboard
        // const resTenant = await fetch(`${apiUrl}/api/???`, { headers });
        // const dataTenant = await resTenant.json();

        // 2. ROTA: BUSCAR AS SEÇÕES DO PORTFÓLIO (Lista de áreas editáveis e seus status)
        // TODO: Enviar o JSON/YAML do Swagger referente à listagem das seções
        // Exemplo esperado: GET /api/portfolio/{user.tenantId}/sections
        // const resSections = await fetch(`${apiUrl}/api/???`, { headers });
        // const dataSections = await resSections.json();

        /* ========================================================================= */

        // MOCK TEMPORÁRIO: Mantém a tela funcionando até integrarmos as rotas acima
        setTenantData({
          color: '#00966D',
          tenantName: user.nome || 'Ana Lima', // Já puxando o nome real do contexto!
          tenantPortfolioName: 'analima.digital',
          assinatura: 'pro',
          stats: { activeSections: 5, totalSections: 7, lastEdit: 'Hoje', views: 1240 }
        });

        setSectionsData([
          { id: 'dashboard', sectionName: 'Hero / Apresentação', attributesDescription: 'Foto, nome, título e bio principal', status: 'PUBLICADO' },
          { id: 'carrossel', sectionName: 'Carrossel de Projetos', attributesDescription: '4 projetos em destaque no portfólio', status: 'PUBLICADO' },
          { id: 'descricao', sectionName: 'Sobre / Descrição', attributesDescription: 'Texto de apresentação detalhado', status: 'RASCUNHO' },
          { id: 'ctas', sectionName: 'Botões de Ação (CTAs)', attributesDescription: 'WhatsApp, Agendar, Ver serviços', status: 'PUBLICADO' },
          { id: 'faq', sectionName: 'Perguntas Frequentes', attributesDescription: 'Perguntas e respostas expansíveis', status: 'PUBLICADO' },
          { id: 'contatos', sectionName: 'Contatos', attributesDescription: 'Links e informações de contato', status: 'PUBLICADO' },
          { id: 'depoimentos', sectionName: 'Depoimentos', attributesDescription: 'Avaliações de clientes na plataforma', status: 'RASCUNHO' },
        ]);

      } catch (err: any) {
        setError(err.message || 'Erro ao carregar os dados do painel.');
      } finally {
        setLoading(false);
      }
    }

    fetchDashboardData();
  }, [user]);

  return { tenantData, sectionsData, loading, error };
}