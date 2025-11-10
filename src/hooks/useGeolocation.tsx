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

        // TODO: Handle 'CoreLocationProvider: CoreLocation framework reported a kCLErrorLocationUnknown failure.' error before user allows location permission

        const watchId = navigator.geolocation.watchPosition(
            (position) => {
                setGeolocation({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                });
                setError(null);
            },
            (err) => {
                setError(err.message);
            },
            options
        );

        return () => {
            navigator.geolocation.clearWatch(watchId);
        };
    }, []);

    return { geolocation, error, setError };
}
