
export interface ContatoItem {
  id: number;
  tipoContato: string;
  valorContato: string;
}

export interface BotaoCtaItem {
  id: number;
  textoExibicao: string;
  linkDestino: string;
}

export interface CardCtaItem {
  id: number;
  urlImagem: string;
  textoDestaque: string;
  linkDestino: string;
}

export interface ImagemItem {
  id: number;
  titulo: string;
  descricao: string;
  urlMidia: string;
  linkExterno: string;
}

export interface FeedbackItem {
  id: number;
  nomeCliente: string;
  textoAvaliacao: string;
  dataFeedback: string;
}

export interface AccordionItem {
  id: number;
  perguntaTitulo: string;
  respostaConteudo: string;
}

export interface PortfolioViewModel {
  paginaId: number;
  tituloPagina: string;
  nomeTenant: string;
  bio: string | null;
  contatos: ContatoItem[];
  botoesCta: BotaoCtaItem[];
  cardsCta: CardCtaItem[];
  imagensCarrossel: ImagemItem[];
  feedbacks: FeedbackItem[];
  faqs: AccordionItem[];
}
