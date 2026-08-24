import { useState, useEffect, useCallback, useMemo } from 'react';
import {
  type PageLayout,
  type PageLayoutSection,
  type SectionType,
  buildDefaultLayout,
} from '../types/portfolio-layout';

function storageKey(paginaId: number): string {
  return `@App:layout:${paginaId}`;
}

const localLayoutRepository = {
  get(paginaId: number): PageLayout | null {
    try {
      const raw = localStorage.getItem(storageKey(paginaId));
      if (!raw) return null;
      return JSON.parse(raw) as PageLayout;
    } catch {
      return null;
    }
  },
  set(paginaId: number, layout: PageLayout): void {
    localStorage.setItem(storageKey(paginaId), JSON.stringify(layout));
  },
};

interface UsePageLayoutOptions {
  readOnly?: boolean;
}

export function usePageLayout(paginaId: number | null, options: UsePageLayoutOptions = {}) {
  const { readOnly = false } = options;

  const [savedLayout, setSavedLayout] = useState<PageLayout | null>(null);
  const [draftSecoes, setDraftSecoes] = useState<PageLayoutSection[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (paginaId == null) {
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const existente = localLayoutRepository.get(paginaId);
      const resolvido = existente ?? buildDefaultLayout(paginaId);
      setSavedLayout(resolvido);
      setDraftSecoes(resolvido.secoes);
    } catch {
      setError('Não foi possível carregar o layout salvo. Usando a ordem padrão.');
      setSavedLayout(buildDefaultLayout(paginaId));
      setDraftSecoes(buildDefaultLayout(paginaId).secoes);
    } finally {
      setLoading(false);
    }
  }, [paginaId]);

  const isDirty = useMemo(() => {
    if (!savedLayout) return false;
    return JSON.stringify(savedLayout.secoes) !== JSON.stringify(draftSecoes);
  }, [savedLayout, draftSecoes]);

  const moveSection = useCallback((tipo: SectionType, novaOrdem: number) => {
    setDraftSecoes((prev) => {
      const ordenado = [...prev].sort((a, b) => a.ordem - b.ordem);
      const atualIndex = ordenado.findIndex((s) => s.tipo === tipo);
      if (atualIndex === -1) return prev;

      const [item] = ordenado.splice(atualIndex, 1);
      const destino = Math.max(0, Math.min(novaOrdem, ordenado.length));
      ordenado.splice(destino, 0, item);

      return ordenado.map((s, index) => ({ ...s, ordem: index }));
    });
  }, []);

  const reorderByDrag = useCallback((tipoOrigem: SectionType, tipoDestino: SectionType) => {
    setDraftSecoes((prev) => {
      const ordenado = [...prev].sort((a, b) => a.ordem - b.ordem);
      const fromIndex = ordenado.findIndex((s) => s.tipo === tipoOrigem);
      const toIndex = ordenado.findIndex((s) => s.tipo === tipoDestino);
      if (fromIndex === -1 || toIndex === -1) return prev;

      const [item] = ordenado.splice(fromIndex, 1);
      ordenado.splice(toIndex, 0, item);

      return ordenado.map((s, index) => ({ ...s, ordem: index }));
    });
  }, []);

  const toggleVisibility = useCallback((tipo: SectionType) => {
    setDraftSecoes((prev) =>
      prev.map((s) => (s.tipo === tipo ? { ...s, visivel: !s.visivel } : s))
    );
  }, []);

  const setOrder = useCallback((novaOrdemTipos: SectionType[]) => {
    setDraftSecoes((prev) => {
      const porTipo = new Map(prev.map((s) => [s.tipo, s]));
      return novaOrdemTipos
        .map((tipo, index) => {
          const existente = porTipo.get(tipo);
          return existente ? { ...existente, ordem: index } : null;
        })
        .filter((s): s is PageLayoutSection => s !== null);
    });
  }, []);

  const save = useCallback(async () => {
    if (paginaId == null) return;
    setSaving(true);
    setError(null);
    try {
      const novoLayout: PageLayout = { paginaId, secoes: draftSecoes };
      localLayoutRepository.set(paginaId, novoLayout);
      setSavedLayout(novoLayout);
    } catch {
      setError('Não foi possível salvar o layout.');
      throw new Error('Falha ao salvar layout');
    } finally {
      setSaving(false);
    }
  }, [paginaId, draftSecoes]);

  const discard = useCallback(() => {
    if (savedLayout) setDraftSecoes(savedLayout.secoes);
  }, [savedLayout]);

  const secoesOrdenadas = useMemo(
    () => [...draftSecoes].sort((a, b) => a.ordem - b.ordem),
    [draftSecoes]
  );

  return {
    secoes: readOnly ? (savedLayout?.secoes ?? []).sort((a, b) => a.ordem - b.ordem) : secoesOrdenadas,
    loading,
    error,
    saving,
    isDirty: readOnly ? false : isDirty,
    moveSection,
    reorderByDrag,
    setOrder,
    toggleVisibility,
    save,
    discard,
    isLocalOnly: true as const,
  };
}
