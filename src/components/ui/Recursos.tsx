import CardRecurso from './CardRecurso';

// Tipagem do item da API
export interface RecursoItem {
  id: string | number;
  title: string;
  description: string;
  imageUrl: string;
  tagText: string;
  hasSparkleIcon?: boolean;
  link: string;
}

// Tipagem das Props
interface RecursosProps {
  recursos: RecursoItem[];
  color?: string; // Cor do tenant
}

export default function Recursos({ recursos, color = '#00966D' }: RecursosProps) {
  // Evita renderizar a seção vazia caso a API não retorne dados
  if (!recursos || recursos.length === 0) return null;

  return (
    <section id="recursos" className="w-full">
      
      <div className="mb-6">
        <span 
          className="text-xs font-extrabold tracking-widest uppercase block mb-1"
          style={{ color: color }}
        >
          Recursos
        </span>
        <h2 className="text-[#0F172A] text-2xl md:text-3xl font-bold">
          Conteúdo para você
        </h2>
      </div>

      <div className="flex flex-col gap-6">
        {recursos.map((recurso) => (
          <CardRecurso
            key={recurso.id}
            title={recurso.title}
            description={recurso.description}
            imageUrl={recurso.imageUrl}
            tagText={recurso.tagText}
            hasSparkleIcon={recurso.hasSparkleIcon}
            link={recurso.link}
            color={color} // Repassa a cor do tenant para estilizar a tag e o botão dentro do card
          />
        ))}
      </div>
      
    </section>
  );
}