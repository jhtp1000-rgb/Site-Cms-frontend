import { useState } from 'react';

interface PublicLinkBannerProps {
  paginaId: number;
  color: string;
}

export function PublicLinkBanner({ paginaId, color }: PublicLinkBannerProps) {
  const [copiado, setCopiado] = useState(false);
  const url = `${window.location.origin}/p/${paginaId}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2000);
    } catch {
      window.prompt('Copie o link:', url);
    }
  };

  return (
    <div
      className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white border rounded-2xl px-4 py-3.5 mb-4 transition-shadow duration-200 hover:shadow-sm animate-fade-in-up"
      style={{ borderColor: `${color}25` }}
    >
      <div className="flex items-center gap-2.5 min-w-0">
        <span
          className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: `${color}12`, color }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <line x1="2" y1="12" x2="22" y2="12" />
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
          </svg>
        </span>
        <span className="text-sm text-slate-500 truncate">
          Sua página pública:{' '}
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium hover:underline transition-colors"
            style={{ color }}
          >
            {url}
          </a>
        </span>
      </div>

      <button
        onClick={handleCopy}
        className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all duration-200 flex-shrink-0 self-start sm:self-auto active:scale-[0.96]"
        style={{
          backgroundColor: copiado ? `${color}15` : '#f1f5f9',
          color: copiado ? color : '#475569',
        }}
      >
        {copiado ? (
          <>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            Copiado!
          </>
        ) : (
          <>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
            </svg>
            Copiar link
          </>
        )}
      </button>
    </div>
  );
}
