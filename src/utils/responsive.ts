export type SimViewport = 'desktop' | 'tablet' | 'mobile' | undefined;

type BreakpointKey = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
const ORDER: BreakpointKey[] = ['xs', 'sm', 'md', 'lg', 'xl'];

function bucketFor(viewport: SimViewport): BreakpointKey {
  if (viewport === 'mobile') return 'xs';
  if (viewport === 'tablet') return 'sm';
  return 'md';
}

type RespValues<T> = { xs: T } & Partial<Record<Exclude<BreakpointKey, 'xs'>, T>>;

export function resp<T>(viewport: SimViewport, values: RespValues<T>): T | RespValues<T> {
  if (!viewport) return values;

  const bucket = bucketFor(viewport);
  const bucketIndex = ORDER.indexOf(bucket);

  for (let i = bucketIndex; i >= 0; i--) {
    const valor = values[ORDER[i]];
    if (valor !== undefined) return valor;
  }
  return values.xs;
}