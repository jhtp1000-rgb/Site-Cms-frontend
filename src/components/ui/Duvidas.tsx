
import Pergunta from './Pergunta';

export default function Duvidas() {
  const faqData = [
    {
      id: 1,
      question: "Quais serviços você oferece?",
      answer: "Ofereço consultoria em marketing digital, estratégia de conteúdo, SEO, gestão de redes sociais, branding e criação de identidade visual. Cada projeto é personalizado de acordo com as necessidades do cliente."
    },
    {
      id: 2,
      question: "Como funciona o processo de contratação?",
      answer: "Após o contato inicial, agendamos uma reunião para entender suas necessidades. Em seguida, envio uma proposta comercial e, após aprovação, iniciamos o onboarding do projeto."
    },
    {
      id: 3,
      question: "Qual o prazo médio para ver resultados?",
      answer: "O marketing digital é uma construção contínua. Resultados iniciais podem ser vistos nos primeiros 3 meses, mas a consolidação de métricas sólidas geralmente ocorre a partir do sexto mês."
    },
    {
      id: 4,
      question: "Você atende empresas de qual porte?",
      answer: "Atendo desde pequenos empreendedores e startups até médias empresas que buscam estruturar ou escalar sua presença no ambiente digital."
    },
    {
      id: 5,
      question: "Quais são as formas de pagamento?",
      answer: "Aceitamos pagamentos via PIX, transferência bancária e parcelamento no cartão de crédito, dependendo do escopo e do formato do contrato estabelecido."
    }
  ];

  return (
    <section id="duvidas" className="w-full">
      
      {/* Cabeçalho da Seção */}
      <div className="mb-6 md:mb-8">
        <span className="text-[#00966D] text-xs font-extrabold tracking-widest uppercase block mb-1">
          DÚVIDAS
        </span>
        <h2 className="text-[#0F172A] text-2xl md:text-3xl font-bold">
          Perguntas Frequentes
        </h2>
      </div>

      <div className="flex flex-col gap-3 md:gap-4">
        {faqData.map((faq) => (
          <Pergunta 
            key={faq.id} 
            question={faq.question} 
            answer={faq.answer} 
          />
        ))}
      </div>

    </section>
  );
}