import { gerarStatus } from './status.service';

const SUBMIT_URL = process.env.SUBMIT_URL!;
const ACCESS_TOKEN = process.env.ACCESS_TOKEN!;

export async function enviarResultados(stats: ReturnType<typeof gerarStatus>): Promise<void> {
  const response = await fetch(SUBMIT_URL, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${ACCESS_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ stats }),
  });

  if (!response.ok) {
    throw new Error(`Erro ao enviar resultados: ${response.status}`);
  }

  const data = await response.json();
  console.log('\n=== RESPOSTA DA API ===');
  console.log(JSON.stringify(data, null, 2));
}