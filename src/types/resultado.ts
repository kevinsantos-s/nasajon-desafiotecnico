export enum Status {
  OK = 'OK',
  NAO_ENCONTRADO = 'NAO_ENCONTRADO',
  AMBIGUO = 'AMBIGUO',
  ERRO_API = "ERRO_API",
}

export type Resultado = {
  municipio_input: string;
  populacao_input: number;
  municipio_ibge: string;
  uf: string;
  regiao: string;
  id_ibge: number | '';
  status: Status;
};