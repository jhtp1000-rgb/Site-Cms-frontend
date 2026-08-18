import { useState } from 'react';

interface CreateTenantFormProps {
  onSubmit: (nome: string, email: string, senha: string) => Promise<void>;
  onCancel: () => void;
}

const BRAND = '#00966D';

export function CreateTenantForm({ onSubmit, onCancel }: CreateTenantFormProps) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await onSubmit(nome, email, senha);
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white border border-slate-200 rounded-2xl p-6 mb-6 space-y-4">
      <h3 className="font-bold text-[#0F172A]">Novo tenant</h3>

      <div className="grid md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Nome</label>
          <input value={nome} onChange={(e) => setNome(e.target.value)} className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#00966D]" required />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">E-mail (admin)</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#00966D]" required />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Senha</label>
          <input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#00966D]" required />
        </div>
      </div>

      <div className="flex justify-end gap-2">
        <button type="button" onClick={onCancel} className="px-4 py-2 text-sm font-semibold text-slate-600 bg-slate-100 rounded-lg hover:bg-slate-200">
          Cancelar
        </button>
        <button type="submit" disabled={loading} className="px-4 py-2 text-sm font-semibold text-white rounded-lg disabled:opacity-60" style={{ backgroundColor: BRAND }}>
          {loading ? 'Criando...' : 'Criar tenant'}
        </button>
      </div>
    </form>
  );
}
