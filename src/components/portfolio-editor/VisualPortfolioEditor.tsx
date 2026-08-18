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
import { SectionsPanel } from './SectionsPanel';
import { InspectorPanel } from './InspectorPanel';
import { SortableSectionFrame } from './SortableSectionFrame';
import { PortfolioRenderer } from '../portfolio/PortfolioRenderer';
import { usePageLayout } from '../../hooks/usePageLayout';
import type { PortfolioViewModel } from '../../types/portfolio-view-model';
import type { SectionType } from '../../types/portfolio-layout';

interface VisualPortfolioEditorProps {
  paginaId: number;
  viewModel: PortfolioViewModel;
  color: string;
  onContentSaved: () => void;
}

const VIEWPORT_WIDTH: Record<Viewport, number | string> = {
  desktop: '100%',
  tablet: 768,
  mobile: 390,
};

export function VisualPortfolioEditor({
  paginaId,
  viewModel,
  color,
  onContentSaved,
}: VisualPortfolioEditorProps) {
  const {
    secoes,
    loading: loadingLayout,
    error: layoutError,
    saving,
    isDirty,
    setOrder,
    toggleVisibility,
    save,
    discard,
    isLocalOnly,
  } = usePageLayout(paginaId);

  const [selectedSection, setSelectedSection] = useState<SectionType | null>(null);
  const [viewport, setViewport] = useState<Viewport>('desktop');
  const [previewMode, setPreviewMode] = useState(false);
  const [sectionsOpen, setSectionsOpen] = useState(false);

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
    <div className="flex flex-col h-full">
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
          onOpenSections={() => setSectionsOpen(true)}
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

      <div className="flex flex-1 overflow-hidden relative">
        {!previewMode && (
          <SectionsPanel
            secoes={secoes}
            viewModel={viewModel}
            color={color}
            selectedSection={selectedSection}
            onSelect={setSelectedSection}
            onToggleVisibilidade={toggleVisibility}
            isOpen={sectionsOpen}
            onClose={() => setSectionsOpen(false)}
          />
        )}

        <div className="flex-1 min-w-0 overflow-y-auto bg-slate-100 p-3 sm:p-6 flex flex-col items-center">
          <div
            className="bg-white shadow-sm w-full"
            style={{
              maxWidth: VIEWPORT_WIDTH[viewport],
              transition: 'max-width 0.2s ease',
            }}
          >
            {previewMode ? (
              <PortfolioRenderer viewModel={viewModel} layout={secoes} mode="public" />
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
                    renderEditorSlot={(slot) => (
                      <SortableSectionFrame
                        tipo={slot.tipo}
                        temDado={slot.temDado}
                        visivel={slot.visivel}
                        selecionada={slot.selecionada}
                        color={color}
                        onSelect={setSelectedSection}
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
            color={color}
            onClose={() => setSelectedSection(null)}
            onSaved={onContentSaved}
          />
        )}
      </div>
    </div>
  );
}
