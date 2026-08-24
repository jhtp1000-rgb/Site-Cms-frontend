import { forwardRef, useImperativeHandle, useState, useEffect } from 'react';
import biografiaService from '../../services/biografiaService';
import tenantService from '../../services/tenantService';
import type { SectionEditorHandle } from '../../types/section-editor';
import { FloatingField } from './FloatingField';

interface BiografiaEditorProps {
  paginaId: number;
  tenantId: number;
  color: string;
}

export const BiografiaEditor = forwardRef<SectionEditorHandle, BiografiaEditorProps>(
  function BiografiaEditor({ paginaId, tenantId, color }, ref) {
    const [nome, setNome] = useState('');
    const [value, setValue] = useState('');
    const [loadingInicial, setLoadingInicial] = useState(true);

    useEffect(() => {
      let ativo = true;
      (async () => {
        const [resBio, resTenant] = await Promise.all([
          biografiaService.getByPagina(paginaId),
          tenantService.getById(tenantId),
        ]);
        if (ativo) {
          if (resBio.success && resBio.data) setValue(resBio.data.conteudoTexto ?? '');
          if (resTenant.success && resTenant.data) setNome(resTenant.data.nome ?? '');
          setLoadingInicial(false);
        }
      })();
      return () => {
        ativo = false;
      };
    }, [paginaId, tenantId]);

    useImperativeHandle(ref, () => ({
      async save() {
        const [resBio, resTenant] = await Promise.all([
          biografiaService.salvar({ paginaId, conteudoTexto: value }),
          tenantService.update(tenantId, { nome, email: '', senha: '' }),
        ]);
        if (!resBio.success) throw new Error(resBio.error ?? 'Não foi possível salvar a biografia.');
        if (!resTenant.success) throw new Error(resTenant.error ?? 'Não foi possível salvar o nome.');
      },
    }));

    if (loadingInicial) {
      return (
        <div className="p-5 md:p-6 bg-slate-50/50 border-t border-slate-100">
          <div className="w-full h-32 rounded-2xl skeleton-shimmer" />
        </div>
      );
    }

    return (
      <div className="p-5 md:p-6 bg-slate-50/50 border-t border-slate-100 space-y-4">
        <FloatingField label="Nome" value={nome} onChange={setNome} color={color} />

        <div>
          <FloatingField
            label="Sua biografia"
            value={value}
            onChange={(v: string) => (v.length <= 2000 ? setValue(v) : null)}
            color={color}
            multiline
            rows={5}
          />
          <p className="text-xs text-slate-400 mt-1.5 text-right">{value.length}/2000</p>
        </div>
      </div>
    );
  }
);
