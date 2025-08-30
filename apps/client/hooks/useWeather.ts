import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import { api } from '@/lib/api';
import type { WeatherDTO } from '@/lib/types';

export function useWeather(
  lat: number,
  lon: number,
  enabled = true
): UseQueryResult<WeatherDTO> {
  return useQuery<WeatherDTO>({
    queryKey: ['weather', lat, lon],
    enabled,
    queryFn: () => api<WeatherDTO>(`/api/weather?lat=${lat}&lon=${lon}`),
  });
}
