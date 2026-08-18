import { useState } from 'react';
import type { Tenant } from '../../types/tenant';

const BRAND = '#00966D';

interface EditTenantRowProps {
  tenant: Tenant;
  onSubmit: (nome: string) => Promise<void>;
  onCancel: () => void;
}

export function EditTenantRow({ tenant, onSubmit, onCancel }: EditTenantRowProps) {
  const [nome, setNome] = useState(tenant.nome);
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    setLoading(true);
    await onSubmit(nome);
    setLoading(false);
  };

  return (
    <tr className="border-b border-slate-100 last:border-0 bg-slate-50">
      <td className="px-5 py-3 text-slate-400">{tenant.id}</td>
      <td className="px-5 py-3">
        <input value={nome} onChange={(e) => setNome(e.target.value)} autoFocus className="w-full border border-slate-200 rounded-lg px-2 py-1 text-sm outline-none focus:border-[#00966D]" />
      </td>
      <td className="px-5 py-3 text-slate-400">{tenant.email}</td>
      <td className="px-5 py-3">
        <div className="flex items-center justify-end gap-2">
          <button onClick={onCancel} className="px-3 py-1.5 text-xs font-semibold text-slate-600 bg-slate-100 rounded-lg hover:bg-slate-200">
            Cancelar
          </button>
          <button onClick={handleSave} disabled={loading} className="px-3 py-1.5 text-xs font-semibold text-white rounded-lg disabled:opacity-60" style={{ backgroundColor: BRAND }}>
            {loading ? 'Salvando...' : 'Salvar'}
          </button>
        </div>
      </td>
    </tr>
  );
}
