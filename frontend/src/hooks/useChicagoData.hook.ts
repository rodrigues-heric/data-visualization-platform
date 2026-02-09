import { useQuery, keepPreviousData } from '@tanstack/react-query';
import {
  fetchChicagoFacilities,
  fetchChicagoSchools,
} from '@/services/chicagoAPI.service';
import type { ChicagoFacility } from '@/interfaces/chicagoFacility.interface';
import type { ChicagoSchool } from '@/interfaces/chicagoSchool.interace';

export type ChicagoResourceType = 'facilities' | 'schools';

type ResourceDataMap = {
  facilities: ChicagoFacility;
  schools: ChicagoSchool;
};

export const useChicagoData = <T extends ChicagoResourceType>(
  resource: T,
  page: number
) => {
  const FIVE_MINUTES_MS = 1000 * 60 * 5;

  const fetchMap: Record<ChicagoResourceType, (page: number) => Promise<any>> =
    {
      facilities: fetchChicagoFacilities,
      schools: fetchChicagoSchools,
    };

  return useQuery<ResourceDataMap[T][]>({
    queryKey: ['chicagoData', resource, page],
    queryFn: () => fetchMap[resource](page),
    placeholderData: keepPreviousData,
    staleTime: FIVE_MINUTES_MS,
  });
};
