import { useEffect, useState } from 'react';
import { Accordion, AccordionDetails, AccordionSummary, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import LocationPinIcon from '@mui/icons-material/LocationPin';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

import './App.css';
import useGeolocation from './hooks/useGeolocation';
import useWeather from './hooks/useWeather';

function App() {
  const [locationName, setLocationName] = useState<string | null>(null);

  const { geolocation } = useGeolocation();

  const { primaryLocationForecast, primaryLocationForecastHourly, primaryLocationForecastCity, primaryLocationForecastState, setPrimaryLocation, loading, error } = useWeather();

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
        <div className="max-w-7xl mx-auto px-4 lg:px-32 py-4 flex items-center justify-between">
          <h1 className="text-xl font-semibold text-center min-w-full">Weather App</h1>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto">
        {/* side gutters are visible on desktop (lg and up). On small screens gutters collapse so content uses full width. */}
        <div className="max-w-6xl mx-auto px-4 lg:px-32 py-6">
          <div className="space-y-4">
            <Accordion defaultExpanded>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              {locationName ? (
                <Typography variant="h6">{locationName}</Typography>
              ) : (
                <Typography variant="h6" className="animate-pulse font-stretch-semi-expanded font-thin">Loading location...</Typography>
              )}
              </AccordionSummary>
              <AccordionDetails>
                <div className="prose">
                  <p>Current location details go here.</p>
                  <div className="mt-4">
                    <Accordion>
                      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography variant="subtitle1">Saved Locations</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <List>
                          <ListItem disablePadding>
                            <ListItemButton>
                              <ListItemIcon>
                                <LocationPinIcon />
                              </ListItemIcon>
                              <ListItemText primary="Stamford, CT" />
                            </ListItemButton>
                          </ListItem>
                        </List>
                      </AccordionDetails>
                    </Accordion>
                  </div>
                </div>
              </AccordionDetails>
            </Accordion>

            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="h6">7-Day Forecast</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <div className="prose">
                  {primaryLocationForecast?.properties?.periods?.length && (
                    <div>
                      <ul>
                        {primaryLocationForecast.properties.periods.map((day: any) => (
                          <li key={day.startTime}>
                            <div className="flex flex-row items-justify-start gap-4">
                              <img src={day.icon} alt={day.shortForecast} />
                              <div className="flex flex-col">
                                <Typography variant="h4">{day.name}</Typography>
                                <Typography variant="body1">{day.shortForecast} - {day.temperature}° {day.temperatureUnit}</Typography>
                                <Typography variant="subtitle1">Wind: {day.windSpeed} {day.windDirection}</Typography>
                                <Typography variant="subtitle1">{day.detailedForecast}</Typography>
                                <Typography variant="subtitle1">{day.probabilityOfPrecipitation.value}% chance of precipitation</Typography>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {/* <DotLottieReact
                    src="weather_icons/partly_cloudy.lottie"
                    loop
                    autoplay
                  /> */}
                </div>
              </AccordionDetails>
            </Accordion>

            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="h6">Hourly Forecast</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <div className="prose">
                  <p>Hourly weather forecast details go here.</p>
                </div>
              </AccordionDetails>
            </Accordion>
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
