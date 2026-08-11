import FormaContato,{type FormaContatoProps } from './FormaContato';

// Tipagem para receber os dados via API
interface ContatoProps {
  contatos: Omit<FormaContatoProps, 'color'>[]; // Lista dinâmica vinda do backend
  horarioAtendimento: string;
  tempoResposta: string;
  color?: string; // Cor do tenant
}

export default function Contato({ 
  contatos, 
  horarioAtendimento, 
  tempoResposta, 
  color = '#00966D' 
}: ContatoProps) {
  
  // Renderização de segurança caso a API não envie contatos
  if (!contatos || contatos.length === 0) return null;

  return (
    <section id="contato" className="w-full">
      
      <div className="mb-6 md:mb-8">
        <span 
          className="text-xs font-extrabold tracking-widest uppercase block mb-1"
          style={{ color: color }}
        >
          CONTATO
        </span>
        <h2 className="text-[#0F172A] text-2xl md:text-3xl font-bold mb-2">
          Vamos conversar?
        </h2>
        <p className="text-slate-500 text-sm md:text-base">
          Escolha o canal de sua preferência para entrar em contato.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        {contatos.map((contato, index) => (
          <FormaContato 
            key={index}
            type={contato.type}
            label={contato.label}
            value={contato.value}
            link={contato.link}
            color={color} // Repassa a cor para o componente filho
          />
        ))}
      </div>

      {/* Banner dinâmico com a cor do tenant */}
      <div 
        className="rounded-2xl p-6 text-white flex flex-col md:justify-center"
        style={{ backgroundColor: color }}
      >
        <div className="flex items-center gap-2 mb-2 opacity-90">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/>
            <polyline points="12 6 12 12 16 14"/>
          </svg>
          <span className="text-sm font-medium">Horário de atendimento</span>
        </div>
        
        <h3 className="text-lg md:text-xl font-bold mb-1">
          {horarioAtendimento}
        </h3>
        <p className="text-white/80 text-sm">
          {tempoResposta}
        </p>
      </div>

    </section>
  );
}