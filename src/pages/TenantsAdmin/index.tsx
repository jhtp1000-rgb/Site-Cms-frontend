import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import tenantService from '../../services/tenantService';
import usuarioService from '../../services/usuarioService';
import { useNotification } from '../../contexts/NotificationContext';
import type { Tenant } from '../../types/tenant';
import { CreateTenantForm } from './CreateTenantForm';
import { EditTenantRow } from './EditTenantRow';

const BRAND = '#00966D';

interface TenantRow extends Tenant {
}

export default function TenantsAdmin() {
  const { showSuccess, showError } = useNotification();

  const [tenants, setTenants] = useState<TenantRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  const carregar = useCallback(async () => {
    setLoading(true);

    const [resTenants, resUsuarios] = await Promise.all([tenantService.getAll(), usuarioService.getAll()]);

    if (!resTenants.success || !resTenants.data) {
      showError(resTenants.error ?? 'Falha ao carregar a lista de tenants.');
      setLoading(false);
      return;
    }

    const usuarios = resUsuarios.data ?? [];

    const merged: TenantRow[] = resTenants.data.map((t) => {
      const usuarioAssociado = usuarios.find((u) => u.tenantId === t.id);
      return { ...t, email: usuarioAssociado?.email ?? '—' };
    });

    setTenants(merged);
    setLoading(false);
  }, [showError]);

  useEffect(() => {
    carregar();
  }, [carregar]);

  const handleCreate = async (nome: string, email: string, senha: string) => {
    const res = await tenantService.create({ nome, email, senha });
    if (res.success) {
      showSuccess('Tenant criado com sucesso.');
      setShowCreateForm(false);
      carregar();
    } else {
      showError(res.error ?? 'Não foi possível criar o tenant.');
    }
  };

  const handleUpdate = async (id: number, nome: string) => {
    const res = await tenantService.update(id, { nome, email: '', senha: '' });
    if (res.success) {
      showSuccess('Tenant atualizado.');
      setEditingId(null);
      carregar();
    } else {
      showError(res.error ?? 'Não foi possível atualizar o tenant.');
    }
  };

  const handleDelete = async (tenant: TenantRow) => {
    const confirmado = window.confirm(`Excluir o tenant "${tenant.nome}"? Essa ação não pode ser desfeita.`);
    if (!confirmado) return;

    const res = await tenantService.delete(tenant.id);
    if (res.success) {
      showSuccess('Tenant excluído.');
      carregar();
    } else {
      showError(res.error ?? 'Não foi possível excluir o tenant.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b border-slate-200 px-4 md:px-8 py-4 flex items-center justify-between">
        <div>
          <Link to="/dashboard" className="text-sm text-slate-400 hover:text-slate-600">
            ← Voltar ao painel
          </Link>
          <h1 className="text-xl font-bold text-[#0F172A] mt-0.5">Gerenciamento de Tenants</h1>
        </div>
        <button
          onClick={() => setShowCreateForm((v) => !v)}
          className="px-4 py-2 text-sm font-semibold text-white rounded-lg hover:opacity-90 transition-colors"
          style={{ backgroundColor: BRAND }}
        >
          {showCreateForm ? 'Cancelar' : '+ Novo Tenant'}
        </button>
      </header>

      <main className="max-w-4xl mx-auto p-4 md:p-8">
        <div className="bg-amber-50 border border-amber-100 text-amber-700 text-sm px-4 py-3 rounded-xl mb-6">
          A API atual permite <strong>criar, editar (somente o nome) e excluir tenants</strong>. Os usuários
          administradores são criados junto com o tenant, mas ainda não podem ser editados ou excluídos
          individualmente — o back não expõe esses endpoints por enquanto.
        </div>

        {showCreateForm && (
          <CreateTenantForm onCancel={() => setShowCreateForm(false)} onSubmit={handleCreate} />
        )}

        {loading ? (
          <div className="flex justify-center py-16">
            <div className="w-8 h-8 border-4 border-slate-200 border-t-[#00966D] rounded-full animate-spin" />
          </div>
        ) : tenants.length === 0 ? (
          <div className="text-center text-slate-400 py-16 bg-white border border-slate-200 rounded-2xl">
            Nenhum tenant cadastrado ainda.
          </div>
        ) : (
          <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-left text-slate-500">
                  <th className="px-5 py-3 font-medium">ID</th>
                  <th className="px-5 py-3 font-medium">Nome</th>
                  <th className="px-5 py-3 font-medium">E-mail (admin)</th>
                  <th className="px-5 py-3 font-medium text-right">Ações</th>
                </tr>
              </thead>
              <tbody>
                {tenants.map((tenant) =>
                  editingId === tenant.id ? (
                    <EditTenantRow
                      key={tenant.id}
                      tenant={tenant}
                      onCancel={() => setEditingId(null)}
                      onSubmit={(nome) => handleUpdate(tenant.id, nome)}
                    />
                  ) : (
                    <tr key={tenant.id} className="border-b border-slate-100 last:border-0">
                      <td className="px-5 py-3 text-slate-400">{tenant.id}</td>
                      <td className="px-5 py-3 font-medium text-slate-800">{tenant.nome}</td>
                      <td className="px-5 py-3 text-slate-500">{tenant.email}</td>
                      <td className="px-5 py-3">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => setEditingId(tenant.id)}
                            className="px-3 py-1.5 text-xs font-semibold text-slate-600 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors"
                          >
                            Editar
                          </button>
                          <button
                            onClick={() => handleDelete(tenant)}
                            className="px-3 py-1.5 text-xs font-semibold text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
                          >
                            Excluir
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}
