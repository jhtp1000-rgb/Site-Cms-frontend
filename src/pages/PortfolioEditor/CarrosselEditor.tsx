import { forwardRef, useImperativeHandle, useState, useEffect } from 'react';
import carrosselService from '../../services/carrosselService';
import type { ImagemCarrossel } from '../../types/carrossel';
import type { SectionEditorHandle } from '../../types/section-editor';

interface CarrosselEditorProps {
  paginaId: number;
  color: string;
}

export const CarrosselEditor = forwardRef<SectionEditorHandle, CarrosselEditorProps>(
  function CarrosselEditor({ paginaId, color }, ref) {
    const [carrosselId, setCarrosselId] = useState<number | null>(null);
    const [imagens, setImagens] = useState<ImagemCarrossel[]>([]);
    const [loadingInicial, setLoadingInicial] = useState(true);
    const [titulo, setTitulo] = useState('');
    const [descricao, setDescricao] = useState('');
    const [urlMidia, setUrlMidia] = useState('');
    const [linkExterno, setLinkExterno] = useState('');
    const [adicionando, setAdicionando] = useState(false);
    const [erro, setErro] = useState<string | null>(null);

    useEffect(() => {
      let ativo = true;
      (async () => {
        const res = await carrosselService.getByPagina(paginaId);
        if (ativo && res.success && res.data && res.data.length > 0) {
          setCarrosselId(res.data[0].id);
          setImagens(res.data[0].imagens ?? []);
        }
        if (ativo) setLoadingInicial(false);
      })();
      return () => {
        ativo = false;
      };
    }, [paginaId]);

    useImperativeHandle(ref, () => ({ async save() {} }));

    const handleAdd = async () => {
      if (!urlMidia.trim()) return;
      setAdicionando(true);
      setErro(null);

      let idCarrossel = carrosselId;
      if (idCarrossel === null) {
        const resCarrossel = await carrosselService.create({ paginaId });
        if (!resCarrossel.success || !resCarrossel.data) {
          setErro(resCarrossel.error ?? 'Não foi possível criar o carrossel.');
          setAdicionando(false);
          return;
        }
        idCarrossel = resCarrossel.data.id;
        setCarrosselId(idCarrossel);
      }

      const res = await carrosselService.addImagem({
        carrosselId: idCarrossel,
        ordemExibicao: imagens.length,
        urlMidia,
        titulo,
        descricao,
        linkExterno,
      });

      if (res.success && res.data) {
        setImagens((prev) => [...prev, res.data!]);
        setTitulo('');
        setDescricao('');
        setUrlMidia('');
        setLinkExterno('');
      } else {
        setErro(res.error ?? 'Não foi possível adicionar o projeto.');
      }
      setAdicionando(false);
    };

    const handleDelete = async (id: number) => {
      const res = await carrosselService.deleteImagem(id);
      if (res.success) setImagens((prev) => prev.filter((i) => i.id !== id));
      else setErro(res.error ?? 'Não foi possível excluir o projeto.');
    };

    if (loadingInicial) {
      return (
        <div className="p-5 md:p-6 bg-slate-50/50 border-t border-slate-100">
          <div className="w-full h-16 rounded-xl skeleton-shimmer" />
        </div>
      );
    }

    return (
      <div className="p-5 md:p-6 bg-slate-50/50 border-t border-slate-100 space-y-4">
        {imagens.length > 0 && (
          <ul className="space-y-2">
            {imagens.map((img) => (
              <li
                key={img.id}
                className="group flex items-center gap-3 bg-white border border-slate-200 rounded-2xl p-2.5 transition-all duration-150 hover:shadow-md hover:border-slate-300 animate-fade-in"
              >
                {img.urlMidia ? (
                  <img
                    src={img.urlMidia}
                    alt={img.titulo}
                    className="w-12 h-12 object-cover rounded-xl flex-shrink-0 ring-1 ring-slate-200"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-xl flex-shrink-0 bg-slate-100 flex items-center justify-center text-slate-300">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="3" width="18" height="18" rx="2" />
                      <circle cx="8.5" cy="8.5" r="1.5" />
                      <path d="M21 15l-5-5L5 21" />
                    </svg>
                  </div>
                )}
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-slate-800 text-sm truncate">{img.titulo || '(sem título)'}</p>
                  <p className="text-slate-400 text-xs truncate">{img.descricao || 'Sem descrição'}</p>
                </div>
                <button
                  onClick={() => handleDelete(img.id)}
                  className="w-8 h-8 flex-shrink-0 flex items-center justify-center rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-all duration-150 opacity-0 group-hover:opacity-100"
                  aria-label="Excluir"
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="3 6 5 6 21 6" />
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                  </svg>
                </button>
              </li>
            ))}
          </ul>
        )}

        <div className="bg-white border border-dashed border-slate-200 rounded-2xl p-4 space-y-2.5">
          <input
            value={urlMidia}
            onChange={(e) => setUrlMidia(e.target.value)}
            placeholder="URL da imagem"
            className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm outline-none transition-all duration-150 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
          />
          <input
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            placeholder="Título do projeto"
            className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm outline-none transition-all duration-150 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
          />
          <textarea
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            placeholder="Descrição"
            rows={2}
            className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm outline-none resize-y transition-all duration-150 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
          />
          <input
            value={linkExterno}
            onChange={(e) => setLinkExterno(e.target.value)}
            placeholder="Link externo (opcional)"
            className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm outline-none transition-all duration-150 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
          />
          <button
            onClick={handleAdd}
            disabled={adicionando}
            className="w-full px-4 py-2.5 text-sm font-semibold text-white rounded-xl transition-all duration-150 active:scale-[0.97] disabled:opacity-60 disabled:active:scale-100"
            style={{ backgroundColor: color, boxShadow: `0 2px 10px ${color}30` }}
          >
            {adicionando ? 'Adicionando...' : '+ Adicionar projeto'}
          </button>
        </div>

        {erro && <p className="text-sm text-red-600 bg-red-50 border border-red-100 px-3.5 py-2.5 rounded-xl">{erro}</p>}
      </div>
    );
  }
);
