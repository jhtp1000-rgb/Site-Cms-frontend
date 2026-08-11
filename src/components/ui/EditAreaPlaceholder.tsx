interface EditAreaPlaceholderProps {
  sectionName: string;
  color: string;
}

export function EditAreaPlaceholder({ sectionName, color }: EditAreaPlaceholderProps) {
  return (
    <div className="p-5 md:p-6 bg-slate-50 border-t border-slate-100">
      <textarea
        className="w-full h-24 p-4 text-sm bg-white border border-slate-200 rounded-lg outline-none resize-y transition-colors focus:ring-1"
        placeholder={`Conteúdo editável da seção "${sectionName}". Clique em Salvar para confirmar as alterações.`}
        style={{ 
          borderColor: 'transparent', // Deixa a borda padrão do tailwind agir até o focus
          '--tw-ring-color': color,
          '--tw-border-opacity': '1'
        } as React.CSSProperties}
        // Aplica a cor dinâmica no focus usando classes utilitárias e variáveis CSS
        onFocus={(e) => e.target.style.borderColor = color}
        onBlur={(e) => e.target.style.borderColor = '#e2e8f0'} // slade-200
      />
    </div>
  );
}