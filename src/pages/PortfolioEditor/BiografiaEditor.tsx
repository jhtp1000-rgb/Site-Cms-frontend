import { forwardRef, useImperativeHandle, useState, useEffect } from 'react';
import biografiaService from '../../services/biografiaService';
import type { SectionEditorHandle } from '../../types/section-editor';
import { FloatingField } from './FloatingField';

interface BiografiaEditorProps {
  paginaId: number;
  color: string;
}

export const BiografiaEditor = forwardRef<SectionEditorHandle, BiografiaEditorProps>(
  function BiografiaEditor({ paginaId, color }, ref) {
    const [value, setValue] = useState('');
    const [loadingInicial, setLoadingInicial] = useState(true);

    useEffect(() => {
      let ativo = true;
      (async () => {
        const res = await biografiaService.getByPagina(paginaId);
        if (ativo && res.success && res.data) setValue(res.data.conteudoTexto ?? '');
        if (ativo) setLoadingInicial(false);
      })();
      return () => {
        ativo = false;
      };
    }, [paginaId]);

    useImperativeHandle(ref, () => ({
      async save() {
        const res = await biografiaService.salvar({ paginaId, conteudoTexto: value });
        if (!res.success) throw new Error(res.error ?? 'Não foi possível salvar a biografia.');
      },
    }));

    return (
      <div className="p-5 md:p-6 bg-slate-50/50 border-t border-slate-100">
        {loadingInicial ? (
          <div className="w-full h-32 rounded-2xl skeleton-shimmer" />
        ) : (
          <>
            <FloatingField
              label="Sua biografia"
              value={value}
              onChange={(v: string) => (v.length <= 2000 ? setValue(v) : null)}
              color={color}
              multiline
              rows={5}
            />
            <p className="text-xs text-slate-400 mt-1.5 text-right">{value.length}/2000</p>
          </>
        )}
      </div>
    );
  }
);
