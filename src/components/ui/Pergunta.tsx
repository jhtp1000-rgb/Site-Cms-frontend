import { useState } from 'react';

interface PerguntaProps {
  question: string;
  answer: string;
  color?: string; // Cor dinâmica do tenant
}

export default function Pergunta({ question, answer, color = '#00966D' }: PerguntaProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div 
      className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer"
      onClick={() => setIsOpen(!isOpen)}
    >
      <div className="flex items-center justify-between p-5 md:p-6">
        <h3 className="text-[#0F172A] font-bold text-base md:text-lg pr-4">
          {question}
        </h3>
        
        {/* Ícone dinâmico: Cinza quando fechado, cor do tenant quando aberto */}
        <div 
          className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${
            !isOpen ? 'bg-slate-100 text-slate-500' : ''
          }`}
          style={isOpen ? { backgroundColor: `${color}20`, color: color } : {}}
        >
          {isOpen ? (
            <svg width="14" height="2" viewBox="0 0 14 2" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 0H14V2H0V0Z" />
            </svg>
          ) : (
            <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 6V0H8V6H14V8H8V14H6V8H0V6H6Z" />
            </svg>
          )}
        </div>
      </div>

      {isOpen && (
        <div className="px-5 md:px-6 pb-5 md:pb-6 text-slate-500 text-sm md:text-base leading-relaxed border-t border-slate-50 pt-4">
          {answer}
        </div>
      )}
    </div>
  );
}