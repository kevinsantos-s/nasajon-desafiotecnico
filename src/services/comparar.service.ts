import { MunicipioIBGE } from '../types/ibge';
import { distance } from 'fastest-levenshtein';

function normalizar(nomeMunicipio: string): string {
  return nomeMunicipio
    .toLowerCase()
    .trim()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') 
    .replace(/[^a-z\s]/g, '');      
}

type ResultadoMatch =
  | { status: 'OK'; municipio: MunicipioIBGE }
  | { status: 'NAO_ENCONTRADO' }
  | { status: 'AMBIGUO' };

export function buscarMunicipio(
  nome: string,
  lista: MunicipioIBGE[]
): ResultadoMatch {
  const nomeNormalizado = normalizar(nome);

  const exatos = lista.filter((m) => normalizar(m.nome) === nomeNormalizado);

  if (exatos.length === 1) return { status: 'OK', municipio: exatos[0] };

  if (exatos.length > 1) return { status: 'AMBIGUO' };

  let municipioMaisProximo: MunicipioIBGE | null = null;
  let menorDistancia = Infinity;

  for (const municipio of lista) {
    const dist = distance(nomeNormalizado, normalizar(municipio.nome));
    if (dist < menorDistancia) {
      menorDistancia = dist;
      municipioMaisProximo = municipio;
    }
  }

  if (menorDistancia <= 2 && municipioMaisProximo) return { status: 'OK', municipio: municipioMaisProximo };

  return { status: 'NAO_ENCONTRADO' };
}