import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { SECTION_LABELS, type SectionType } from '../../types/portfolio-layout';
import { EmptySectionPlaceholder } from './EmptySectionPlaceholder';

interface SortableSectionFrameProps {
  tipo: SectionType;
  temDado: boolean;
  visivel: boolean;
  selecionada: boolean;
  color: string;
  onSelect: (tipo: SectionType) => void;
  onToggleVisibilidade: (tipo: SectionType) => void;
  children: React.ReactNode;
}

export function SortableSectionFrame({
  tipo,
  temDado,
  visivel,
  selecionada,
  color,
  onSelect,
  onToggleVisibilidade,
  children,
}: SortableSectionFrameProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: tipo,
  });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : visivel ? 1 : 0.45,
    position: 'relative',
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="group"
      data-section-type={tipo}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          border: selecionada ? `2px solid ${color}` : '2px solid transparent',
          borderRadius: 4,
          zIndex: 2,
          transition: 'border-color 0.15s',
        }}
      />

      <div
        className="opacity-0 group-hover:opacity-100"
        style={{
          position: 'absolute',
          top: 8,
          left: 8,
          zIndex: 3,
          display: 'flex',
          alignItems: 'center',
          gap: 4,
          background: '#0F172A',
          borderRadius: 8,
          padding: '4px 6px',
          opacity: selecionada ? 1 : undefined,
          transition: 'opacity 0.15s',
        }}
      >
        <button
          {...attributes}
          {...listeners}
          type="button"
          aria-label={`Mover seção ${SECTION_LABELS[tipo]}`}
          style={{
            cursor: 'grab',
            color: '#fff',
            background: 'transparent',
            border: 'none',
            padding: 4,
            display: 'flex',
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <circle cx="9" cy="6" r="1.5" />
            <circle cx="15" cy="6" r="1.5" />
            <circle cx="9" cy="12" r="1.5" />
            <circle cx="15" cy="12" r="1.5" />
            <circle cx="9" cy="18" r="1.5" />
            <circle cx="15" cy="18" r="1.5" />
          </svg>
        </button>

        <span style={{ color: '#fff', fontSize: 11, fontWeight: 600, padding: '0 2px' }}>
          {SECTION_LABELS[tipo]}
        </span>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onSelect(tipo);
          }}
          style={{
            color: '#fff',
            background: 'transparent',
            border: 'none',
            padding: 4,
            cursor: 'pointer',
            fontSize: 11,
            fontWeight: 600,
          }}
        >
          Editar
        </button>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onToggleVisibilidade(tipo);
          }}
          style={{
            color: '#fff',
            background: 'transparent',
            border: 'none',
            padding: 4,
            cursor: 'pointer',
            fontSize: 11,
            fontWeight: 600,
          }}
        >
          {visivel ? 'Ocultar' : 'Mostrar'}
        </button>
      </div>

      <div style={{ pointerEvents: 'none' }}>{temDado ? children : null}</div>

      {!temDado && <EmptySectionPlaceholder tipo={tipo} onClick={() => onSelect(tipo)} />}

      <div
        onClick={() => onSelect(tipo)}
        style={{ position: 'absolute', inset: 0, cursor: 'pointer', zIndex: 1 }}
      />
    </div>
  );
}
