import CardRecurso from './CardRecurso';

export default function Recursos() {
  // Dados simulados (No futuro, isso virá da API ou do Firebase)
  const recursosMock = [
    {
      id: 1,
      title: "Auditoria de Marketing Gratuita",
      description: "Descubra o que está travando o crescimento do seu negócio digital.",
      imageUrl: "https://images.unsplash.com/photo-1542744094-24638ea0b3b5?q=80&w=600&auto=format&fit=crop", // Substitua pelas imagens reais
      tagText: "Grátis",
      hasSparkleIcon: true,
      link: "#"
    },
    {
      id: 2,
      title: "Guia: Social Media para Empresas",
      description: "Aprenda como usar as redes sociais para atrair clientes e aumentar suas vendas.",
      imageUrl: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?q=80&w=600&auto=format&fit=crop",
      tagText: "PDF Gratuito",
      hasSparkleIcon: false,
      link: "#"
    }
  ];

  return (
    // O id="recursos" é fundamental para a âncora da URL (/pagina#recursos)
    <section id="recursos" className="w-full">
      
      {/* Cabeçalho da Seção */}
      <div className="mb-6">
        <span className="text-[#00966D] text-xs font-extrabold tracking-widest uppercase block mb-1">
          Recursos
        </span>
        <h2 className="text-[#0F172A] text-2xl md:text-3xl font-bold">
          Conteúdo para você
        </h2>
      </div>

      {/* Lista de Cards */}
      <div className="flex flex-col gap-6">
        {recursosMock.map((recurso) => (
          <CardRecurso
            key={recurso.id}
            title={recurso.title}
            description={recurso.description}
            imageUrl={recurso.imageUrl}
            tagText={recurso.tagText}
            hasSparkleIcon={recurso.hasSparkleIcon}
            link={recurso.link}
          />
        ))}
      </div>
      
    </section>
  );
}