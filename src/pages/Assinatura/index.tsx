import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthProvider';
import assinaturaService from '../../services/assinaturaService';
import planoService from '../../services/planoService';
import type { Assinatura } from '../../types/assinatura';

type PlanKey = 'free' | 'pro' | 'premium';

const PLAN_INFO: Record<PlanKey, { nome: string; preco: number; badge?: string; badgeColor?: string; features: { texto: string; incluso: boolean }[] }> = {
  free: {
    nome: 'Free',
    preco: 0,
    features: [
      { texto: '1 portfólio digital', incluso: true },
      { texto: 'Até 3 projetos', incluso: true },
      { texto: 'Subdomínio próprio', incluso: true },
      { texto: 'Depoimentos ilimitados', incluso: false },
      { texto: 'Domínio próprio', incluso: false },
      { texto: 'Analytics avançado', incluso: false },
      { texto: 'Remover marca d\u2019água', incluso: false },
      { texto: 'Suporte prioritário', incluso: false },
    ],
  },
  pro: {
    nome: 'Pro',
    preco: 47,
    badge: 'Mais popular',
    badgeColor: '#059669',
    features: [
      { texto: '1 portfólio digital', incluso: true },
      { texto: 'Projetos ilimitados', incluso: true },
      { texto: 'Domínio próprio', incluso: true },
      { texto: 'Depoimentos ilimitados', incluso: true },
      { texto: 'Analytics avançado', incluso: true },
      { texto: 'Remover marca d\u2019água', incluso: true },
      { texto: 'Suporte por e-mail', incluso: true },
      { texto: 'Suporte prioritário', incluso: false },
    ],
  },
  premium: {
    nome: 'Premium',
    preco: 97,
    badge: 'Melhor valor',
    badgeColor: '#7C3AED',
    features: [
      { texto: '5 portfólios digitais', incluso: true },
      { texto: 'Projetos ilimitados', incluso: true },
      { texto: 'Domínio próprio', incluso: true },
      { texto: 'Depoimentos ilimitados', incluso: true },
      { texto: 'Analytics avançado', incluso: true },
      { texto: 'Remover marca d\u2019água', incluso: true },
      { texto: 'Suporte prioritário 24/7', incluso: true },
      { texto: 'White-label completo', incluso: true },
    ],
  },
};

export default function AssinaturaPage() {
  const { user } = useAuth();

  const [assinaturaAtual, setAssinaturaAtual] = useState<Assinatura | null>(null);
  const [loading, setLoading] = useState(true);
  const [upgrading, setUpgrading] = useState<PlanKey | null>(null);
  const [erro, setErro] = useState<string | null>(null);

  const fetchAssinatura = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    const res = await assinaturaService.getByTenant(user.tenantId);
    if (res.success && res.data) {
      setAssinaturaAtual(res.data.length > 0 ? res.data[res.data.length - 1] : null);
    }
    setLoading(false);
  }, [user]);

  useEffect(() => {
    fetchAssinatura();
  }, [fetchAssinatura]);

  const planoAtualKey: PlanKey = assinaturaAtual
    ? (assinaturaAtual.planoNome.toLowerCase() as PlanKey) in PLAN_INFO
      ? (assinaturaAtual.planoNome.toLowerCase() as PlanKey)
      : 'free'
    : 'free';

  const color = '#00966D';

  const handleUpgrade = async (planKey: 'pro' | 'premium') => {
    if (!user) return;
    setUpgrading(planKey);
    setErro(null);

    const alvo = PLAN_INFO[planKey];
    const resPlanos = await planoService.getAll();
    const planos = resPlanos.data ?? [];

    let plano = planos.find((p) => p.nomePlano.toLowerCase() === alvo.nome.toLowerCase());
    if (!plano) {
      const resNovo = await planoService.create({ nomePlano: alvo.nome, valorMensal: alvo.preco, descricao: `Plano ${alvo.nome}` });
      if (!resNovo.success || !resNovo.data) {
        setErro(resNovo.error ?? 'Não foi possível concluir o upgrade.');
        setUpgrading(null);
        return;
      }
      plano = resNovo.data;
    }

    const hoje = new Date().toISOString().slice(0, 10);
    const resAssinatura = await assinaturaService.create({
      tenantId: user.tenantId,
      planoId: plano.id,
      dataInicio: hoje,
      statusPagamento: 'ATIVO',
    });

    if (resAssinatura.success) {
      await fetchAssinatura();
    } else {
      setErro(resAssinatura.error ?? 'Não foi possível concluir o upgrade.');
    }
    setUpgrading(null);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="flex items-center justify-between px-4 md:px-6 h-16 bg-white border-b border-slate-200">
        <Link to="/dashboard" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-md flex items-center justify-center text-white font-bold text-sm" style={{ backgroundColor: color }}>
            {(user?.nome ?? 'T').charAt(0).toUpperCase()}
          </div>
          <span className="font-bold text-slate-800">Painel</span>
        </Link>
        <span className="text-sm text-slate-500">{user?.nome}</span>
      </header>

      <main className="max-w-5xl mx-auto p-4 md:p-10">
        <div className="mb-6">
          <span className="text-xs font-extrabold tracking-widest uppercase block mb-1" style={{ color }}>
            Assinatura
          </span>
          <h1 className="text-3xl font-bold text-[#0F172A] mb-1">Gerencie seu plano</h1>
          <p className="text-slate-500">Escolha o plano ideal para o seu portfólio digital</p>
        </div>

        {erro && <div className="bg-red-50 text-red-600 text-sm px-4 py-3 rounded-xl mb-6">{erro}</div>}

        {loading ? (
          <div className="w-full h-32 rounded-2xl bg-slate-100 animate-pulse mb-10" />
        ) : (
          <div className="bg-white border border-slate-200 rounded-2xl p-6 mb-10">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${color}15`, color }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
                  </svg>
                </div>
                <div>
                  <p className="font-bold text-[#0F172A]">Plano {PLAN_INFO[planoAtualKey].nome}</p>
                  <p className="text-sm text-slate-500">{assinaturaAtual ? 'Plano atual' : 'Seu plano atual'}</p>
                </div>
              </div>
              <span className="px-2.5 py-1 text-xs font-bold rounded-md uppercase tracking-wide" style={{ backgroundColor: `${color}15`, color }}>
                {assinaturaAtual ? assinaturaAtual.statusPagamento : 'Ativo'}
              </span>
            </div>

            <div className="flex flex-wrap gap-6 bg-slate-50 rounded-xl px-4 py-3">
              {assinaturaAtual ? (
                <div>
                  <p className="text-xs text-slate-400">Assinante desde</p>
                  <p className="text-sm font-semibold text-slate-700">
                    {new Intl.DateTimeFormat('pt-BR').format(new Date(assinaturaAtual.dataInicio))}
                  </p>
                </div>
              ) : (
                <>
                  <div>
                    <p className="text-xs text-slate-400">Renovação</p>
                    <p className="text-sm font-semibold text-slate-700">Nunca expira</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">Próxima cobrança</p>
                    <p className="text-sm font-semibold text-slate-700">Sem cobrança</p>
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        <h2 className="text-lg font-bold text-[#0F172A] mb-4">Comparar planos</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
          {(Object.keys(PLAN_INFO) as PlanKey[]).map((key) => {
            const plano = PLAN_INFO[key];
            const isCurrent = key === planoAtualKey;
            const destacado = key === 'pro';

            return (
              <div
                key={key}
                className={`relative bg-white rounded-2xl p-6 border ${destacado ? 'shadow-md' : 'border-slate-200'}`}
                style={destacado ? { borderColor: color, borderWidth: 2 } : undefined}
              >
                {plano.badge && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-white text-xs font-bold px-3 py-1 rounded-full" style={{ backgroundColor: plano.badgeColor }}>
                    {plano.badge}
                  </span>
                )}

                <div className="flex items-center gap-2 mb-4">
                  <span className="font-bold text-[#0F172A]">{plano.nome}</span>
                </div>

                <div className="mb-4">
                  <span className="text-3xl font-extrabold text-[#0F172A]">R$ {plano.preco}</span>
                  <span className="text-sm text-slate-400 block">{plano.preco === 0 ? 'grátis para sempre' : 'por mês'}</span>
                </div>

                <ul className="space-y-2 mb-6">
                  {plano.features.map((f) => (
                    <li key={f.texto} className={`flex items-center gap-2 text-sm ${f.incluso ? 'text-slate-700' : 'text-slate-300'}`}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      {f.texto}
                    </li>
                  ))}
                </ul>

                {isCurrent ? (
                  <button disabled className="w-full py-2.5 rounded-lg text-sm font-semibold bg-slate-100 text-slate-400 cursor-default">
                    Plano atual
                  </button>
                ) : key === 'free' ? (
                  <div className="h-[42px]" />
                ) : (
                  <button
                    onClick={() => handleUpgrade(key)}
                    disabled={upgrading !== null}
                    className="w-full py-2.5 rounded-lg text-sm font-semibold text-white disabled:opacity-60"
                    style={{ backgroundColor: key === 'premium' ? '#0F172A' : color }}
                  >
                    {upgrading === key ? 'Processando...' : 'Fazer upgrade →'}
                  </button>
                )}
              </div>
            );
          })}
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-6">
          <h3 className="font-bold text-[#0F172A] mb-3">Formas de pagamento aceitas</h3>
          <div className="flex flex-wrap gap-3 mb-3">
            {['Pix', 'Cartão de crédito', 'Boleto'].map((forma) => (
              <div key={forma} className="flex items-center gap-2 border border-slate-200 rounded-lg px-4 py-2 text-sm font-medium text-slate-600">
                {forma}
              </div>
            ))}
          </div>
          <p className="text-xs text-slate-400">Parcelamento em até 12x no cartão de crédito. Pix com desconto de 10%.</p>
        </div>
      </main>
    </div>
  );
}
