import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';


export function useWeather(lat: number, lon: number, auto = true) {
return useQuery({
queryKey: ['weather', lat, lon],
queryFn: () => api(`/api/weather?lat=${lat}&lon=${lon}`),
enabled: Number.isFinite(lat) && Number.isFinite(lon),
refetchInterval: auto ? 300_000 : false,
});
}