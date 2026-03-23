import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse';
import { stringify } from 'csv-stringify';
import { MunicipioInput } from '../types/input';
import { Resultado } from '../types/resultado';

export async function lerCSV(caminho: string): Promise<MunicipioInput[]> {
  const resultados: MunicipioInput[] = [];

  return new Promise((resolve, reject) => {
    fs.createReadStream(path.resolve(caminho))
      .pipe(parse({ columns: true, trim: true }))
      .on('data', (linha) => {
        resultados.push({
          municipio: linha.municipio,
          populacao: Number(linha.populacao),
        });
      })
      .on('end', () => resolve(resultados))
      .on('error', (err) => reject(err));
  });
}

export async function escreverCSV(resultados: Resultado[], caminho: string): Promise<void> {
  return new Promise((resolve, reject) => {
    stringify(resultados, { header: true })
      .pipe(fs.createWriteStream(path.resolve(caminho)))
      .on('finish', () => {
        resolve();
      })
      .on('error', (err) => reject(err));
  });
}