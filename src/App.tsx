import { useEffect, useState } from 'react';

import './App.css';
import { SevenDayForecast } from './components/organisms/SevenDayForecast';
import { HourlyForecast } from './components/organisms/HourlyForecast';
import useGeolocation from './hooks/useGeolocation';
import useWeather from './hooks/useWeather';
import LocationSelector from './components/organisms/LocationSelector';

function App() {
  const [locationName, setLocationName] = useState<string | null>(null);

  const { geolocation } = useGeolocation();

  const { primaryLocationForecast, primaryLocationForecastHourly, primaryLocationForecastCity, primaryLocationForecastState, setPrimaryLocation } = useWeather();

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
      <header className="sticky top-0 z-10 bg-white shadow-sm min-w-screen">
        <div className="max-w-7xl mx-auto px-4 lg:px-32 py-4 flex items-center justify-center">
          <div className="flex items-center space-x-4">
            <img src="/weather_app_icon.png" alt="Weather App Icon" className="h-16 xl:h-24" />
            <h1 className="font-semibold">Weather App</h1>
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto">
        {/* side gutters are visible on desktop (lg and up). On small screens gutters collapse so content uses full width. */}
        <div className="max-w-6xl mx-auto px-4 lg:px-32 py-6">
          <div className="space-y-4">
            <LocationSelector locationName={locationName} setPrimaryLocation={setPrimaryLocation} />
            <SevenDayForecast forecast={primaryLocationForecast} />
            <HourlyForecast forecast={primaryLocationForecastHourly} />
          </div>
        </div>
      </main>

      <footer className="bg-white border-t py-4">
        <div className="max-w-7xl mx-auto px-4 lg:px-32 text-sm text-gray-500 text-center min-w-full">
          © {new Date().getFullYear()}{' '}
          <a
            href="https://www.linkedin.com/in/max-crawford-00459b324/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:underline"
          >
            Max Crawford
          </a>{' '}
          on behalf of{' '}
          <a
            href="https://www.infotrack.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:underline"
          >
            InfoTrack US
          </a>
        </div>
      </footer>
    </div>
  )
}

export default App
