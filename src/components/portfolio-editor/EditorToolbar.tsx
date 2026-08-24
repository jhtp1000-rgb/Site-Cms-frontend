import { Link } from 'react-router-dom';

export type Viewport = 'desktop' | 'tablet' | 'mobile';

interface EditorToolbarProps {
  color: string;
  isDirty: boolean;
  saving: boolean;
  previewMode: boolean;
  viewport: Viewport;
  publicUrl: string;
  onChangeViewport: (v: Viewport) => void;
  onTogglePreview: () => void;
  onSave: () => void;
  onDiscard: () => void;
}

const VIEWPORTS: { key: Viewport; label: string }[] = [
  { key: 'desktop', label: 'Desktop' },
  { key: 'tablet', label: 'Tablet' },
  { key: 'mobile', label: 'Mobile' },
];

export function EditorToolbar({
  color,
  isDirty,
  saving,
  previewMode,
  viewport,
  publicUrl,
  onChangeViewport,
  onTogglePreview,
  onSave,
  onDiscard,
}: EditorToolbarProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 bg-white/80 backdrop-blur-xl border-b border-slate-200/70 px-4 py-3">
      <div className="flex items-center gap-2.5">
        <Link
          to="/dashboard"
          className="text-sm font-medium text-slate-500 hover:text-slate-800 transition-colors duration-150"
        >
          ← Voltar
        </Link>

        {isDirty && (
          <span className="hidden sm:inline text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-50 text-amber-600 border border-amber-100 animate-scale-in">
            Alterações não salvas
          </span>
        )}
      </div>

      <div className="flex items-center gap-0.5 bg-slate-100 rounded-xl p-1 order-3 sm:order-none w-full sm:w-auto justify-center">
        {VIEWPORTS.map((v) => (
          <button
            key={v.key}
            onClick={() => onChangeViewport(v.key)}
            className="px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all duration-200"
            style={
              viewport === v.key
                ? { backgroundColor: '#fff', color, boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }
                : { color: '#64748b' }
            }
          >
            {v.label}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-2">
        <a
          href={publicUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:inline text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors duration-150 px-2"
        >
          Ver página pública ↗
        </a>

        <button
          onClick={onTogglePreview}
          className="px-3 sm:px-3.5 py-2 text-sm font-semibold rounded-xl bg-slate-100 text-slate-600 hover:bg-slate-200 transition-all duration-150 active:scale-[0.97]"
        >
          <span className="hidden sm:inline">{previewMode ? 'Sair da pré-visualização' : 'Pré-visualizar'}</span>
          <span className="sm:hidden">Prévia</span>
        </button>

        <button
          onClick={onDiscard}
          disabled={!isDirty || saving}
          className="hidden sm:inline-block px-3.5 py-2 text-sm font-semibold rounded-xl bg-slate-100 text-slate-600 hover:bg-slate-200 transition-all duration-150 active:scale-[0.97] disabled:opacity-40 disabled:active:scale-100"
        >
          Desfazer
        </button>

        <button
          onClick={onSave}
          disabled={!isDirty || saving}
          className="px-4 py-2 text-sm font-semibold rounded-xl text-white transition-all duration-150 active:scale-[0.97] disabled:opacity-50 disabled:active:scale-100 hover:brightness-95"
          style={{ backgroundColor: color, boxShadow: isDirty ? `0 2px 8px ${color}40` : undefined }}
        >
          {saving ? 'Salvando...' : 'Salvar'}
        </button>
      </div>
    </div>
  );
}