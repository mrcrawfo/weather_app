import { Card, CircularProgress, Typography } from '@mui/material';

import { WeatherIcon } from '../atoms/WeatherIcon';

type LocationViewProps = {
  forecast: any;
  forecastHourly: any;
  locationCity: string | null;
  locationState: string | null;
  loading: boolean;
};

export const LocationView = ({ forecast, forecastHourly, locationCity, locationState, loading }: LocationViewProps) => {
    return (
        <Card sx={{ position: 'relative', overflow: 'hidden', p: 0, minHeight: 400, width: '50%' }}>
            {loading && (
                <div className="flex flex-col items-center justify-center w-full h-full p-4">
                    <CircularProgress />
                    <Typography mt={2} variant="h5">Loading...</Typography>
                </div>
            )}
            {!locationCity && !locationState && (
                <div className="flex items-center justify-center w-full h-full p-4">
                    <Typography variant="body1">No location selected</Typography>
                </div>
            )}
            {locationCity && locationState && forecast && forecastHourly && forecast.properties.periods.length > 0 && forecastHourly.properties.periods.length > 0 && (
                <>
                    {/* background image is a stretched and blurred version of the NWS icon at low opacity to provide some visual theming to the forecast card */}
                    <div aria-hidden="true" className="absolute top-0 left-0 w-full h-full bg-center bg-cover filter blur-lg opacity-30 z-0" style={{ backgroundImage: `url(${forecastHourly.properties.periods[0].icon})` }} />
                    <div className="flex flex-row items-center gap-4 p-4">
                        <WeatherIcon shortForecast={forecastHourly.properties.periods[0].shortForecast} size={100} />
                        <Typography variant="h6" className="font-bold">{locationCity}, {locationState}</Typography>
                    </div>
                    <div className="flex flex-col p-4 lg:p-8" style={{ position: 'relative', zIndex: 1 }}>
                        <Typography variant="h6">{forecastHourly.properties.periods[0].shortForecast}, {forecastHourly.properties.periods[0].temperature}° {forecastHourly.properties.periods[0].temperatureUnit}</Typography>
                        <Typography variant="body1">Wind: {forecastHourly.properties.periods[0].windSpeed} {forecastHourly.properties.periods[0].windDirection}, {forecastHourly.properties.periods[0].probabilityOfPrecipitation.value}% chance of precipitation</Typography>
                        <Typography variant="body2">{forecast.properties.periods[0].detailedForecast}</Typography>
                    </div>
                </>
            )}
        </Card>
    )
};

export default LocationView;
