// server/src/weather/weather.service.ts
import { Injectable, InternalServerErrorException } from '@nestjs/common';

@Injectable()
export class WeatherService {
  async byCoords(lat: number, lon: number) {
    try {
      const url = new URL('https://api.open-meteo.com/v1/forecast');
      url.search = new URLSearchParams({
        latitude: String(lat),
        longitude: String(lon),
        current: 'temperature_2m,weather_code',
        daily: 'temperature_2m_max,temperature_2m_min,weather_code',
        timezone: 'auto',
      }).toString();

      const r = await fetch(url.toString(), { headers: { accept: 'application/json' } });
      if (!r.ok) {
        const text = await r.text();
        console.error('[weather] HTTP', r.status, text);
        throw new InternalServerErrorException(`weather ${r.status}`);
      }
      const j = await r.json();

      // обережно з опціональними полями
      const code = j?.current?.weather_code ?? null;
      const temp = j?.current?.temperature_2m ?? null;
      const min  = j?.daily?.temperature_2m_min?.[0] ?? null;
      const max  = j?.daily?.temperature_2m_max?.[0] ?? null;

      return { current: { temp, code }, today: { min, max }, raw: undefined };
    } catch (e: any) {
      console.error('[weather] error', e);
      throw new InternalServerErrorException(e?.message ?? 'weather failed');
    }
  }
}
