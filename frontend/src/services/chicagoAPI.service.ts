import type { ChicagoFacility } from '@/interfaces/chicagoFacility.interface';
import type { ChicagoSchool } from '@/interfaces/chicagoSchool.interace';
import { PAGE_LIMIT } from '@/constants/pagination';

const ENDPOINTS = {
  FACILITIES: 'https://data.cityofchicago.org/resource/8yq3-m6wp.json',
  SCHOOLS: 'https://data.cityofchicago.org/resource/d7as-muwj.json',
};

const fetchFromChicago = async <T>(url: string, page: number): Promise<T[]> => {
  const offset = page * PAGE_LIMIT;
  const response = await fetch(`${url}?$limit=${PAGE_LIMIT}&$offset=${offset}`);

  if (!response.ok) {
    throw new Error(`Erro ao buscar dados: ${response.statusText}`);
  }

  return response.json();
};

export const fetchChicagoFacilities = (page: number) =>
  fetchFromChicago<ChicagoFacility>(ENDPOINTS.FACILITIES, page);

export const fetchChicagoSchools = (page: number) =>
  fetchFromChicago<ChicagoSchool>(ENDPOINTS.SCHOOLS, page);
