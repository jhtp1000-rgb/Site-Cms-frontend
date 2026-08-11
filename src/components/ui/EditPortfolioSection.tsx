// src/components/ui/EditPortfolioSection.tsx
import { useState, useEffect } from 'react';
import { EditAreaPlaceholder } from './EditAreaPlaceholder';

interface EditPortfolioSectionProps {
  id: string; // Importante para o scroll do AsideMenu funcionar
  sectionName: string;
  attributesDescription: string;
  status: 'PUBLICADO' | 'RASCUNHO';
  color: string; // Cor dinâmica do tenant (ex: #00966D)
}

export default function EditPortfolioSection({
  id,
  sectionName,
  attributesDescription,
  status,
  color
}: EditPortfolioSectionProps) {
  // Estados para controlar a interface
  const [isEditing, setIsEditing] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  // Efeito para voltar o botão "Salvo" para "Editar" após 3 segundos
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isSaved) {
      timer = setTimeout(() => {
        setIsSaved(false);
      }, 3000);
    }
    return () => clearTimeout(timer); // Cleanup caso o componente desmonte
  }, [isSaved]);

  const handleEditClick = () => {
    setIsEditing(true);
    setIsSaved(false);
  };

  const handleSaveClick = () => {
    // Aqui no futuro entrará a lógica de requisição para a API (Axios/Fetch)
    setIsEditing(false);
    setIsSaved(true);
  };

  return (
    <section 
      id={id} 
      className="w-full bg-white border border-slate-200 rounded-2xl shadow-sm mb-4 overflow-hidden transition-all"
    >
      {/* Cabeçalho do Card (Sempre visível) */}
      <div className="flex flex-col md:flex-row md:items-center justify-between p-5 md:p-6 gap-4">
        
        {/* Textos à esquerda */}
        <div>
          <h3 className="text-[#0F172A] font-bold text-lg mb-0.5">
            {sectionName}
          </h3>
          <p className="text-slate-500 text-sm">
            {attributesDescription}
          </p>
        </div>

        {/* Badge de Status e Botões à direita */}
        <div className="flex items-center gap-4 self-start md:self-auto">
          
          {/* Badge Dinâmico */}
          {status === 'PUBLICADO' ? (
            <span 
              className="px-2.5 py-1 text-xs font-bold rounded-md tracking-wide"
              style={{ backgroundColor: `${color}15`, color: color }} // Fundo bem clarinho com a cor do tenant
            >
              PUBLICADO
            </span>
          ) : (
            <span className="px-2.5 py-1 text-xs font-bold rounded-md tracking-wide bg-amber-50 text-amber-600 border border-amber-100">
              RASCUNHO
            </span>
          )}

          {/* Lógica de Transição dos Botões */}
          {isEditing ? (
            // Botão SALVAR
            <button
              onClick={handleSaveClick}
              className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white rounded-lg transition-colors hover:opacity-90 shadow-sm"
              style={{ backgroundColor: color }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
                <polyline points="17 21 17 13 7 13 7 21"></polyline>
                <polyline points="7 3 7 8 15 8"></polyline>
              </svg>
              Salvar
            </button>
          ) : isSaved ? (
            // Texto/Ícone SALVO (Estado temporário)
            <div 
              className="flex items-center gap-1.5 px-3 py-2 text-sm font-semibold animate-fade-in"
              style={{ color: color }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
              Salvo
            </div>
          ) : (
            // Botão EDITAR (Padrão)
            <button
              onClick={handleEditClick}
              className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-slate-600 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
              </svg>
              Editar
            </button>
          )}

        </div>
      </div>

      {/* Área Expandida (Subcomponente) */}
      {isEditing && (
        <EditAreaPlaceholder 
          sectionName={sectionName} 
          color={color} 
        />
      )}

    </section>
  );
}