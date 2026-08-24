import { useState } from 'react';
import {
  DndContext,
  closestCenter,
  PointerSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
  sortableKeyboardCoordinates,
} from '@dnd-kit/sortable';
import { EditorToolbar, type Viewport } from './EditorToolbar';
import { InspectorPanel } from './InspectorPanel';
import { SortableSectionFrame } from './SortableSectionFrame';
import { PortfolioRenderer } from '../portfolio/PortfolioRenderer';
import type { PortfolioViewModel } from '../../types/portfolio-view-model';
import type { PageLayoutSection, SectionType } from '../../types/portfolio-layout';

interface VisualPortfolioEditorProps {
  paginaId: number;
  tenantId: number;
  viewModel: PortfolioViewModel;
  color: string;
  onContentSaved: () => void;
  secoes: PageLayoutSection[];
  loadingLayout: boolean;
  layoutError: string | null;
  saving: boolean;
  isDirty: boolean;
  setOrder: (tipos: SectionType[]) => void;
  toggleVisibility: (tipo: SectionType) => void;
  save: () => Promise<void>;
  discard: () => void;
  selectedSection: SectionType | null;
  onSelectSection: (tipo: SectionType | null) => void;
}

const VIEWPORT_WIDTH: Record<Viewport, number | string> = {
  desktop: '100%',
  tablet: 768,
  mobile: 390,
};

export function VisualPortfolioEditor({
  paginaId,
  tenantId,
  viewModel,
  color,
  onContentSaved,
  secoes,
  loadingLayout,
  layoutError,
  saving,
  isDirty,
  setOrder,
  toggleVisibility,
  save,
  discard,
  selectedSection,
  onSelectSection,
}: VisualPortfolioEditorProps) {
  const [viewport, setViewport] = useState<Viewport>('desktop');
  const [previewMode, setPreviewMode] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const ordenados = [...secoes].sort((a, b) => a.ordem - b.ordem).map((s) => s.tipo);
    const fromIndex = ordenados.indexOf(active.id as SectionType);
    const toIndex = ordenados.indexOf(over.id as SectionType);
    if (fromIndex === -1 || toIndex === -1) return;

    const novaOrdem = [...ordenados];
    novaOrdem.splice(fromIndex, 1);
    novaOrdem.splice(toIndex, 0, active.id as SectionType);
    setOrder(novaOrdem);
  };

  const publicUrl = `${window.location.origin}/p/${paginaId}`;

  if (loadingLayout) {
    return (
      <div className="flex items-center justify-center h-96">
        <div
          className="w-8 h-8 border-4 border-slate-200 rounded-full animate-spin"
          style={{ borderTopColor: color }}
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full min-h-0">
      {!previewMode && (
        <EditorToolbar
          color={color}
          isDirty={isDirty}
          saving={saving}
          previewMode={previewMode}
          viewport={viewport}
          publicUrl={publicUrl}
          onChangeViewport={setViewport}
          onTogglePreview={() => setPreviewMode(true)}
          onSave={save}
          onDiscard={discard}
        />
      )}

      {previewMode && (
        <div className="flex items-center justify-between bg-white border-b border-slate-200 px-4 py-3">
          <span className="text-sm text-slate-500">Modo pré-visualização</span>
          <button
            onClick={() => setPreviewMode(false)}
            className="px-3 py-1.5 text-sm font-semibold rounded-lg text-white"
            style={{ backgroundColor: color }}
          >
            Voltar a editar
          </button>
        </div>
      )}

      {layoutError && (
        <div className="bg-red-50 text-red-600 text-xs px-4 py-2 border-b border-red-100">
          {layoutError}
        </div>
      )}

      <div className="flex flex-1 min-h-0 overflow-hidden relative">
        <div className="flex-1 min-w-0 overflow-y-auto bg-slate-100 p-3 sm:p-6 flex flex-col items-center">
          <div
            className="bg-white shadow-sm w-full"
            style={{
              maxWidth: VIEWPORT_WIDTH[viewport],
              transition: 'max-width 0.2s ease',
            }}
          >
            {previewMode ? (
              <PortfolioRenderer viewModel={viewModel} layout={secoes} mode="public" viewport={viewport} />
            ) : (
              <DndContext
                key={viewport}
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
              >
                <SortableContext
                  items={secoes.map((s) => s.tipo)}
                  strategy={verticalListSortingStrategy}
                >
                  <PortfolioRenderer
                    viewModel={viewModel}
                    layout={secoes}
                    mode="editor"
                    selectedSection={selectedSection}
                    viewport={viewport}
                    renderEditorSlot={(slot) => (
                      <SortableSectionFrame
                        tipo={slot.tipo}
                        temDado={slot.temDado}
                        visivel={slot.visivel}
                        selecionada={slot.selecionada}
                        color={color}
                        onSelect={onSelectSection}
                        onToggleVisibilidade={toggleVisibility}
                      >
                        {slot.children}
                      </SortableSectionFrame>
                    )}
                  />
                </SortableContext>
              </DndContext>
            )}
          </div>
        </div>

        {!previewMode && selectedSection && (
          <InspectorPanel
            tipo={selectedSection}
            paginaId={paginaId}
            tenantId={tenantId}
            color={color}
            onClose={() => onSelectSection(null)}
            onSaved={onContentSaved}
          />
        )}
      </div>
    </div>
  );
}
