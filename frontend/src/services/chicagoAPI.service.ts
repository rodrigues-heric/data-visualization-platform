import type { ChicagoFacility } from '@/interfaces/chicagoFacility.interface';
import { PAGE_LIMIT } from '@/constants/pagination';

const BASE_URL = 'https://data.cityofchicago.org/resource/8yq3-m6wp.json';

export const fetchChicagoFacilities = async (
  page: number
): Promise<ChicagoFacility[]> => {
  const offset = page * PAGE_LIMIT;

  const response = await fetch(
    `${BASE_URL}?$limit=${PAGE_LIMIT}&$offset=${offset}`
  );

  if (!response.ok) throw new Error('Erro ao buscar dados da API de Chicago');

  const data = await response.json();
  return data;
};
