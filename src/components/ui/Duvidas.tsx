import Pergunta from './Pergunta';

// Tipagem do item da API
export interface FaqItem {
  id: string | number;
  question: string;
  answer: string;
}

// Tipagem das Props
interface DuvidasProps {
  faqs: FaqItem[];
  color?: string; // Cor do tenant
}

export default function Duvidas({ faqs, color = '#00966D' }: DuvidasProps) {
  // Evita renderizar a seção vazia caso a API não retorne dados
  if (!faqs || faqs.length === 0) return null;

  return (
    <section id="duvidas" className="w-full">
      
      <div className="mb-6 md:mb-8">
        <span 
          className="text-xs font-extrabold tracking-widest uppercase block mb-1"
          style={{ color: color }}
        >
          DÚVIDAS
        </span>
        <h2 className="text-[#0F172A] text-2xl md:text-3xl font-bold">
          Perguntas Frequentes
        </h2>
      </div>

      <div className="flex flex-col gap-3 md:gap-4">
        {faqs.map((faq) => (
          <Pergunta 
            key={faq.id} 
            question={faq.question} 
            answer={faq.answer}
            color={color} // Repassa a cor para o componente filho
          />
        ))}
      </div>

    </section>
  );
}