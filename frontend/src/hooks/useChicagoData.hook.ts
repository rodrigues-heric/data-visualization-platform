import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { fetchChicagoFacilities } from '@/services/chicagoAPI.service';

export const useChicagoData = (page: number) => {
  const FIVE_MINUTES_MS = 1000 * 60 * 5;

  const query = useQuery({
    queryKey: ['chicagoData', page],
    queryFn: () => fetchChicagoFacilities(page),
    placeholderData: keepPreviousData,
    staleTime: FIVE_MINUTES_MS,
  });

  return query;
};
