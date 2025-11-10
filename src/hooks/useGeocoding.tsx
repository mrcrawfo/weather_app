import { useEffect, useState } from 'react';
import { Country, State, City } from 'country-state-city';

import type { USLocation } from '../types/forecast';

export default function useGeocoding() {
    const [USLocations, setUSLocations] = useState<USLocation[]>([]);

    useEffect(() => {
        const startTime = (typeof performance !== 'undefined' && performance.now) ? performance.now() : Date.now();
        console.log('useGeocoding: building USLocations start_ms=', startTime);
        
        const temp: USLocation[] = [];
        const USCities = City.getCitiesOfCountry('US') ?? [];
        for (let i = 0; i < USCities.length; i++) {
            temp.push({
                city: USCities[i].name,
                state: USCities[i].stateCode,
                lat: USCities[i].latitude,
                lng: USCities[i].longitude,
                name: `${USCities[i].name}, ${USCities[i].stateCode}`,
            });
        }
        setUSLocations(temp);

        const endTime = (typeof performance !== 'undefined' && performance.now) ? performance.now() : Date.now();
        const deltaMs = endTime - startTime;
        console.log('useGeocoding: building USLocations end_ms=', endTime, 'delta_ms=', deltaMs);
        console.log('useGeocoding: built USLocations count=', USLocations.length);
    }, []);

    const [customCity, setCustomCity] = useState<string | null>(null);
    const [customState, setCustomState] = useState<string | null>(null);
    const [customLocation, setCustomLocation] = useState<{ lat: number; lng: number } | null>(null);

    useEffect(() => {
        console.log('useGeocoding effect triggered:', { customCity, customState });
        if (customCity && customState) {
            console.log('Geocoding for:', { customCity, customState });
            const country = Country.getCountryByCode('US');
            console.log('Found country:', country);
            const state = State.getStateByCodeAndCountry(customState.toUpperCase(), 'US');
            console.log('Found state:', state);
            if (country && state) {
                const cities = City.getCitiesOfState('US', customState.toUpperCase());
                const city = cities.find(c => c.name.toLowerCase() === customCity.toLowerCase());
                console.log('Found city:', city);
                if (city) {
                    setCustomLocation({ lat: Number(city.latitude), lng: Number(city.longitude) });
                }
            }
        }
    }, [customCity, customState]);

    return { setCustomCity, setCustomState, customLocation, USLocations };
}