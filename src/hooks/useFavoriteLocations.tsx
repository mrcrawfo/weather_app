import { useEffect, useState } from 'react';

import type { USLocation } from '../types/forecast';

export default function useFavoriteLocations() {
    const [favoriteLocations, setFavoriteLocations] = useState<USLocation[]>([]);

    useEffect(() => {
        const storedLocations = localStorage.getItem('favoriteLocations');
        if (storedLocations) {
            setFavoriteLocations(JSON.parse(storedLocations));
        }
    }, []);

    const addFavoriteLocation = (location: USLocation) => {
        setFavoriteLocations((prev) => {
            const updated = [...prev, location];
            localStorage.setItem('favoriteLocations', JSON.stringify(updated));
            return updated;
        });
    };

    const removeFavoriteLocation = (location: USLocation) => {
        setFavoriteLocations((prev) => {
            const updated = prev.filter((loc) => loc !== location);
            localStorage.setItem('favoriteLocations', JSON.stringify(updated));
            return updated;
        });
    };

    return {
        favoriteLocations,
        addFavoriteLocation,
        removeFavoriteLocation,
    };
};
