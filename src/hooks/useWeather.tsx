import { useEffect, useState } from 'react';

export default function useWeather() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    
    const [primaryLocation, setPrimaryLocation] = useState<{ lat: number; lng: number } | null>(null);
    const [primaryLocationForecastCity, setPrimaryLocationForecastCity] = useState<string | null>(null);
    const [primaryLocationForecastState, setPrimaryLocationForecastState] = useState<string | null>(null);
    const [primaryLocationForecastUrl, setPrimaryLocationForecastUrl] = useState<string | null>(null);
    const [primaryLocationForecastHourlyUrl, setPrimaryLocationForecastHourlyUrl] = useState<string | null>(null);

    const [primaryLocationForecast, setPrimaryLocationForecast] = useState<any>(null);
    const [primaryLocationForecastHourly, setPrimaryLocationForecastHourly] = useState<any>(null);

    useEffect(() => {
        let mounted = true;
        setLoading(true);
        setError(null);
        setPrimaryLocationForecast(null);
        setPrimaryLocationForecastHourly(null);

        if (primaryLocation) {
            const latEncoded = encodeURIComponent(primaryLocation.lat);
            const lngEncoded = encodeURIComponent(primaryLocation.lng);
            const url = `https://api.weather.gov/points/${latEncoded},${lngEncoded}`;

            fetch(url)
                .then(async (res) => {
                    if (!res.ok) throw new Error(`HTTP ${res.status}`);
                    const json = await res.json();
                    if (mounted) {
                        setPrimaryLocationForecastUrl(json.properties.forecast);
                        setPrimaryLocationForecastHourlyUrl(json.properties.forecastHourly);
                        setPrimaryLocationForecastCity(json.properties.relativeLocation.properties.city);
                        setPrimaryLocationForecastState(json.properties.relativeLocation.properties.state);
                    }
                })
                .catch((err) => {
                    if (mounted) setError(String(err));
                })
                .finally(() => {
                    if (mounted) setLoading(false);
                });

            return () => {
                mounted = false;
            };
        }
    }, [primaryLocation]);

    useEffect(() => {
        console.log('primaryLocationForecastUrl changed:', primaryLocationForecastUrl);
        let mounted = true;
        if (primaryLocationForecastUrl) {
            setLoading(true);
            // setError(null);

            fetch(primaryLocationForecastUrl)
                .then(async (res) => {
                    if (!res.ok) throw new Error(`HTTP ${res.status}`);
                    const json = await res.json();
                    console.log('Fetched primaryLocationForecast:', json);
                    if (mounted) setPrimaryLocationForecast(json);
                })
                .catch((err) => {
                    if (mounted) setError(String(err));
                })
                .finally(() => {
                    if (mounted) setLoading(false);
                });

            return () => {
                mounted = false;
            };
        }
    }, [primaryLocationForecastUrl]);

    useEffect(() => {
        console.log('primaryLocationForecastHourlyUrl changed:', primaryLocationForecastHourlyUrl);
        let mounted = true;
        if (primaryLocationForecastHourlyUrl) {
            setLoading(true);
            // setError(null);

            fetch(primaryLocationForecastHourlyUrl)
                .then(async (res) => {
                    if (!res.ok) throw new Error(`HTTP ${res.status}`);
                    const json = await res.json();
                    console.log('Fetched primaryLocationForecastHourly:', json);
                    if (mounted) setPrimaryLocationForecastHourly(json);
                })
                .catch((err) => {
                    if (mounted) setError(String(err));
                })
                .finally(() => {
                    if (mounted) setLoading(false);
                });

            return () => {
                mounted = false;
            };
        }
    }, [primaryLocationForecastHourlyUrl]);

    useEffect(() => {
        if (primaryLocationForecast && primaryLocationForecastHourly) {
            setLoading(false);
        }
    }, [primaryLocationForecast, primaryLocationForecastHourly]);

    return { primaryLocationForecast, primaryLocationForecastHourly, primaryLocationForecastCity, primaryLocationForecastState, setPrimaryLocation, loading, error,  };
}