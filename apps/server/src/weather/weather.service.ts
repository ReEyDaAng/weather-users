import fetch from 'node-fetch';

type OpenMeteoResponse = {
  current_weather?: {
    temperature: number;
    weathercode: number;
    // можна додати інші поля за потреби
  };
  daily?: {
    temperature_2m_min: number[];
    temperature_2m_max: number[];
  };
};

export class WeatherService {
  async byCoords(lat: number, lon: number) {
    const url = new URL('https://api.open-meteo.com/v1/forecast');
    url.searchParams.set('latitude', String(lat));
    url.searchParams.set('longitude', String(lon));
    url.searchParams.set('current_weather', 'true');
    url.searchParams.set('daily', 'temperature_2m_max,temperature_2m_min');
    url.searchParams.set('timezone', 'auto');

    const res = await fetch(url);
    if (!res.ok) throw new Error('Weather fetch failed');

    const data = (await res.json()) as OpenMeteoResponse;

    return {
      current: {
        temp: data.current_weather?.temperature ?? null,
        code: data.current_weather?.weathercode ?? null,
      },
      today: {
        min: data.daily?.temperature_2m_min?.[0] ?? null,
        max: data.daily?.temperature_2m_max?.[0] ?? null,
      },
      // необов'язково повертати «raw», але залишаю на випадок дебагу
      raw: data,
    };
  }
}
