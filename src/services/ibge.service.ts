import axios from 'axios';
import { IBGEApiResponse, MunicipioIBGE } from '../types/ibge';
import 'dotenv/config';

const IBGE_URL = process.env.IBGE_URL!;

export class IBGEService {
  static async getMunicipios(): Promise<MunicipioIBGE[]> {
    try {
      const response = await axios.get<IBGEApiResponse[]>(IBGE_URL);

      return response.data
        .filter((m) => m.microrregiao?.mesorregiao?.UF) 
        .map((m) => ({
          id: m.id,
          nome: m.nome,
          uf: m.microrregiao.mesorregiao.UF.sigla,
          regiao: m.microrregiao.mesorregiao.UF.regiao.nome,
        }));
    } catch (error) {
      console.error('Erro ao buscar IBGE:', error);
      throw new Error('ERRO_API');
    }
  }
}