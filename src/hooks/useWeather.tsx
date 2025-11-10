import { useEffect, useState } from 'react';

export default function useWeather() {
    const [primaryLoading, setPrimaryLoading] = useState(false);
    const [primaryError, setPrimaryError] = useState<string | null>(null);
    
    const [primaryLocation, setPrimaryLocation] = useState<{ lat: number; lng: number, city?: string, state?: string } | null>(null);
    const [primaryLocationForecastCity, setPrimaryLocationForecastCity] = useState<string | null>(null);
    const [primaryLocationForecastState, setPrimaryLocationForecastState] = useState<string | null>(null);
    const [primaryLocationForecastUrl, setPrimaryLocationForecastUrl] = useState<string | null>(null);
    const [primaryLocationForecastHourlyUrl, setPrimaryLocationForecastHourlyUrl] = useState<string | null>(null);

    const [primaryLocationForecast, setPrimaryLocationForecast] = useState<any>(null);
    const [primaryLocationForecastHourly, setPrimaryLocationForecastHourly] = useState<any>(null);
    
    const [secondaryLoading, setSecondaryLoading] = useState(false);
    const [secondaryError, setSecondaryError] = useState<string | null>(null);

    const [secondaryLocation, setSecondaryLocation] = useState<{ lat: number; lng: number, city?: string, state?: string } | null>(null);
    const [secondaryLocationForecastCity, setSecondaryLocationForecastCity] = useState<string | null>(null);
    const [secondaryLocationForecastState, setSecondaryLocationForecastState] = useState<string | null>(null);
    const [secondaryLocationForecastUrl, setSecondaryLocationForecastUrl] = useState<string | null>(null);
    const [secondaryLocationForecastHourlyUrl, setSecondaryLocationForecastHourlyUrl] = useState<string | null>(null);

    const [secondaryLocationForecast, setSecondaryLocationForecast] = useState<any>(null);
    const [secondaryLocationForecastHourly, setSecondaryLocationForecastHourly] = useState<any>(null);

    useEffect(() => {
        let mounted = true;
        setPrimaryError(null);
        setPrimaryLocationForecast(null);
        setPrimaryLocationForecastHourly(null);

        if (primaryLocation) {
            setPrimaryLoading(true);
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
                        setPrimaryLocationForecastCity(primaryLocation.city || json.properties.relativeLocation.properties.city);
                        setPrimaryLocationForecastState(primaryLocation.state || json.properties.relativeLocation.properties.state);
                    }
                })
                .catch((err) => {
                    if (mounted) setPrimaryError(String(err));
                })
                .finally(() => {
                    if (mounted) setPrimaryLoading(false);
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
            setPrimaryLoading(true);
            // setPrimaryError(null);

            fetch(primaryLocationForecastUrl)
                .then(async (res) => {
                    if (!res.ok) throw new Error(`HTTP ${res.status}`);
                    const json = await res.json();
                    console.log('Fetched primaryLocationForecast:', json);
                    if (mounted) setPrimaryLocationForecast(json);
                })
                .catch((err) => {
                    if (mounted) setPrimaryError(String(err));
                })
                .finally(() => {
                    if (mounted) setPrimaryLoading(false);
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
            setPrimaryLoading(true);
            // setPrimaryError(null);

            fetch(primaryLocationForecastHourlyUrl)
                .then(async (res) => {
                    if (!res.ok) throw new Error(`HTTP ${res.status}`);
                    const json = await res.json();
                    console.log('Fetched primaryLocationForecastHourly:', json);
                    if (mounted) setPrimaryLocationForecastHourly(json);
                })
                .catch((err) => {
                    if (mounted) setPrimaryError(String(err));
                })
                .finally(() => {
                    if (mounted) setPrimaryLoading(false);
                });

            return () => {
                mounted = false;
            };
        }
    }, [primaryLocationForecastHourlyUrl]);

    useEffect(() => {
        if (primaryLocationForecast && primaryLocationForecastHourly) {
            setPrimaryLoading(false);
        }
    }, [primaryLocationForecast, primaryLocationForecastHourly]);

    useEffect(() => {
        let mounted = true;
        setSecondaryError(null);
        setSecondaryLocationForecast(null);
        setSecondaryLocationForecastHourly(null);

        if (secondaryLocation) {
            setSecondaryLoading(true);
            const latEncoded = encodeURIComponent(secondaryLocation.lat);
            const lngEncoded = encodeURIComponent(secondaryLocation.lng);
            const url = `https://api.weather.gov/points/${latEncoded},${lngEncoded}`;

            fetch(url)
                .then(async (res) => {
                    if (!res.ok) throw new Error(`HTTP ${res.status}`);
                    const json = await res.json();
                    if (mounted) {
                        setSecondaryLocationForecastUrl(json.properties.forecast);
                        setSecondaryLocationForecastHourlyUrl(json.properties.forecastHourly);
                        setSecondaryLocationForecastCity(secondaryLocation.city || json.properties.relativeLocation.properties.city);
                        setSecondaryLocationForecastState(secondaryLocation.state || json.properties.relativeLocation.properties.state);
                    }
                })
                .catch((err) => {
                    if (mounted) setSecondaryError(String(err));
                })
                .finally(() => {
                    if (mounted) setSecondaryLoading(false);
                });

            return () => {
                mounted = false;
            };
        }
    }, [secondaryLocation]);

    useEffect(() => {
        console.log('secondaryLocationForecastUrl changed:', secondaryLocationForecastUrl);
        let mounted = true;
        if (secondaryLocationForecastUrl) {
            setSecondaryLoading(true);
            // setSecondaryError(null);

            fetch(secondaryLocationForecastUrl)
                .then(async (res) => {
                    if (!res.ok) throw new Error(`HTTP ${res.status}`);
                    const json = await res.json();
                    console.log('Fetched secondaryLocationForecast:', json);
                    if (mounted) setSecondaryLocationForecast(json);
                })
                .catch((err) => {
                    if (mounted) setSecondaryError(String(err));
                })
                .finally(() => {
                    if (mounted) setSecondaryLoading(false);
                });

            return () => {
                mounted = false;
            };
        }
    }, [secondaryLocationForecastUrl]);

    useEffect(() => {
        console.log('secondaryLocationForecastHourlyUrl changed:', secondaryLocationForecastHourlyUrl);
        let mounted = true;
        if (secondaryLocationForecastHourlyUrl) {
            setSecondaryLoading(true);
            // setSecondaryError(null);

            fetch(secondaryLocationForecastHourlyUrl)
                .then(async (res) => {
                    if (!res.ok) throw new Error(`HTTP ${res.status}`);
                    const json = await res.json();
                    console.log('Fetched secondaryLocationForecastHourly:', json);
                    if (mounted) setSecondaryLocationForecastHourly(json);
                })
                .catch((err) => {
                    if (mounted) setSecondaryError(String(err));
                })
                .finally(() => {
                    if (mounted) setSecondaryLoading(false);
                });

            return () => {
                mounted = false;
            };
        }
    }, [secondaryLocationForecastHourlyUrl]);

    useEffect(() => {
        if (secondaryLocationForecast && secondaryLocationForecastHourly) {
            setSecondaryLoading(false);
        }
    }, [secondaryLocationForecast, secondaryLocationForecastHourly]);

    return { primaryLocationForecast, primaryLocationForecastHourly, primaryLocationForecastCity, primaryLocationForecastState, setPrimaryLocation, primaryLoading, primaryError, secondaryLocationForecast, secondaryLocationForecastHourly, secondaryLocationForecastCity, secondaryLocationForecastState, setSecondaryLocation, secondaryLoading, secondaryError };
}