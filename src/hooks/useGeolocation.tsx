import { useState, useEffect } from 'react';

export default function useGeolocation() {
    const [geolocation, setGeolocation] = useState<{ lat: number; lng: number } | null>(null);
    const [error, setError] = useState<string | null>(null);

    const options: PositionOptions = {
        enableHighAccuracy: false,
        timeout: 5000,
        maximumAge: 0
    };

    useEffect(() => {
        if (!navigator.geolocation) {
            setError('Geolocation is not supported by this browser.');
            return;
        }

        let mounted = true;

        navigator.geolocation.getCurrentPosition(
            (position) => {
                if (!mounted) return;
                setGeolocation({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                });
                setError(null);
            },
            (err) => {
                if (!mounted) return;
                setError(err.message);
            },
            options
        );

        return () => {
            mounted = false;
        };
    }, []);

    return { geolocation, error, setError };
}
