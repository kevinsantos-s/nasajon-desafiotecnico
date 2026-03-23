export type IBGEApiResponse = {
  id: number;
  nome: string;
  microrregiao: {
    mesorregiao: {
      UF: {
        sigla: string;
        regiao: {
          nome: string;
        };
      };
    };
  };
};

export type MunicipioIBGE = {
  id: number;
  nome: string;
  uf: string;
  regiao: string;
};