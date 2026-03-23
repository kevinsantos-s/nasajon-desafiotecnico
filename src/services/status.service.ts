import { Resultado, Status } from '../types/resultado';

export function gerarStatus(resultados: Resultado[]) {
  const ok = resultados.filter((r) => r.status === Status.OK);
  const naoEncontrado = resultados.filter((r) => r.status === Status.NAO_ENCONTRADO);
  const erroApi = resultados.filter((r) => r.status === Status.ERRO_API);

  const pop_total_ok = ok.reduce((acc, resultado) => acc + resultado.populacao_input, 0);

  const regioes: Record<string, number[]> = {};
  for (const resultado of ok) {
    if (!regioes[resultado.regiao]) regioes[resultado.regiao] = [];
    regioes[resultado.regiao].push(resultado.populacao_input);
  }

  const medias_por_regiao: Record<string, number> = {};
  for (const [regiao, pops] of Object.entries(regioes)) {
    const media = pops.reduce((a, b) => a + b, 0) / pops.length;
    medias_por_regiao[regiao] = parseFloat(media.toFixed(2));
  }

  return {
    total_municipios: resultados.length,
    total_ok: ok.length,
    total_nao_encontrado: naoEncontrado.length,
    total_erro_api: erroApi.length,
    pop_total_ok,
    medias_por_regiao,
  };
}