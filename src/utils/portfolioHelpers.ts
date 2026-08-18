
export function iniciais(nome: string): string {
  const partes = nome.trim().split(/\s+/);
  const letras = partes.slice(0, 2).map((p) => p.charAt(0).toUpperCase());
  return letras.join('') || '?';
}

export type ContatoKind = 'whatsapp' | 'email' | 'phone' | 'instagram' | 'other';

export function resolveContato(tipo: string, valor: string): { kind: ContatoKind; href: string } {
  const t = tipo.toLowerCase();
  if (t.includes('whatsapp')) {
    return { kind: 'whatsapp', href: `https://wa.me/${valor.replace(/\D/g, '')}` };
  }
  if (t.includes('email') || t.includes('e-mail')) {
    return { kind: 'email', href: `mailto:${valor}` };
  }
  if (t.includes('telefone') || t.includes('phone')) {
    return { kind: 'phone', href: `tel:${valor.replace(/\D/g, '')}` };
  }
  if (t.includes('instagram')) {
    return { kind: 'instagram', href: `https://instagram.com/${valor.replace('@', '')}` };
  }
  return { kind: 'other', href: valor };
}
