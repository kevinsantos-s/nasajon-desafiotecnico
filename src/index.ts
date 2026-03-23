import 'dotenv/config';
import { lerCSV, escreverCSV } from './services/csv.service';
import { IBGEService } from './services/ibge.service';
import { buscarMunicipio } from './services/comparar.service';
import { gerarStatus } from './services/status.service';
import { enviarResultados } from './services/submit.service';
import { Resultado, Status } from './types/resultado';

async function main() {
  try {
    const dadosInput = await lerCSV(process.env.INPUT_FILE!);
    const dadosIBGE = await IBGEService.getMunicipios();

    const municipiosUsados = new Set<number>();

    const resultadoFinal: Resultado[] = dadosInput.map((item) => {
      const match = buscarMunicipio(item.municipio, dadosIBGE);

      if (match.status === 'NAO_ENCONTRADO' || match.status === 'AMBIGUO') {
        return {
          municipio_input: item.municipio,
          populacao_input: item.populacao,
          municipio_ibge: '',
          uf: '',
          regiao: '',
          id_ibge: '' as const,
          status: Status.NAO_ENCONTRADO,
        };
      }

      if (municipiosUsados.has(match.municipio.id)) {
        return {
          municipio_input: item.municipio,
          populacao_input: item.populacao,
          municipio_ibge: '',
          uf: '',
          regiao: '',
          id_ibge: '' as const,
          status: Status.NAO_ENCONTRADO,
        };
      }

      municipiosUsados.add(match.municipio.id);
      return {
        municipio_input: item.municipio,
        populacao_input: item.populacao,
        municipio_ibge: match.municipio.nome,
        uf: match.municipio.uf,
        regiao: match.municipio.regiao,
        id_ibge: match.municipio.id,
        status: Status.OK,
      };
    });

    await escreverCSV(resultadoFinal, process.env.OUTPUT_FILE!);
    console.log('CSV de resultados gerado com sucesso!');

    const stats = gerarStatus(resultadoFinal);
    console.log('\nEstatísticas finais:');
    console.log(JSON.stringify(stats, null, 2));

    await enviarResultados(stats);
  } catch (error) {
    console.error('Ocorreu um erro:', error);
    process.exit(1);
  }
}

main();