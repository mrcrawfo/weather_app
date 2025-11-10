import { useEffect, useState } from 'react';

import './App.css';
import useGeolocation from './hooks/useGeolocation';
import useWeather from './hooks/useWeather';
import { LocationSelector } from './components/organisms/LocationSelector';
import { SevenDayForecast } from './components/organisms/SevenDayForecast';
import { HourlyForecast } from './components/organisms/HourlyForecast';
import { ComparisonView } from './components/organisms/ComparisonView';
import { ApplicationHeader } from './components/atoms/ApplicationHeader';
import { ApplicationFooter } from './components/atoms/ApplicationFooter';

function App() {
  const [locationName, setLocationName] = useState<string | null>(null);

  const { geolocation } = useGeolocation();

  const {
    primaryLocationForecast,
    primaryLocationForecastHourly,
    primaryLocationForecastCity,
    primaryLocationForecastState,
    primaryLoading,
    secondaryLocationForecast,
    secondaryLocationForecastHourly,
    secondaryLocationForecastCity,
    secondaryLocationForecastState,
    secondaryLoading,
    setPrimaryLocation,
    setSecondaryLocation
  } = useWeather();

  useEffect(() => {
    if (geolocation) {
      console.log('Current geolocation:', geolocation);
      setPrimaryLocation(geolocation);
    }
  }, [geolocation, setPrimaryLocation]);

  useEffect(() => {
    if (primaryLocationForecastCity && primaryLocationForecastState) {
      setLocationName(`${primaryLocationForecastCity}, ${primaryLocationForecastState}`);
    }
  }, [primaryLocationForecastCity, primaryLocationForecastState]);

  return (
    <div className="min-h-screen min-w-screen flex flex-col bg-gray-50">
      <ApplicationHeader />
      <main className="flex-1 overflow-y-auto">
        {/* side gutters are visible on desktop (lg and up). On small screens gutters collapse so content uses full width. */}
        <div className="max-w-6xl mx-auto px-4 lg:px-32 py-6">
          <div className="space-y-4">
            <LocationSelector locationName={locationName} setPrimaryLocation={setPrimaryLocation} />
            <SevenDayForecast forecast={primaryLocationForecast} />
            <HourlyForecast forecast={primaryLocationForecastHourly} />
            <ComparisonView
              primaryForecast={primaryLocationForecast}
              primaryForecastHourly={primaryLocationForecastHourly}
              primaryLocationCity={primaryLocationForecastCity}
              primaryLocationState={primaryLocationForecastState}
              primaryLoading={primaryLoading}
              secondaryForecast={secondaryLocationForecast}
              secondaryForecastHourly={secondaryLocationForecastHourly}
              secondaryLocationForecastCity={secondaryLocationForecastCity}
              secondaryLocationForecastState={secondaryLocationForecastState}
              secondaryLoading={secondaryLoading}
              setSecondaryLocation={setSecondaryLocation}
            />
          </div>
        </div>
      </main>
      <ApplicationFooter />
    </div>
  )
}

export default App
